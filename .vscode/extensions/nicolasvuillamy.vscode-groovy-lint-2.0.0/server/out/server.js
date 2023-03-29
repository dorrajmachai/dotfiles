"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable eqeqeq */
const vscode_languageserver_1 = require("vscode-languageserver");
const { performance } = require('perf_hooks');
const codeActions_1 = require("./codeActions");
const DocumentsManager_1 = require("./DocumentsManager");
const commands_1 = require("./commands");
const types_1 = require("./types");
const debug = require("debug")("vscode-groovy-lint");
const NpmGroovyLint = require("npm-groovy-lint/lib/groovy-lint.js");
const onTypeDelayBeforeLint = 3000;
// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
// Doc manager is a live instance managing the extension all along its execution
const docManager = new DocumentsManager_1.DocumentsManager(connection);
// Return language server capabilities
connection.onInitialize((params) => {
    debug('GroovyLint: initializing server');
    return {
        capabilities: {
            textDocumentSync: {
                change: vscode_languageserver_1.TextDocumentSyncKind.Incremental,
                openClose: true,
                willSaveWaitUntil: true
            },
            documentFormattingProvider: true,
            executeCommandProvider: {
                commands: commands_1.commands.map(command => command.command),
                dynamicRegistration: true
            },
            codeActionProvider: {
                codeActionKinds: [vscode_languageserver_1.CodeActionKind.QuickFix]
            }
        }
    };
});
// Register workspace actions when server is initialized
connection.onInitialized(() => __awaiter(void 0, void 0, void 0, function* () {
    // Register for the client notifications we can use
    connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type);
    connection.client.register(vscode_languageserver_1.DidSaveTextDocumentNotification.type);
    //connection.client.register(ActiveDocumentNotification.type);
    debug('GroovyLint: initialized server');
    yield docManager.refreshDebugMode();
}));
// Kill CodeNarcServer when closing VsCode or deactivate extension
connection.onShutdown(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new NpmGroovyLint({ killserver: true }, {}).run();
}));
connection.onExit(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new NpmGroovyLint({ killserver: true }, {}).run();
}));
// Lint again all opened documents in configuration changed 
// wait N seconds in case a new config change arrive, run just after the last one
connection.onDidChangeConfiguration((change) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`change configuration event received: restart server and lint again all open documents`);
    yield new NpmGroovyLint({ killserver: true }, {}).run();
    yield docManager.cancelAllDocumentValidations();
    yield docManager.lintAgainAllOpenDocuments();
}));
// Handle command requests from client
connection.onExecuteCommand((params) => __awaiter(void 0, void 0, void 0, function* () {
    yield docManager.executeCommand(params);
}));
// Handle formatting request from client
connection.onDocumentFormatting((params) => __awaiter(void 0, void 0, void 0, function* () {
    const { textDocument } = params;
    debug(`Formatting request received from client for ${textDocument.uri} with params ${JSON.stringify(params)}`);
    if (params && params.options.tabSize) {
        docManager.updateDocumentSettings(textDocument.uri, { tabSize: params.options.tabSize });
    }
    const document = docManager.getDocumentFromUri(textDocument.uri);
    const textEdits = yield docManager.formatTextDocument(document);
    // Lint again the sources
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const documentUpdated = docManager.getDocumentFromUri(textDocument.uri);
        yield docManager.validateTextDocument(documentUpdated);
    }), 500);
    // Return textEdits to client that will apply them
    return textEdits;
}));
// Manage to provide code actions (QuickFixes) when the user selects a part of the source code containing diagnostics
connection.onCodeAction((codeActionParams) => __awaiter(void 0, void 0, void 0, function* () {
    if (!codeActionParams.context.diagnostics.length) {
        return [];
    }
    debug(`Code action request received from client for ${codeActionParams.textDocument.uri} with params: ${JSON.stringify(codeActionParams)}`);
    const document = docManager.getDocumentFromUri(codeActionParams.textDocument.uri);
    if (document == null) {
        return [];
    }
    const docQuickFixes = docManager.getDocQuickFixes(codeActionParams.textDocument.uri);
    return codeActions_1.provideQuickFixCodeActions(document, codeActionParams, docQuickFixes);
}));
// Notification from client that active window has changed
connection.onNotification(types_1.ActiveDocumentNotification.type, (params) => __awaiter(void 0, void 0, void 0, function* () {
    docManager.setCurrentDocumentUri(params.uri);
    yield docManager.setCurrentWorkspaceFolder(params.uri);
}));
// Lint groovy doc on open
docManager.documents.onDidOpen((event) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`File open event received for ${event.document.uri}`);
    const textDocument = docManager.getDocumentFromUri(event.document.uri, true);
    yield docManager.setCurrentWorkspaceFolder(event.document.uri);
    yield docManager.validateTextDocument(textDocument);
}));
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
let lastCall;
docManager.documents.onDidChangeContent((change) => __awaiter(void 0, void 0, void 0, function* () {
    if (change.document.languageId !== 'groovy') {
        return;
    }
    docManager.setCurrentDocumentUri(change.document.uri);
    docManager.deleteDocLinter(change.document.uri);
    const settings = yield docManager.getDocumentSettings(change.document.uri);
    const skip = docManager.checkSkipNextOnDidChangeContent(change.document.uri);
    if (settings.lint.trigger === 'onType' && !skip) {
        // Wait 5 seconds to request linting (if new lint for same doc just arrived, just skip linting)
        lastCall = `${change.document.uri}-${performance.now()}`;
        const lastCallLocal = lastCall + '';
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            if (lastCall === lastCallLocal) {
                yield docManager.validateTextDocument(change.document);
            }
        }), onTypeDelayBeforeLint);
    }
}));
// Lint on save if it has been configured
docManager.documents.onDidSave((event) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`Save event received for ${event.document.uri}`);
    const textDocument = docManager.getDocumentFromUri(event.document.uri, true);
    const settings = yield docManager.getDocumentSettings(textDocument.uri);
    if (settings.fix.trigger === 'onSave') {
        yield docManager.validateTextDocument(textDocument, { fix: true });
    }
    else if (settings.lint.trigger === 'onSave') {
        yield docManager.validateTextDocument(textDocument);
    }
}));
// Only keep settings for open documents
docManager.documents.onDidClose((event) => __awaiter(void 0, void 0, void 0, function* () {
    debug(`Close event received for ${event.document.uri}`);
    docManager.resetDiagnostics(event.document.uri);
    docManager.removeDocumentSettings(event.document.uri);
    docManager.cancelDocumentValidation(event.document.uri);
}));
// Make the text document manager listen on the connection
// for open, change and close text document events
docManager.documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map
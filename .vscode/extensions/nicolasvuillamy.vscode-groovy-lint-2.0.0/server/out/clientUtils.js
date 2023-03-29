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
const vscode_languageserver_1 = require("vscode-languageserver");
const types_1 = require("./types");
const debug = require("debug")("vscode-groovy-lint");
const os = require("os");
const defaultDocUrl = "https://codenarc.github.io/CodeNarc/codenarc-rule-index.html";
// Apply updated source into the client TextDocument
function applyTextDocumentEditOnWorkspace(docManager, textDocument, updatedSource, where = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        textDocument = docManager.getUpToDateTextDocument(textDocument);
        const textDocEdit = createTextDocumentEdit(docManager, textDocument, updatedSource, where);
        const applyWorkspaceEdits = {
            documentChanges: [textDocEdit]
        };
        const applyEditResult = yield docManager.connection.workspace.applyEdit(applyWorkspaceEdits);
        debug(`Updated ${textDocument.uri} using WorkspaceEdit (${JSON.stringify(applyEditResult)})`);
    });
}
exports.applyTextDocumentEditOnWorkspace = applyTextDocumentEditOnWorkspace;
// Create a TextDocumentEdit that will be applied on client workspace
function createTextDocumentEdit(docManager, textDocument, updatedSource, where = {}) {
    const textEdit = createTextEdit(docManager, textDocument, updatedSource, where);
    const textDocEdit = vscode_languageserver_1.TextDocumentEdit.create({ uri: textDocument.uri, version: textDocument.version }, [textEdit]);
    return textDocEdit;
}
exports.createTextDocumentEdit = createTextDocumentEdit;
// Create text edit for the whole file from updated source
function createTextEdit(docManager, textDocument, updatedSource, where = {}) {
    const allLines = docManager.getTextDocumentLines(textDocument);
    // If range is not sent, replace all file lines
    let textEdit;
    // Insert at position
    if (where.insertLinePos || where.insertLinePos === 0) {
        allLines.splice(where.insertLinePos, 0, updatedSource);
        textEdit = {
            range: {
                start: { line: 0, character: 0 },
                end: { line: allLines.length - 1, character: allLines[allLines.length - 1].length }
            },
            newText: allLines.join(os.EOL)
        };
    }
    // Replace line at position
    else if (where.replaceLinePos || where.replaceLinePos === 0) {
        textEdit = {
            range: {
                start: { line: where.replaceLinePos, character: 0 },
                end: { line: where.replaceLinePos, character: allLines[where.replaceLinePos].length }
            },
            newText: updatedSource
        };
    }
    // Replace all source
    else if (!(where === null || where === void 0 ? void 0 : where.range)) {
        textEdit = {
            range: {
                start: { line: 0, character: 0 },
                end: { line: allLines.length - 1, character: allLines[allLines.length - 1].length }
            },
            newText: updatedSource
        };
    }
    // Provided range
    else {
        textEdit = {
            range: where.range,
            newText: updatedSource
        };
    }
    return textEdit;
}
exports.createTextEdit = createTextEdit;
// Return updated source
function getUpdatedSource(docLinter, prevSource) {
    if (docLinter && docLinter.lintResult && docLinter.lintResult.files && docLinter.lintResult.files[0]) {
        return docLinter.lintResult.files[0].updatedSource;
    }
    else {
        return prevSource;
    }
}
exports.getUpdatedSource = getUpdatedSource;
// Shows the documentation of a rule
function showRuleDocumentation(ruleCode, docManager) {
    return __awaiter(this, void 0, void 0, function* () {
        debug(`Request showRuleDocumentation on ${ruleCode}`);
        const ruleDesc = docManager.getRuleDescription(ruleCode);
        // Show documentation as info message, and propose to open codenarc website rule page
        const readMoreLabel = 'Read More';
        const msg = {
            type: vscode_languageserver_1.MessageType.Info,
            message: `${ruleCode}: ${ruleDesc.description}`,
            actions: [
                { title: readMoreLabel }
            ]
        };
        const res = yield docManager.connection.sendRequest(vscode_languageserver_1.ShowMessageRequest.type, msg);
        if (res.title === readMoreLabel) {
            docManager.connection.sendNotification(types_1.OpenNotification.type, { url: ruleDesc.docUrl || defaultDocUrl });
        }
    });
}
exports.showRuleDocumentation = showRuleDocumentation;
// Display failed fixes if returned
function notifyFixFailures(fixFailures, docManager) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fixFailures.length === 0 || docManager.ignoreNotifyFixError === true) {
            return;
        }
        const failedErrorTypes = Array.from(new Set(fixFailures.map(failedFixErr => failedFixErr.rule)));
        failedErrorTypes.sort();
        debug(`Notify fix failures of errors: ${failedErrorTypes.join(',')}`);
        const doNotDisplayAgain = 'Do not display again';
        const dismiss = 'Dismiss';
        const msg = {
            type: vscode_languageserver_1.MessageType.Warning,
            message: `Some error fixes have failed, please fix them manually: ${failedErrorTypes.join(',')}`,
            actions: [
                { title: dismiss },
                { title: doNotDisplayAgain }
            ]
        };
        docManager.connection.sendRequest(vscode_languageserver_1.ShowMessageRequest.type, msg).then((res) => {
            if (res && res.title === doNotDisplayAgain) {
                docManager.ignoreNotifyFixError = true;
            }
        });
    });
}
exports.notifyFixFailures = notifyFixFailures;
// Check if we are in test mode
function isTest() {
    return (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event === 'test') ||
        (process.env.AUTO_ACCEPT_REPLACE_TABS && process.env.AUTO_ACCEPT_REPLACE_TABS === 'activated');
}
exports.isTest = isTest;
//# sourceMappingURL=clientUtils.js.map
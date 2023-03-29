"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.debugServerFromUri = exports.start = exports.startDiscovery = exports.initialize = void 0;
const vscode = __importStar(require("vscode"));
const vscode_1 = require("vscode");
const metals_languageclient_1 = require("metals-languageclient");
const os_1 = require("os");
const configurationType = "scala";
function initialize(outputChannel) {
    outputChannel.appendLine("Initializing Scala Debugger");
    return [
        vscode.debug.registerDebugConfigurationProvider(configurationType, new ScalaMainConfigProvider(), vscode_1.DebugConfigurationProviderTriggerKind.Initial),
        vscode.debug.registerDebugAdapterDescriptorFactory(configurationType, new ScalaDebugServerFactory()),
    ];
}
exports.initialize = initialize;
function isExtendedScalaRunMain(runMain) {
    return (runMain.dataKind === "scala-main-class" &&
        runMain.data.shellCommand != undefined);
}
/**
 * Return platform specific options for task.
 *
 * By default, task will use whatever shell user has defined as a default one.
 * However, for Windows tasks seems to not work properly with Powershell,
 * that's why we want to explicitly specify executable as plain old cmd
 */
function platformSpecificOptions() {
    if ((0, os_1.platform)() == "win32") {
        return { executable: "cmd.exe", shellArgs: ["/c"] };
    }
    else {
        return {};
    }
}
function runMain(main) {
    return __awaiter(this, void 0, void 0, function* () {
        const { environmentVariables, shellCommand } = main.data;
        if (vscode_1.workspace.workspaceFolders) {
            const env = environmentVariables.reduce((acc, envKeyValue) => {
                const [key, value] = envKeyValue.split("=");
                return Object.assign(Object.assign({}, acc), { [key]: value });
            }, {});
            const shellOptions = Object.assign(Object.assign({}, platformSpecificOptions()), { env });
            const task = new vscode_1.Task({ type: "scala", task: "run" }, vscode_1.workspace.workspaceFolders[0], "Scala run", "Metals", new vscode_1.ShellExecution(shellCommand, shellOptions));
            yield vscode_1.tasks.executeTask(task);
            return true;
        }
        return Promise.resolve(false);
    });
}
function startDiscovery(noDebug, debugParams) {
    return __awaiter(this, void 0, void 0, function* () {
        if (noDebug &&
            debugParams.runType != metals_languageclient_1.RunType.TestFile &&
            debugParams.runType != metals_languageclient_1.RunType.TestTarget) {
            return vscode.commands
                .executeCommand("discover-jvm-run-command", debugParams)
                .then((response) => {
                if (response && isExtendedScalaRunMain(response)) {
                    return runMain(response);
                }
                else {
                    return debug(noDebug, debugParams);
                }
            });
        }
        else {
            return debug(noDebug, debugParams);
        }
    });
}
exports.startDiscovery = startDiscovery;
function start(noDebug, debugParams) {
    return __awaiter(this, void 0, void 0, function* () {
        if (noDebug && isExtendedScalaRunMain(debugParams)) {
            return runMain(debugParams);
        }
        else {
            return debug(noDebug, debugParams);
        }
    });
}
exports.start = start;
function debug(noDebug, debugParams) {
    return __awaiter(this, void 0, void 0, function* () {
        yield vscode_1.commands.executeCommand("workbench.action.files.save");
        const response = yield vscode.commands.executeCommand(metals_languageclient_1.ServerCommands.DebugAdapterStart, debugParams);
        if (response === undefined) {
            return false;
        }
        const port = debugServerFromUri(response.uri).port;
        const configuration = {
            type: configurationType,
            name: response.name,
            noDebug: noDebug,
            request: "launch",
            debugServer: port, // note: MUST be a number. vscode magic - automatically connects to the server
        };
        vscode_1.commands.executeCommand("workbench.panel.repl.view.focus");
        return vscode.debug.startDebugging(undefined, configuration);
    });
}
class ScalaMainConfigProvider {
    resolveDebugConfiguration(_folder, debugConfiguration) {
        return __awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            // debugConfiguration.type is undefined if there are no configurations
            // we are running whatever is in the file
            if (debugConfiguration.type === undefined && editor) {
                const args = {
                    path: editor.document.uri.toString(true),
                    runType: metals_languageclient_1.RunType.RunOrTestFile,
                };
                yield startDiscovery(debugConfiguration.noDebug, args);
                return debugConfiguration;
            }
            else {
                return debugConfiguration;
            }
        });
    }
}
class ScalaDebugServerFactory {
    createDebugAdapterDescriptor(session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session.configuration.mainClass !== undefined ||
                session.configuration.testClass !== undefined ||
                session.configuration.hostName !== undefined) {
                const debugSession = yield vscode.commands.executeCommand(metals_languageclient_1.ServerCommands.DebugAdapterStart, session.configuration);
                if (debugSession === undefined) {
                    return null;
                }
                else {
                    return debugServerFromUri(debugSession.uri);
                }
            }
            return null;
        });
    }
}
function debugServerFromUri(uri) {
    const debugServer = vscode.Uri.parse(uri);
    const segments = debugServer.authority.split(":");
    const host = segments[0];
    const port = parseInt(segments[segments.length - 1]);
    return new vscode.DebugAdapterServer(port, host);
}
exports.debugServerFromUri = debugServerFromUri;
//# sourceMappingURL=scalaDebugger.js.map
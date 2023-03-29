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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todayString = exports.getServerVersion = void 0;
const vscode_1 = require("vscode");
const metalsLanguageClient = __importStar(require("metals-languageclient"));
const workbenchCommands = __importStar(require("./workbenchCommands"));
const https_1 = __importDefault(require("https"));
const util_1 = require("./util");
const CheckForUpdateRepo_1 = require("./repository/CheckForUpdateRepo");
const checkForUpdate_1 = require("./service/checkForUpdate");
const ConfigurationTarget_1 = require("./ConfigurationTarget");
const serverVersionSection = "serverVersion";
const suggestLatestUpgrade = "suggestLatestUpgrade";
function getServerVersion(config, context) {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const serverVersionConfig = config.get(serverVersionSection);
    const defaultServerVersion = config.inspect(serverVersionSection).defaultValue;
    const serverVersion = (serverVersionConfig === null || serverVersionConfig === void 0 ? void 0 : serverVersionConfig.trim()) || defaultServerVersion;
    validateCurrentVersion(serverVersion, config, context);
    return serverVersion;
}
exports.getServerVersion = getServerVersion;
function validateCurrentVersion(serverVersion, config, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const suggestUpgradeSetting = (0, util_1.getConfigValue)(config, suggestLatestUpgrade);
        const checkForUpdateRepo = new CheckForUpdateRepo_1.DefaultCheckForUpdateRepo(context);
        const checkForUpdate = () => __awaiter(this, void 0, void 0, function* () {
            if (suggestUpgradeSetting === null || suggestUpgradeSetting === void 0 ? void 0 : suggestUpgradeSetting.value) {
                return (0, checkForUpdate_1.needCheckForUpdates)(serverVersion, todayString(), fromVSCode(suggestUpgradeSetting.target), checkForUpdateRepo);
            }
            else {
                return false;
            }
        });
        const isUpdateAvailable = yield checkForUpdate();
        if (suggestUpgradeSetting && isUpdateAvailable) {
            const nextVersion = yield fetchLatest();
            if (nextVersion != serverVersion) {
                const message = `The latest server version is: ${nextVersion} while you are on ${serverVersion}. Do upgrade?`;
                const upgradeChoice = "Yes";
                const ignoreChoice = "No";
                vscode_1.window
                    .showInformationMessage(message, upgradeChoice, ignoreChoice)
                    .then((result) => {
                    if (result == upgradeChoice) {
                        config.update(serverVersionSection, nextVersion, suggestUpgradeSetting.target);
                        checkForUpdateRepo.saveLastUpdated(nextVersion, todayString(), fromVSCode(suggestUpgradeSetting.target));
                    }
                    else if (result == ignoreChoice) {
                        // extend the current version expiration date
                        checkForUpdateRepo.saveLastUpdated(serverVersion, todayString(), fromVSCode(suggestUpgradeSetting.target));
                    }
                });
            }
        }
        else {
            warnIfIsOutdated(config);
        }
    });
}
function fetchLatest() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://scalameta.org/metals/latests.json";
        const ps = new Promise((resolve, reject) => {
            https_1.default.get(url, (resp) => {
                let body = "";
                resp.on("data", (chunk) => (body += chunk));
                resp.on("end", () => resolve(body));
                resp.on("error", (e) => reject(e));
            });
        });
        const text = yield ps;
        const json = JSON.parse(text);
        const sorted = [json["release"], json["snapshot"]].sort();
        return sorted[sorted.length - 1];
    });
}
function warnIfIsOutdated(config) {
    metalsLanguageClient.checkServerVersion({
        config,
        updateConfig: (updateParams) => {
            const { configSection, latestServerVersion, configurationTarget } = updateParams;
            config.update(configSection, latestServerVersion, configurationTarget);
        },
        onOutdated: (outdatedParams) => __awaiter(this, void 0, void 0, function* () {
            const { upgrade, message, upgradeChoice, openSettingsChoice, dismissChoice, } = outdatedParams;
            const choice = yield vscode_1.window.showWarningMessage(message, upgradeChoice, openSettingsChoice, dismissChoice);
            switch (choice) {
                case upgradeChoice:
                    upgrade();
                    break;
                case openSettingsChoice:
                    vscode_1.commands.executeCommand(workbenchCommands.openSettings);
                    break;
            }
        }),
    });
}
/**
 * @returns YYYY-MM-DD in a local date
 */
function todayString() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return [year, month, day].join("-");
}
exports.todayString = todayString;
function fromVSCode(target) {
    switch (target) {
        case vscode_1.ConfigurationTarget.Global:
            return ConfigurationTarget_1.ConfigurationTarget.Global;
        case vscode_1.ConfigurationTarget.Workspace:
            return ConfigurationTarget_1.ConfigurationTarget.Workspace;
        case vscode_1.ConfigurationTarget.WorkspaceFolder:
            return ConfigurationTarget_1.ConfigurationTarget.Workspace;
    }
}
//# sourceMappingURL=getServerVersion.js.map
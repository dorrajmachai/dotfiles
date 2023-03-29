"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageclient_1 = require("vscode-languageclient");
var StatusNotification;
(function (StatusNotification) {
    StatusNotification.type = new vscode_languageclient_1.NotificationType('groovylintlsp/status');
})(StatusNotification = exports.StatusNotification || (exports.StatusNotification = {}));
var ActiveDocumentNotification;
(function (ActiveDocumentNotification) {
    ActiveDocumentNotification.type = new vscode_languageclient_1.NotificationType('groovylintlsp/activedocument');
})(ActiveDocumentNotification = exports.ActiveDocumentNotification || (exports.ActiveDocumentNotification = {}));
var OpenNotification;
(function (OpenNotification) {
    OpenNotification.type = new vscode_languageclient_1.NotificationType("groovylintlsp/open");
})(OpenNotification = exports.OpenNotification || (exports.OpenNotification = {}));
//# sourceMappingURL=types.js.map
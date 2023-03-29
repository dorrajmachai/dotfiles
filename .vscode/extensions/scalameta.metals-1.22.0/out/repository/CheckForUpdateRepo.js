"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCheckForUpdateRepo = void 0;
const ConfigurationTarget_1 = require("../ConfigurationTarget");
class DefaultCheckForUpdateRepo {
    constructor(context) {
        this.context = context;
        this.CurrentVersionKey = "currentVersion";
        this.LastUpdatedAtKey = "lastUpdatedAt";
    }
    getLastUpdated(target) {
        const state = this.storage(target);
        const prevVersion = state.get(this.CurrentVersionKey);
        const lastUpdatedAt = state.get(this.LastUpdatedAtKey);
        return {
            prevVersion,
            lastUpdatedAt,
        };
    }
    saveLastUpdated(serverVersion, lastUpdatedAt, target) {
        const state = this.storage(target);
        state.update(this.CurrentVersionKey, serverVersion);
        state.update(this.LastUpdatedAtKey, lastUpdatedAt);
        return;
    }
    storage(target) {
        return target === ConfigurationTarget_1.ConfigurationTarget.Global
            ? this.context.globalState
            : this.context.workspaceState;
    }
}
exports.DefaultCheckForUpdateRepo = DefaultCheckForUpdateRepo;
//# sourceMappingURL=CheckForUpdateRepo.js.map
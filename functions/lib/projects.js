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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualSyncPortfolio = exports.syncGitHubPortfolio = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const axios_1 = __importDefault(require("axios"));
const logger = __importStar(require("firebase-functions/logger"));
const db = admin.firestore();
const TARGET_REPOS = [
    "gammarips-engine",
    "gammarips-mcp",
    "gammarips-webapp",
    "gammarips-models",
    "smart-city",
    "galaqtiq-invoice-agent",
    "serverless-pii-vault",
    "evanparra-portfolio"
];
const GITHUB_USERNAME = "devdizzle";
// Sync function logic
async function syncPortfolioLogic() {
    logger.info("Starting GitHub Portfolio Sync...");
    try {
        const response = await axios_1.default.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Firebase-Cloud-Function'
            }
        });
        const repos = response.data;
        const batch = db.batch();
        // Filter and map to Firestore
        const syncedRepos = repos.filter((repo) => TARGET_REPOS.includes(repo.name));
        for (const repo of syncedRepos) {
            const docRef = db.collection('projects').doc(repo.name);
            const projectData = {
                slug: repo.name,
                title: repo.name,
                description: repo.description || "No description provided.",
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || "",
                status: "active",
                featured: true,
                technologies: [repo.language].filter(Boolean),
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                updatedAt: admin.firestore.Timestamp.fromDate(new Date(repo.updated_at)),
                syncedAt: admin.firestore.FieldValue.serverTimestamp()
            };
            batch.set(docRef, projectData, { merge: true });
        }
        await batch.commit();
        logger.info(`Successfully synced ${syncedRepos.length} repositories.`);
        return { success: true, count: syncedRepos.length };
    }
    catch (error) {
        logger.error("Error syncing GitHub portfolio:", error);
        throw error;
    }
}
// Scheduled Trigger (Every 24 hours)
exports.syncGitHubPortfolio = (0, scheduler_1.onSchedule)("every 24 hours", async (event) => {
    await syncPortfolioLogic();
});
// Manual Trigger (Callable)
exports.manualSyncPortfolio = (0, https_1.onCall)({ cors: true }, async (request) => {
    logger.info("Manual Sync Triggered by User");
    try {
        return await syncPortfolioLogic();
    }
    catch (error) {
        throw new https_1.HttpsError('internal', error.message);
    }
});
//# sourceMappingURL=projects.js.map
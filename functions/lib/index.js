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
exports.manualSyncPortfolio = exports.syncGitHubPortfolio = exports.addBlogPost = exports.upsertBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = exports.sendContactNotification = exports.sendBookingNotification = exports.contactForm = exports.submitForm = exports.visionAnalysisFlow = exports.bookingAgentFlow = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const https_1 = require("firebase-functions/v2/https");
const agent_1 = require("./agent");
const vision_1 = require("./vision");
const sendBookingNotification_1 = require("./triggers/sendBookingNotification");
Object.defineProperty(exports, "sendBookingNotification", { enumerable: true, get: function () { return sendBookingNotification_1.sendBookingNotification; } });
const sendContactNotification_1 = require("./triggers/sendContactNotification");
Object.defineProperty(exports, "sendContactNotification", { enumerable: true, get: function () { return sendContactNotification_1.sendContactNotification; } });
const blog_1 = require("./blog");
Object.defineProperty(exports, "getBlogPosts", { enumerable: true, get: function () { return blog_1.getBlogPosts; } });
Object.defineProperty(exports, "getBlogPostBySlug", { enumerable: true, get: function () { return blog_1.getBlogPostBySlug; } });
Object.defineProperty(exports, "upsertBlogPost", { enumerable: true, get: function () { return blog_1.upsertBlogPost; } });
Object.defineProperty(exports, "addBlogPost", { enumerable: true, get: function () { return blog_1.addBlogPost; } });
const projects_1 = require("./projects");
Object.defineProperty(exports, "syncGitHubPortfolio", { enumerable: true, get: function () { return projects_1.syncGitHubPortfolio; } });
Object.defineProperty(exports, "manualSyncPortfolio", { enumerable: true, get: function () { return projects_1.manualSyncPortfolio; } });
const corsHandler = (0, cors_1.default)({ origin: true });
admin.initializeApp();
// Export the Genkit flow as a Callable Function
// This allows the client to call it using httpsCallable(functions, 'bookingAgentFlow')
exports.bookingAgentFlow = (0, https_1.onCall)({ cors: true, secrets: ["GOOGLE_GENAI_API_KEY"] }, async (request) => {
    return await (0, agent_1.bookingAgentFlow)(request.data);
});
exports.visionAnalysisFlow = (0, https_1.onCall)({ cors: true, timeoutSeconds: 60, memory: "1GiB", secrets: ["GOOGLE_GENAI_API_KEY"] }, async (request) => {
    return await (0, vision_1.visionAnalysisFlow)(request.data);
});
exports.submitForm = functions.https.onRequest((req, res) => {
    corsHandler(req, res, () => {
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }
        const { name, businessName, phone, email, website, businessChallenge } = req.body;
        if (!name || !email || !businessChallenge) {
            res.status(400).send("Missing required fields");
            return;
        }
        const db = admin.firestore();
        const submission = {
            name,
            businessName,
            phone,
            email,
            website,
            businessChallenge,
            createdAt: new Date(),
        };
        db.collection("submissions").add(submission)
            .then(() => {
            res.status(200).send({ success: true, message: "Form submitted successfully" });
        })
            .catch((error) => {
            console.error("Error writing to Firestore: ", error);
            res.status(500).send("Error submitting form");
        });
    });
});
exports.contactForm = functions.https.onRequest((req, res) => {
    corsHandler(req, res, () => {
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }
        const { name, email, service, budget, message } = req.body;
        if (!name || !email) {
            res.status(400).send("Missing required fields");
            return;
        }
        const db = admin.firestore();
        const submission = {
            name,
            email,
            service: service || '',
            budget: budget || '',
            message: message || '',
            createdAt: new Date(),
            source: 'contact-form'
        };
        db.collection("contact_submissions").add(submission)
            .then(() => {
            res.status(200).send({ success: true, message: "Form submitted successfully" });
        })
            .catch((error) => {
            console.error("Error writing to Firestore: ", error);
            res.status(500).send("Error submitting form");
        });
    });
});
//# sourceMappingURL=index.js.map
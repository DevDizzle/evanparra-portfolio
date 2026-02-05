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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitBookingRequest = void 0;
const genkit_1 = require("genkit");
const admin = __importStar(require("firebase-admin"));
const config_1 = require("./config");
const firestore_1 = require("firebase-admin/firestore");
// Submit Booking Request tool
exports.submitBookingRequest = config_1.ai.defineTool({
    name: 'submitBookingRequest',
    description: 'Submits a booking request for an appointment. Use this when the user wants to book a time.',
    inputSchema: genkit_1.z.object({
        name: genkit_1.z.string().describe('Name of the user'),
        email: genkit_1.z.string().email().describe('Email address of the user'),
        businessName: genkit_1.z.string().optional().describe('Name of the business'),
        businessChallenge: genkit_1.z.string().optional().describe('The primary challenge or reason for the audit'),
        date: genkit_1.z.string().describe('Requested date in YYYY-MM-DD format'),
        time: genkit_1.z.string().describe('Requested time (e.g., "2:00 PM")'),
    }),
    outputSchema: genkit_1.z.object({
        success: genkit_1.z.boolean(),
        message: genkit_1.z.string(),
    }),
}, async (input) => {
    try {
        const db = admin.firestore();
        // Add the request to the 'bookingRequests' collection
        await db.collection('bookingRequests').add({
            ...input,
            status: 'pending',
            createdAt: firestore_1.FieldValue.serverTimestamp(),
        });
        return {
            success: true,
            message: `Request received for ${input.date} at ${input.time}. Evan will review your request and confirm via email shortly.`,
        };
    }
    catch (error) {
        console.error("Error submitting booking request:", error);
        return {
            success: false,
            message: `Failed to submit request: ${error.message || 'Unknown error'}. Please try again later.`,
        };
    }
});
//# sourceMappingURL=tools.js.map
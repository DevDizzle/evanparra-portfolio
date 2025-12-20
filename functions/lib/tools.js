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
exports.bookAppointment = exports.checkAvailability = void 0;
const genkit_1 = require("genkit");
const admin = __importStar(require("firebase-admin"));
const config_1 = require("./config");
// Mock availability tool
exports.checkAvailability = config_1.ai.defineTool({
    name: 'checkAvailability',
    description: 'Checks for available appointment slots for a given date.',
    inputSchema: genkit_1.z.object({
        date: genkit_1.z.string().describe('The date to check in YYYY-MM-DD format'),
    }),
    outputSchema: genkit_1.z.object({
        slots: genkit_1.z.array(genkit_1.z.string()).describe('List of available time slots'),
    }),
}, async ({ date }) => {
    // In a real app, this would query Google Calendar
    // For now, return mock slots for the next 7 days
    console.log(`Checking availability for ${date}`);
    return {
        slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    };
});
// Booking tool
exports.bookAppointment = config_1.ai.defineTool({
    name: 'bookAppointment',
    description: 'Books an appointment slot for the user.',
    inputSchema: genkit_1.z.object({
        name: genkit_1.z.string(),
        email: genkit_1.z.string().email(),
        businessName: genkit_1.z.string().optional(),
        businessChallenge: genkit_1.z.string().optional(),
        date: genkit_1.z.string(),
        time: genkit_1.z.string(),
    }),
    outputSchema: genkit_1.z.object({
        confirmationId: genkit_1.z.string(),
        success: genkit_1.z.boolean(),
        message: genkit_1.z.string(),
    }),
}, async (input) => {
    const db = admin.firestore();
    const appointmentRef = db.collection('appointments').doc();
    await appointmentRef.set({
        ...input,
        createdAt: new Date(),
        status: 'confirmed',
    });
    return {
        confirmationId: appointmentRef.id,
        success: true,
        message: `Appointment confirmed for ${input.date} at ${input.time}.`,
    };
});
//# sourceMappingURL=tools.js.map
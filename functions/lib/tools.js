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
const googleCalendar_1 = require("./googleCalendar");
// Helper to parse date and time strings into a Date object
const parseDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12)
        hours += 12;
    if (modifier === 'AM' && hours === 12)
        hours = 0;
    date.setHours(hours, minutes, 0, 0);
    return date;
};
// Check availability tool
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
    console.log(`Checking availability for ${date}`);
    try {
        const slots = await (0, googleCalendar_1.getAvailableSlots)(date);
        return { slots };
    }
    catch (error) {
        console.error('Error fetching slots:', error);
        // Fallback to empty list or handle error
        return { slots: [] };
    }
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
    try {
        const startTime = parseDateTime(input.date, input.time);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration
        // 1. Check if the slot is actually available
        const available = await (0, googleCalendar_1.isSlotAvailable)(startTime, endTime);
        if (!available) {
            return {
                confirmationId: '',
                success: false,
                message: `The slot at ${input.time} on ${input.date} is no longer available. Please choose another time.`,
            };
        }
        // 2. Create Google Calendar Event
        const eventDetails = {
            summary: `Appointment with ${input.name}`,
            description: `
          Name: ${input.name}
          Email: ${input.email}
          Business: ${input.businessName || 'N/A'}
          Challenge: ${input.businessChallenge || 'N/A'}
        `,
            startTime,
            endTime,
            attendeeEmail: input.email,
        };
        const calendarEvent = await (0, googleCalendar_1.createCalendarEvent)(eventDetails);
        // 3. Save to Firestore
        const db = admin.firestore();
        const appointmentRef = db.collection('appointments').doc();
        await appointmentRef.set({
            ...input,
            createdAt: new Date(),
            status: 'confirmed',
            googleCalendarEventId: calendarEvent.id,
            googleCalendarLink: calendarEvent.htmlLink,
        });
        return {
            confirmationId: appointmentRef.id,
            success: true,
            message: `Appointment confirmed for ${input.date} at ${input.time}. A calendar invitation has been sent to ${input.email}.`,
        };
    }
    catch (error) {
        console.error("Error booking appointment:", error);
        return {
            confirmationId: '',
            success: false,
            message: `Failed to book appointment: ${error.message || 'Unknown error'}. Please try again later.`,
        };
    }
});
//# sourceMappingURL=tools.js.map
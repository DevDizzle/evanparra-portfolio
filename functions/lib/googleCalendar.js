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
exports.CALENDAR_ID = void 0;
exports.isSlotAvailable = isSlotAvailable;
exports.createCalendarEvent = createCalendarEvent;
exports.getAvailableSlots = getAvailableSlots;
const googleapis_1 = require("googleapis");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Configuration
// Ideally, the Calendar ID is configured via environment variables.
// Defaulting to the user's email as discussed.
exports.CALENDAR_ID = process.env.CALENDAR_ID || 'eraphaelparra@gmail.com';
// Path to the service account key file.
// We expect 'service-account.json' to be in the root of the 'functions' directory.
// When running in production (compiled to 'lib/'), __dirname is 'functions/lib'.
const KEY_PATH = path.join(__dirname, '../service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// Initialize Auth
let auth;
if (fs.existsSync(KEY_PATH)) {
    auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: KEY_PATH,
        scopes: SCOPES,
    });
}
else {
    console.warn(`
    [GoogleCalendar] Service Account Key not found at ${KEY_PATH}.
    Calendar operations will likely fail unless using default credentials.
  `);
    // Fallback to default credentials (useful for some local dev setups or if using Identity)
    auth = new googleapis_1.google.auth.GoogleAuth({
        scopes: SCOPES,
    });
}
const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
/**
 * Checks if a specific time range is clear of conflicts.
 */
async function isSlotAvailable(startTime, endTime) {
    try {
        const response = await calendar.events.list({
            calendarId: exports.CALENDAR_ID,
            timeMin: startTime.toISOString(),
            timeMax: endTime.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = response.data.items;
        // If there are events, the slot is not available
        if (events && events.length > 0) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('[GoogleCalendar] Error checking availability:', error);
        throw new Error('Failed to check calendar availability.');
    }
}
/**
 * Creates a calendar event.
 */
async function createCalendarEvent(eventDetails) {
    const event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
            dateTime: eventDetails.startTime.toISOString(),
            timeZone: 'UTC', // Using UTC for simplicity, Google Cal converts to display time
        },
        end: {
            dateTime: eventDetails.endTime.toISOString(),
            timeZone: 'UTC',
        },
        // Add the user as an attendee so they get an invite/notification
        attendees: eventDetails.attendeeEmail ? [{ email: eventDetails.attendeeEmail }] : [],
    };
    try {
        const response = await calendar.events.insert({
            calendarId: exports.CALENDAR_ID,
            requestBody: event,
        });
        return response.data;
    }
    catch (error) {
        console.error('[GoogleCalendar] Error creating event:', error);
        throw new Error('Failed to create calendar event.');
    }
}
/**
 * Returns a list of available 1-hour slots for a given date between 9 AM and 5 PM.
 */
async function getAvailableSlots(dateStr) {
    const startOfDay = new Date(dateStr);
    startOfDay.setHours(9, 0, 0, 0); // Start at 9 AM
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(17, 0, 0, 0); // End at 5 PM
    // Get all events for the day
    let events = [];
    try {
        const response = await calendar.events.list({
            calendarId: exports.CALENDAR_ID,
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });
        events = response.data.items || [];
    }
    catch (error) {
        console.error('[GoogleCalendar] Error listing events for slots:', error);
        return []; // Return empty on error
    }
    const availableSlots = [];
    const slotDuration = 60 * 60 * 1000; // 1 hour in ms
    // Iterate from 9 AM to 4 PM (last slot starts at 4)
    for (let currentTime = startOfDay.getTime(); currentTime < endOfDay.getTime(); currentTime += slotDuration) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(currentTime + slotDuration);
        // Check if this slot overlaps with any existing event
        const isConflict = events.some((event) => {
            const eventStart = new Date(event.start.dateTime || event.start.date);
            const eventEnd = new Date(event.end.dateTime || event.end.date);
            // Simple overlap check
            return (slotStart < eventEnd && slotEnd > eventStart);
        });
        if (!isConflict) {
            // Format time as HH:mm AM/PM
            const timeString = slotStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            availableSlots.push(timeString);
        }
    }
    return availableSlots;
}
//# sourceMappingURL=googleCalendar.js.map
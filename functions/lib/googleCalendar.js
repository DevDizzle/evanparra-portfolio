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
exports.CALENDAR_ID = process.env.CALENDAR_ID || 'eraphaelparra@gmail.com';
// Path to the service account key file.
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
    // Fallback to default credentials
    auth = new googleapis_1.google.auth.GoogleAuth({
        scopes: SCOPES,
    });
}
const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
const TIMEZONE = 'America/New_York';
/**
 * Checks if a specific time range is clear of conflicts.
 * Returns NULL if available, or the conflicting event object if busy.
 */
async function isSlotAvailable(startTime, endTime) {
    try {
        const response = await calendar.events.list({
            calendarId: exports.CALENDAR_ID,
            timeMin: startTime.toISOString(),
            timeMax: endTime.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
            timeZone: TIMEZONE,
        });
        const events = response.data.items || [];
        // Find the first ACTUAL conflict
        const conflict = events.find(event => {
            // Ignore events that are marked as "Free" (transparent)
            if (event.transparency === 'transparent')
                return false;
            // Optional: Explicitly ignore events with "birthday" in the title if they are accidentally set to Busy
            if (event.summary?.toLowerCase().includes('birthday'))
                return false;
            return true;
        });
        return conflict || null;
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
            timeZone: TIMEZONE,
        },
        end: {
            dateTime: eventDetails.endTime.toISOString(),
            timeZone: TIMEZONE,
        },
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
 * Returns a list of available 1-hour slots for a given date between 9 AM and 5 PM EST.
 */
async function getAvailableSlots(dateStr) {
    const startOfDay = new Date(`${dateStr}T09:00:00-05:00`);
    const endOfDay = new Date(`${dateStr}T17:00:00-05:00`);
    let events = [];
    try {
        const response = await calendar.events.list({
            calendarId: exports.CALENDAR_ID,
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
            timeZone: TIMEZONE,
        });
        events = response.data.items || [];
    }
    catch (error) {
        console.error('[GoogleCalendar] Error listing events for slots:', error);
        return [];
    }
    const availableSlots = [];
    const slotDuration = 60 * 60 * 1000;
    for (let currentTime = startOfDay.getTime(); currentTime < endOfDay.getTime(); currentTime += slotDuration) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(currentTime + slotDuration);
        const isConflict = events.some((event) => {
            // Ignore Free/Transparent events
            if (event.transparency === 'transparent')
                return false;
            if (event.summary?.toLowerCase().includes('birthday'))
                return false;
            const eventStart = new Date(event.start.dateTime || event.start.date);
            const eventEnd = new Date(event.end.dateTime || event.end.date);
            return (slotStart < eventEnd && slotEnd > eventStart);
        });
        if (!isConflict) {
            const timeString = slotStart.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: TIMEZONE
            });
            availableSlots.push(timeString);
        }
    }
    return availableSlots;
}
//# sourceMappingURL=googleCalendar.js.map
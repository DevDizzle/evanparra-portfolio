import { z } from 'genkit';
import * as admin from 'firebase-admin';
import { ai } from './config';
import { getAvailableSlots, isSlotAvailable, createCalendarEvent } from './googleCalendar';

// Helper to parse date and time strings into a Date object
const parseDateTime = (dateStr: string, timeStr: string): Date => {
  const date = new Date(dateStr);
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Check availability tool
export const checkAvailability = ai.defineTool(
  {
    name: 'checkAvailability',
    description: 'Checks for available appointment slots for a given date.',
    inputSchema: z.object({
      date: z.string().describe('The date to check in YYYY-MM-DD format'),
    }),
    outputSchema: z.object({
      slots: z.array(z.string()).describe('List of available time slots'),
    }),
  },
  async ({ date }) => {
    console.log(`Checking availability for ${date}`);
    try {
      const slots = await getAvailableSlots(date);
      return { slots };
    } catch (error) {
      console.error('Error fetching slots:', error);
      // Fallback to empty list or handle error
      return { slots: [] };
    }
  }
);

// Booking tool
export const bookAppointment = ai.defineTool(
  {
    name: 'bookAppointment',
    description: 'Books an appointment slot for the user.',
    inputSchema: z.object({
      name: z.string(),
      email: z.string().email(),
      businessName: z.string().optional(),
      businessChallenge: z.string().optional(),
      date: z.string(),
      time: z.string(),
    }),
    outputSchema: z.object({
      confirmationId: z.string(),
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    try {
      const startTime = parseDateTime(input.date, input.time);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

      // 1. Check if the slot is actually available
      const available = await isSlotAvailable(startTime, endTime);
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

      const calendarEvent = await createCalendarEvent(eventDetails);

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
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      return {
        confirmationId: '',
        success: false,
        message: `Failed to book appointment: ${error.message || 'Unknown error'}. Please try again later.`,
      };
    }
  }
);

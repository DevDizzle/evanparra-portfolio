import { z } from 'genkit';
import * as admin from 'firebase-admin';
import { ai } from './config';

// Mock availability tool
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
    // In a real app, this would query Google Calendar
    // For now, return mock slots for the next 7 days
    console.log(`Checking availability for ${date}`);
    return {
      slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    };
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
  }
);
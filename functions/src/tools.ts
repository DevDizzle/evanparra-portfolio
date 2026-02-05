import { z } from 'genkit';
import * as admin from 'firebase-admin';
import { ai } from './config';
import { FieldValue } from 'firebase-admin/firestore';

// Submit Booking Request tool
export const submitBookingRequest = ai.defineTool(
  {
    name: 'submitBookingRequest',
    description: 'Submits a booking request for an appointment. Use this when the user wants to book a time.',
    inputSchema: z.object({
      name: z.string().describe('Name of the user'),
      email: z.string().email().describe('Email address of the user'),
      businessName: z.string().optional().describe('Name of the business'),
      businessChallenge: z.string().optional().describe('The primary challenge or reason for the audit'),
      date: z.string().describe('Requested date in YYYY-MM-DD format'),
      time: z.string().describe('Requested time (e.g., "2:00 PM")'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    try {
      const db = admin.firestore();
      
      // Add the request to the 'bookingRequests' collection
      await db.collection('bookingRequests').add({
        ...input,
        status: 'pending',
        createdAt: FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        message: `Request received for ${input.date} at ${input.time}. Evan will review your request and confirm via email shortly.`,
      };
    } catch (error: any) {
      console.error("Error submitting booking request:", error);
      return {
        success: false,
        message: `Failed to submit request: ${error.message || 'Unknown error'}. Please try again later.`,
      };
    }
  }
);

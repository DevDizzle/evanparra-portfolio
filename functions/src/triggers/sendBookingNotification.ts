import Mailgun from "mailgun.js";
import FormData from "form-data";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Initialize Mailgun
// Using onDocumentCreated which is V2, so we should use defineSecret or params if possible, 
// but for now relying on process.env or config() set in the environment.
// For V2 functions, params are preferred.
// Let's assume the user will set params or secrets. For simplicity in V1/V2 mix, we can use process.env populated by config.

const mailgun = new Mailgun(FormData);

export const sendBookingNotification = onDocumentCreated(
  {
    document: "bookingRequests/{docId}",
    secrets: ["MAILGUN_API_KEY", "MAILGUN_DOMAIN", "MAILGUN_RECIPIENT"],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const docId = event.params.docId;

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const recipient = process.env.MAILGUN_RECIPIENT;

    if (!apiKey || !domain || !recipient) {
      console.error("Missing Mailgun configuration (MAILGUN_API_KEY, MAILGUN_DOMAIN, or MAILGUN_RECIPIENT).");
      return;
    }

    const mg = mailgun.client({ username: "api", key: apiKey });

    const emailSubject = `New Booking Request: ${data.name}`;
    const emailBody = `
      New Booking Request Received!
      
      Name: ${data.name}
      Email: ${data.email}
      Business: ${data.businessName || 'N/A'}
      Requested Time: ${data.date} @ ${data.time}
      Challenge: ${data.businessChallenge || 'N/A'}
      
      Request ID: ${docId}
      Received At: ${data.createdAt?.toDate ? data.createdAt.toDate() : new Date()}
    `;

    try {
      await mg.messages.create(domain, {
        from: `Evan's AI Assistant <noreply@${domain}>`,
        to: [recipient],
        subject: emailSubject,
        text: emailBody,
      });

      console.log(`Notification email sent for request ${docId}`);

      // Optional: Update status to 'notified'
      await snapshot.ref.update({ status: 'notified' });

    } catch (error) {
      console.error("Error sending email via Mailgun:", error);
    }
  }
);

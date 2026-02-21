import Mailgun from "mailgun.js";
import FormData from "form-data";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

const mailgun = new Mailgun(FormData);

export const sendContactNotification = onDocumentCreated(
  {
    document: "contact_submissions/{docId}",
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
    const recipient = process.env.MAILGUN_RECIPIENT || "admin@evanparra.ai";

    if (!apiKey || !domain) {
      console.error("Missing Mailgun configuration (MAILGUN_API_KEY or MAILGUN_DOMAIN).");
      return;
    }

    const mg = mailgun.client({ username: "api", key: apiKey });

    const emailSubject = `New Contact Form Submission: ${data.name}`;
    const emailBody = `
      New Contact Form Submission!
      
      Name: ${data.name}
      Email: ${data.email}
      Service Interest: ${data.service || 'N/A'}
      Budget: ${data.budget || 'N/A'}
      
      Message:
      ${data.message || 'No message provided'}
      
      -----------------------------------
      Request ID: ${docId}
      Received At: ${data.createdAt?.toDate ? data.createdAt.toDate() : new Date()}
      Source: ${data.source || 'contact-form'}
    `;

    try {
      await mg.messages.create(domain, {
        from: `Evan's AI Assistant <noreply@${domain}>`,
        to: [recipient],
        subject: emailSubject,
        text: emailBody,
      });

      console.log(`Notification email sent for contact submission ${docId}`);

      // Optional: Update status to 'notified'
      await snapshot.ref.update({ status: 'notified' });

    } catch (error) {
      console.error("Error sending email via Mailgun:", error);
    }
  }
);

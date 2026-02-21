"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactNotification = void 0;
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
const firestore_1 = require("firebase-functions/v2/firestore");
const mailgun = new mailgun_js_1.default(form_data_1.default);
exports.sendContactNotification = (0, firestore_1.onDocumentCreated)({
    document: "contact_submissions/{docId}",
    secrets: ["MAILGUN_API_KEY", "MAILGUN_DOMAIN", "MAILGUN_RECIPIENT"],
}, async (event) => {
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
    }
    catch (error) {
        console.error("Error sending email via Mailgun:", error);
    }
});
//# sourceMappingURL=sendContactNotification.js.map
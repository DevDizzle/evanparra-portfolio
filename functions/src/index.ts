import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import { onCall } from "firebase-functions/v2/https";
import { bookingAgentFlow as agentFlow } from "./agent";
import { visionAnalysisFlow as visionFlow } from "./vision";
import { sendBookingNotification } from "./triggers/sendBookingNotification";
import { getBlogPosts, getBlogPostBySlug, upsertBlogPost } from "./blog";
import { syncGitHubPortfolio, manualSyncPortfolio } from "./projects";

const corsHandler = cors({ origin: true });

admin.initializeApp();

// Export the Genkit flow as a Callable Function
// This allows the client to call it using httpsCallable(functions, 'bookingAgentFlow')
export const bookingAgentFlow = onCall({ cors: true, secrets: ["GOOGLE_GENAI_API_KEY"] }, async (request) => {
  return await agentFlow(request.data);
});

export const visionAnalysisFlow = onCall({ cors: true, timeoutSeconds: 60, memory: "1GiB", secrets: ["GOOGLE_GENAI_API_KEY"] }, async (request) => {
  return await visionFlow(request.data);
});

export const submitForm = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const { name, businessName, phone, email, website, businessChallenge } = req.body;

    if (!name || !email || !businessChallenge) {
      res.status(400).send("Missing required fields");
      return;
    }

    const db = admin.firestore();
    const submission = {
      name,
      businessName,
      phone,
      email,
      website,
      businessChallenge,
      createdAt: new Date(),
    };

    db.collection("submissions").add(submission)
      .then(() => {
        res.status(200).send({ success: true, message: "Form submitted successfully" });
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
        res.status(500).send("Error submitting form");
      });
  });
});

export { sendBookingNotification, getBlogPosts, getBlogPostBySlug, upsertBlogPost, syncGitHubPortfolio, manualSyncPortfolio };
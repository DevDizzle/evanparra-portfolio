const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: "https://evanparra-portfolio-8576-3a8bf.web.app" });

admin.initializeApp();

exports.submitForm = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { name, businessName, phone, email, website, businessChallenge } = req.body;

    if (!name || !email || !businessChallenge) {
      return res.status(400).send("Missing required fields");
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

    return db.collection("submissions").add(submission)
      .then(() => {
        return res.status(200).send({ success: true, message: "Form submitted successfully" });
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
        return res.status(500).send("Error submitting form");
      });
  });
});

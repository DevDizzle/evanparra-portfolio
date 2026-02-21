const admin = require('firebase-admin');
const { config } = require('dotenv');

config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing Firebase Admin credentials in .env");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();

async function forcePublish() {
  const slug = '3-questions-ai-production';
  console.log(`Attempting to force publish: ${slug}`);

  const docRef = db.collection('blogPosts').doc(slug);
  const doc = await docRef.get();

  if (!doc.exists) {
    console.error(`❌ Post '${slug}' does not exist in Firestore!`);
    console.log("Your agent may not have posted it yet, or it used a different slug.");
    return;
  }

  const data = doc.data();
  console.log(`Current status: ${data.status}`);
  console.log(`Published At: ${data.publishedAt ? data.publishedAt.toDate() : 'MISSING'}`);

  if (data.status !== 'published') {
    await docRef.update({
      status: 'published',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✅ SUCCESS: Updated status to 'published'. It should now appear on the site.`);
  } else {
    console.log(`ℹ️ Post is already published. If it's not showing, check your browser console for frontend errors.`);
  }
}

forcePublish().catch(console.error);

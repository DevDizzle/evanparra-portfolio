import * as dotenv from 'dotenv';
dotenv.config();

import { visionAnalysisFlow } from './vision';
import { bookingAgentFlow } from './agent';

async function testBackend() {
  console.log("--- Testing Backend Logic Directly ---");

  // Test Vision
  try {
    console.log("1. Testing Vision Flow...");
    const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const result = await visionAnalysisFlow({
      imageBase64: sampleImage,
      mode: 'invoice'
    });
    console.log("✅ Vision Flow Success:", JSON.stringify(result).substring(0, 50) + "...");
  } catch (error: any) {
    console.error("❌ Vision Flow Failed:", error.message);
  }

  // Test Agent
  try {
    console.log("\n2. Testing Agent Flow...");
    const result = await bookingAgentFlow({
      messages: [{ role: 'user', content: [{ text: 'Hello, who are you?' }] }]
    });
    console.log("✅ Agent Flow Success:", result.substring(0, 50) + "...");
  } catch (error: any) {
    console.error("❌ Agent Flow Failed:", error.message);
  }
}

testBackend();

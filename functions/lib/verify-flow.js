"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const vision_1 = require("./vision");
const agent_1 = require("./agent");
async function testBackend() {
    console.log("--- Testing Backend Logic Directly ---");
    // Test Vision
    try {
        console.log("1. Testing Vision Flow...");
        const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        const result = await (0, vision_1.visionAnalysisFlow)({
            imageBase64: sampleImage,
            mode: 'invoice'
        });
        console.log("✅ Vision Flow Success:", JSON.stringify(result).substring(0, 50) + "...");
    }
    catch (error) {
        console.error("❌ Vision Flow Failed:", error.message);
    }
    // Test Agent
    try {
        console.log("\n2. Testing Agent Flow...");
        const result = await (0, agent_1.bookingAgentFlow)({
            messages: [{ role: 'user', content: [{ text: 'Hello, who are you?' }] }]
        });
        console.log("✅ Agent Flow Success:", result.substring(0, 50) + "...");
    }
    catch (error) {
        console.error("❌ Agent Flow Failed:", error.message);
    }
}
testBackend();
//# sourceMappingURL=verify-flow.js.map
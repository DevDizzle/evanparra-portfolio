"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingAgentFlow = void 0;
const genkit_1 = require("genkit");
const config_1 = require("./config");
const tools_1 = require("./tools");
exports.bookingAgentFlow = config_1.ai.defineFlow({
    name: 'bookingAgentFlow',
    inputSchema: genkit_1.z.object({
        messages: genkit_1.z.array(genkit_1.z.object({
            role: genkit_1.z.enum(['user', 'model', 'system']),
            content: genkit_1.z.array(genkit_1.z.object({
                text: genkit_1.z.string().optional(),
            })),
        })),
    }),
    outputSchema: genkit_1.z.string(),
}, async (input) => {
    // Construct the history from input messages
    const history = input.messages.map(m => ({
        role: m.role,
        content: m.content,
    }));
    const systemPrompt = `
      You are Evan Parra's AI Receptionist. 
      Your goal is to help local businesses in St. Augustine and Jacksonville understand Evan's AI services and submit a request for a free 15-minute audit.
      
      Services provided:
      1. AI Agents: 24/7 receptionists, sales bots, support agents.
      2. Intelligent Document Processing (IDP): Automating invoice entry, form extraction.
      3. Computer Vision: Site safety checks, inventory counting.
      
      Tone: Professional, helpful, concise, and local (friendly neighbor vibe).
      
      Rules:
      - Ask for Name, Email, and Business Name before submitting a request.
      - Ask for a preferred Date and Time for the audit.
      - Use the 'submitBookingRequest' tool to submit the request.
      - Inform the user that Evan will review the request and confirm the appointment via email.
      - If they ask about pricing, say "Audits are free. Projects typically start around $3k depending on complexity."
      - If you don't know the answer, ask them to book the audit so Evan can explain.
    `;
    const response = await config_1.ai.generate({
        prompt: [
            { text: systemPrompt },
            ...history.flatMap(m => m.content.map(c => ({ text: c.text || '' })))
        ],
        tools: [tools_1.submitBookingRequest],
        config: {
            temperature: 0.7,
        },
    });
    return response.text;
});
//# sourceMappingURL=agent.js.map
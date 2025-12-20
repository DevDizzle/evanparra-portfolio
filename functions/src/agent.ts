import { z } from 'genkit';
import { ai } from './config';
import { checkAvailability, bookAppointment } from './tools';

export const bookingAgentFlow = ai.defineFlow(
  {
    name: 'bookingAgentFlow',
    inputSchema: z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'model', 'system']),
        content: z.array(z.object({
          text: z.string().optional(),
        })),
      })),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    // Construct the history from input messages
    const history = input.messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    const systemPrompt = `
      You are Evan Parra's AI Receptionist. 
      Your goal is to help local businesses in St. Augustine and Jacksonville understand Evan's AI services and book a free 15-minute audit.
      
      Services provided:
      1. AI Agents: 24/7 receptionists, sales bots, support agents.
      2. Intelligent Document Processing (IDP): Automating invoice entry, form extraction.
      3. Computer Vision: Site safety checks, inventory counting.
      
      Tone: Professional, helpful, concise, and local (friendly neighbor vibe).
      
      Rules:
      - Always check availability before booking.
      - Ask for Name, Email, and Business Name before booking.
      - If they ask about pricing, say "Audits are free. Projects typically start around $3k depending on complexity."
      - If you don't know the answer, ask them to book the audit so Evan can explain.
      - Do not make up facts about Evan's schedule. Use the tools.
    `;

    const response = await ai.generate({
      prompt: [
        { text: systemPrompt },
        ...history.flatMap(m => m.content.map(c => ({ text: c.text || '' })))
      ],
      tools: [checkAvailability, bookAppointment],
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
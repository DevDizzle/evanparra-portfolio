import { z } from 'genkit';
import { ai } from './config';

export const visionAnalysisFlow = ai.defineFlow(
  {
    name: 'visionAnalysisFlow',
    inputSchema: z.object({
      imageBase64: z.string().describe('Base64 encoded image data (data:image/jpeg;base64,...)'),
      mode: z.enum(['invoice', 'safety']).describe('Analysis mode: invoice extraction or safety inspection'),
    }),
    outputSchema: z.object({
      jsonResult: z.string().describe('JSON string of the result'),
    }),
  },
  async ({ imageBase64, mode }) => {
    let promptText = '';
    
    if (mode === 'invoice') {
      promptText = `
        Analyze this image as an invoice. 
        Extract the following fields into a pure JSON object:
        - invoice_number (string)
        - date (string)
        - vendor_name (string)
        - total_amount (number)
        - line_items (array of objects with description and amount)
        
        If a field is missing, use null. Return ONLY the JSON object, no markdown formatting.
      `;
    } else {
      promptText = `
        Analyze this construction site image for safety hazards.
        Return a pure JSON object with a "hazards" array.
        Each hazard object should have:
        - hazard_type (string)
        - severity (string: "Low", "Medium", "High")
        - description (string)
        - recommendation (string)
        
        Also include a "summary" field (string) with an overall safety assessment.
        Return ONLY the JSON object, no markdown formatting.
      `;
    }

    const response = await ai.generate({
      prompt: [
        { text: promptText },
        { media: { url: imageBase64 } },
      ],
      config: {
        temperature: 0.4, // Lower temperature for more deterministic extraction
      },
    });

    // Clean up potential markdown code blocks if the model includes them
    let rawText = response.text;
    if (rawText.startsWith('```json')) {
      rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (rawText.startsWith('```')) {
      rawText = rawText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    return {
      jsonResult: rawText,
    };
  }
);

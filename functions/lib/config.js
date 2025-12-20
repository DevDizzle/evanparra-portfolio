"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
const genkit_1 = require("genkit");
// import { firebase } from '@genkit-ai/firebase';
const googleai_1 = require("@genkit-ai/googleai");
exports.ai = (0, genkit_1.genkit)({
    plugins: [
        // firebase(),
        (0, googleai_1.googleAI)(),
    ],
    model: 'googleai/gemini-2.0-flash', // Updated to gemini-2.0-flash per plan
});
//# sourceMappingURL=config.js.map
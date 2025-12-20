# AI Playground Implementation Plan

## Overview
Transform `evanparra.ai` from a static portfolio into a **Live AI Playground**. 
1.  **AI Receptionist:** Replaces the contact form with a Genkit-powered chat agent that answers questions and books audits.
2.  **Vision Playground:** Replaces case studies with an interactive demo for Intelligent Document Processing (IDP) and Computer Vision (Site Safety).

## Architecture

### 1. Backend (Firebase Functions + Genkit)
*   **Runtime:** Node.js 20 (TypeScript).
*   **Framework:** Firebase Genkit.
*   **Model:** `gemini-2.0-flash` (Multimodal, fast, cost-effective).
*   **State:** Firebase Firestore.
*   **Flows:**
    1.  `bookingAgentFlow`: Conversational agent with tools for calendar and FAQs.
    2.  `visionAnalysisFlow`: Multimodal flow for analyzing images (Invoices vs. Site Photos).

### 2. Frontend (Astro + React)
*   **Components:**
    *   `AgentBookingChat.tsx`: Chat interface with streaming responses.
    *   `VisionPlayground.tsx`: Image uploader with "Invoice" and "Safety" modes.
*   **Integration:** Direct HTTP calls to Cloud Functions.

## Implementation Roadmap

### Phase 1: Infrastructure & AI Receptionist (High Priority)
*   **Step 1.1: Backend Upgrade**
    *   [x] Convert `functions/` to TypeScript.
    *   [x] Initialize Genkit (`genkit`, `@genkit-ai/googleai`).
*   **Step 1.2: Agent Logic**
    *   [x] Create `bookingAgentFlow` (using `ai.defineFlow`).
    *   [x] Implement `checkAvailability` tool (Mocked).
    *   [x] Implement `bookAppointment` tool (Firestore write).
    *   [x] Grounding: Add system prompt with "Evan Parra" business context.
*   **Step 1.3: Chat UI**
    *   [x] Build `AgentBookingChat.tsx` (Tailwind styled).
    *   [x] Integrate with `bookingAgentFlow` (via `firebase-functions/v2/https`).
    *   [x] Replace `<BookingForm />` in `index.astro`.

### Phase 2: Vision Playground (High Value)
*   **Step 2.1: Vision Logic**
    *   [x] Create `visionAnalysisFlow`.
    *   [x] Implement "Invoice Extraction" mode (JSON output).
    *   [x] Implement "Safety Inspection" mode (Object detection/Hazard list).
*   **Step 2.2: Vision UI**
    *   [x] Build `VisionPlayground.tsx`.
    *   [x] Add drag-and-drop upload + Sample images.
    *   [x] Display results (JSON view for docs, List view for safety).
    *   [x] Replace `<LocalWins />` in `index.astro`.

### Phase 3: Deployment
*   [x] `firebase deploy --only functions`
*   [x] `firebase deploy --only hosting`
*   [ ] Verification walk-through.

## Dependencies
*   Gemini API Key
*   Firebase Functions (Blaze)
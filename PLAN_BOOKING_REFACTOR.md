# Plan: Refactor Booking System to Async Request Flow

## Objective
Replace the current direct-to-calendar booking system with an asynchronous "Request -> Notify -> Confirm" flow. This resolves current stability issues with the Google Calendar API and gives the business owner (Evan) manual control over scheduling.

## Current State
- **Agent:** Directly calls `bookAppointment` tool.
- **Tool:** Checks Google Calendar availability and inserts events immediately using `googleapis`.
- **Database:** Stores confirmed appointments in `appointments` collection.
- **Issues:** Google Calendar API authentication/permission errors causing failed bookings.

## Future State
1.  **Agent:** Collects user details and preferred time.
2.  **Tool (`submitBookingRequest`):** Saves the request to a Firestore collection (`bookingRequests`) with status `pending`.
3.  **Backend Trigger:** A Firebase Cloud Function triggers on new `bookingRequests`.
4.  **Notification:** The trigger uses **Mailgun** to send an email to Evan with the booking details.
5.  **Confirmation:** (Manual step for now) Evan reviews the email and confirms with the client directly or adds to calendar manually.

---

## Implementation Steps

### 1. Project Configuration & Dependencies
- [ ] **Mailgun Setup:**
    - Obtain Mailgun API Key and Domain.
    - Set Firebase secrets/config: `firebase functions:config:set mailgun.key="YOUR_KEY" mailgun.domain="YOUR_DOMAIN" mailgun.recipient="YOUR_EMAIL"`.
- [ ] **Dependencies:**
    - Run in `functions/`: `npm install mailgun.js form-data`.
    - (Optional) Remove `googleapis` if availability checking is completely abandoned.

### 2. Backend Logic (Cloud Functions)

#### A. Modify Agent Tools (`functions/src/tools.ts`)
- [ ] Create a new tool `submitBookingRequest`.
    - **Input Schema:** Name, Email, Business Name, Proposed Date/Time, Context/Challenge.
    - **Action:**
        - Create a document in `bookingRequests` collection.
        - Fields: `{ ...inputs, status: 'pending', createdAt: FieldValue.serverTimestamp() }`.
    - **Return:** Success message (e.g., "Request received. Evan will review and confirm via email.").
- [ ] Remove/Deprecate `bookAppointment` and `checkAvailability` (unless simple availability checks are still desired without booking).

#### B. Update Agent Prompt (`functions/src/agent.ts`)
- [ ] Update the system prompt to reflect the new process.
    - *Before:* "Check availability and book immediately."
    - *After:* "Collect details and submit a request. Inform the user that Evan will confirm the time shortly."

#### C. Create Notification Trigger (`functions/src/triggers/sendBookingNotification.ts`)
- [ ] Create a generic trigger handler.
- [ ] Listen to `onDocumentCreated` for `bookingRequests/{docId}`.
- [ ] logic:
    - Initialize Mailgun client.
    - Construct email body:
        ```text
        New Booking Request:
        Name: {data.name}
        Email: {data.email}
        Business: {data.businessName}
        Requested Time: {data.date} @ {data.time}
        Challenge: {data.businessChallenge}
        ```
    - Send email to Evan.
    - Update doc status to `notified` (optional).

### 3. Cleanup
- [ ] Remove `functions/src/googleCalendar.ts` if completely replacing the API integration.
- [ ] Clean up unused service account keys if applicable.

---

## Future Enhancements (Phase 2)
- **Automated Confirmation:** Add a link in the notification email that Evan can click to "Approve" (triggering a client confirmation email).
- **Two-Way Sync:** Re-integrate Calendar API only for reading availability (read-only) to prevent requesting taken slots, while keeping writing (booking) manual/async.

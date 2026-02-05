#!/bin/bash

# Endpoint URL
URL="https://us-central1-evanparra-portfolio-8576-3a8bf.cloudfunctions.net/bookingAgentFlow"

# JSON Payload
# Booking for Dec 22nd at 10:00 AM
DATA='{
  "data": {
    "messages": [
      {
        "role": "user",
        "content": [
          { "text": "Book an appointment for December 22nd at 10:00 AM. Name: Morning Test, Email: test@example.com, Business: Test Inc. I confirm." }
        ]
      }
    ]
  }
}'

echo "Sending request to $URL..."
echo "Payload: $DATA"

# Send request
curl -X POST "$URL" \
     -H "Content-Type: application/json" \
     -d "$DATA"

# Prompt for Claude (Browser) — Make.com Webhook Setup for Virginia AI Futures Assessment

Copy this entire prompt into Claude in the browser. It has everything needed to walk you through the Make.com setup.

---

I need your help setting up a Make.com scenario (workflow) for a new assessment tool I've built. I'll walk you through what exists, what the webhook receives, and what the scenario needs to do. Please guide me step by step through the Make.com interface.

## Context

I have a Virginia AI Futures assessment at `assess.html` that:
1. Collects a user's email, name, business URL, and Virginia region
2. Runs them through a 10-question AI fluency assessment (Anthropic's 4D Framework)
3. Sends everything to Claude Sonnet 4.5 which generates a personalized scenario analysis
4. Displays results on the page
5. Sends a webhook POST to Make.com with all the data + a pre-rendered HTML email

I already have a separate Make.com scenario for my BuildFirst assessment (webhook: `https://hook.us2.make.com/96ptcm5uiskujpx9p2iuqrm5nqn1jcxq`). **This new scenario must be completely separate. Do not modify the existing BuildFirst scenario.**

## What the Webhook Receives

The assessment sends a JSON POST to the webhook URL with this payload structure:

```json
{
  "email": "user@company.com",
  "name": "Jane Smith",
  "region": "Richmond Metro",
  "business_url": "https://theircompany.com",
  "industry": "Insurance",

  "overall_score": 2.4,
  "spectrum_score": 2.5,
  "d_scores": {
    "delegation": 2.5,
    "description": 2.0,
    "discernment": 3.0,
    "diligence": 2.0
  },
  "d_levels": {
    "delegation": "Growing",
    "description": "Developing",
    "discernment": "Strong",
    "diligence": "Developing"
  },
  "strongest_d": "discernment",
  "weakest_d": "description",
  "current_mode": "Asking — uses AI for information retrieval but hasn't integrated it into workflows",

  "trajectory": "Pockets of Excellence is most relevant...",
  "scenario_relevance": [
    { "name": "Build It Yourself", "relevance": "medium" },
    { "name": "Software Does It For You", "relevance": "high" },
    { "name": "Pockets of Excellence", "relevance": "high" },
    { "name": "The Widening Gap", "relevance": "low" }
  ],

  "email_html": "<!DOCTYPE html><html>...full pre-rendered HTML email...</html>",

  "timestamp": "2026-03-17T22:15:00.000Z",
  "source": "virginia-futures-assessment"
}
```

## What the Make.com Scenario Needs to Do

### Step 1: Custom Webhook Trigger
- Create a new Custom Webhook (not connected to any existing webhook)
- This will generate a new URL that I'll paste into my code

### Step 2: Send Results Email to the User
- **To:** `{{email}}` (from the webhook payload)
- **From:** david@thisisluminary.co (or whatever sending address I have configured in Make.com — I use the same email service as my BuildFirst scenario)
- **Subject:** "Your Virginia AI Futures Analysis"
- **Body:** Use the `{{email_html}}` field from the webhook payload. This is a complete, pre-rendered HTML email. Do not modify it. Send it as HTML.
- **Reply-to:** david@thisisluminary.co

### Step 3: Notify David (me) of the New Lead
- Send an email to david@thisisluminary.co
- **Subject:** "VA Futures Assessment: {{name}} — {{region}} — {{industry}}"
- **Body:** Plain text summary:
```
New Virginia AI Futures assessment completed.

Name: {{name}}
Email: {{email}}
Region: {{region}}
Business: {{business_url}}
Industry: {{industry}}

Overall Fluency Score: {{overall_score}} / 4.0
Strongest dimension: {{strongest_d}}
Weakest dimension: {{weakest_d}}
Current mode: {{current_mode}}

Scenario trajectory: {{trajectory}}

Delegation: {{d_scores.delegation}} ({{d_levels.delegation}})
Description: {{d_scores.description}} ({{d_levels.description}})
Discernment: {{d_scores.discernment}} ({{d_levels.discernment}})
Diligence: {{d_scores.diligence}} ({{d_levels.diligence}})

Timestamp: {{timestamp}}
Source: {{source}}
```

### Step 4: Log to Google Sheet (for research tracking)
- Append a row to a Google Sheet (I'll create or specify the sheet)
- Columns:
  - Timestamp
  - Name
  - Email
  - Region
  - Business URL
  - Industry
  - Overall Score
  - Delegation Score
  - Description Score
  - Discernment Score
  - Diligence Score
  - Strongest Dimension
  - Weakest Dimension
  - Current Mode
  - Trajectory
  - Source

## Important Notes

- The `email_html` field contains a complete HTML document. It should be sent as-is as the HTML body of the email to the user. Do not wrap it in another template.
- The `source` field will always be `"virginia-futures-assessment"` for this webhook. This distinguishes it from any other webhooks.
- The `d_scores` and `d_levels` fields are nested objects. Make sure to map them correctly (e.g., `d_scores.delegation`, not just `d_scores`).
- The `scenario_relevance` field is an array of objects. For the Google Sheet, you can skip this or flatten it (e.g., separate columns for each scenario's relevance).

## What I Need From You

Walk me through this step by step in the Make.com interface:
1. Creating the new scenario
2. Adding the Custom Webhook trigger and getting the URL
3. Configuring the email-to-user step
4. Configuring the notification-to-David step
5. Configuring the Google Sheet logging step
6. Testing with sample data
7. Activating the scenario

Once I have the webhook URL, I'll paste it into my code and we're live.

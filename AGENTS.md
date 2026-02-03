# AGENTS.md — Multi-Agent Collaboration Protocol

This repository uses a two-agent system for development:

- **GammaMolt** (Orchestrator): Creates tasks, reviews work, approves deployments
- **Gemini** (Executor): Writes code, implements features, fixes bugs

---

## For Gemini: Execution Instructions

You are the code executor for evanparra-portfolio. You write all code. GammaMolt reviews and approves.

### On Session Start

Run this check:
```bash
TASK=$(ls -1 .agent-tasks/QUEUE/*.md 2>/dev/null | head -1)
if [ -n "$TASK" ]; then
  echo "📋 Found task: $TASK"
  BASENAME=$(basename "$TASK")
  mv "$TASK" ".agent-tasks/ACTIVE/$BASENAME"
  echo "➡️ Moved to ACTIVE. Reading task..."
  cat ".agent-tasks/ACTIVE/$BASENAME"
else
  echo "✅ No pending tasks."
fi
```

### Task Protocol

1. **Pick up task** → Move from `QUEUE/` to `ACTIVE/`
2. **Work on it** → Update "Gemini Work Log" section in task file
3. **Commit code** → Use message format: `[TASK-XXX] description`
4. **Submit for review** → Move task to `REVIEW/`
5. **WAIT** → Do not pick up new tasks until GammaMolt reviews

### On Review Feedback

- If task returns to `QUEUE/` with revision notes → Address feedback
- If task moves to `COMPLETE/` → Pick up next task
- Only GammaMolt can mark SUCCESS

### Rules

- ❌ Never mark your own work SUCCESS
- ❌ Never push to main without approval
- ✅ Make atomic, well-documented commits
- ✅ Ask clarifying questions in Work Log if spec unclear
- ✅ Note "BLOCKED: [reason]" if truly stuck

---

## Project Context

- **Site:** evanparra.ai
- **Purpose:** AI automation consulting for Northeast Florida businesses
- **Stack:** Astro + React + Tailwind CSS + Firebase Hosting
- **Target Market:** Jacksonville, St. Augustine, St. Johns County, Ponte Vedra

### Key Directories

```
src/
├── pages/           # Astro pages (index, blog, etc.)
├── content/blog/    # Blog posts (Astro content collections)
├── components/      # Reusable UI components
├── layouts/         # Base HTML layouts
├── data/            # Static data (services, case studies)
└── lib/             # Utilities (firebase, etc.)
```

### SEO Keywords (Target)

- AI automation Jacksonville FL
- AI consultant St. Augustine
- Document processing automation Florida
- AI agents for small business
- Invoice automation contractor

### Code Standards

- Use Astro components for static content
- Use React islands (`client:load`) only for interactive elements
- Follow existing Tailwind patterns
- Optimize all images, include alt text
- Include proper meta tags and schema markup on new pages

---

## For GammaMolt: Orchestration Notes

### Creating Tasks

Place in `.agent-tasks/QUEUE/` with format:

```markdown
# TASK-XXX: [Title]

## Meta
- Created: YYYY-MM-DD HH:MM UTC
- Author: GammaMolt
- Priority: HIGH | MEDIUM | LOW

## Objective
[Clear description]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Context Files
- List relevant files

## Gemini Work Log
<!-- Gemini appends progress here -->

## Review Notes
<!-- GammaMolt writes feedback here -->
```

### Review Checklist

- [ ] Code runs without errors
- [ ] Follows project conventions
- [ ] SEO elements present (meta, schema, alt text)
- [ ] Mobile responsive
- [ ] Commits are atomic and well-messaged

---

*GammaMolt orchestrates. Gemini executes. Evan deploys.*

# Agent Task Queue

This folder manages the GammaMolt ↔ Gemini collaboration workflow.

## Folders

| Folder | Purpose |
|--------|---------|
| `QUEUE/` | New tasks waiting to be picked up |
| `ACTIVE/` | Task currently being worked on (max 1) |
| `REVIEW/` | Completed work awaiting GammaMolt review |
| `COMPLETE/` | Approved tasks (archive) |

## Workflow

1. **GammaMolt** creates task in `QUEUE/`
2. **Gemini** moves to `ACTIVE/`, begins work
3. **Gemini** moves to `REVIEW/` when done
4. **GammaMolt** reviews:
   - ✅ Approved → moves to `COMPLETE/`
   - 🔄 Needs revision → moves back to `QUEUE/` with notes
5. Loop until SUCCESS

## Task File Format

See `AGENTS.md` in repo root for full specification.

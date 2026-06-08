
# Agent Guidelines for GitHub Issues

When tasked with creating, editing, or managing GitHub Issues, you MUST follow these rules:

1. **USE THE CLI (gh)**: Do NOT use the Draft UI on GitHub.com to draft issues for manual creation. You must use the GitHub CLI (gh issue create, gh issue edit) directly. This immediately provides the true Issue ID/URL back to you in the terminal.
2. **EPIC WORKFLOW**:
   - Create the child/sub-issues FIRST using gh issue create.
   - Capture the newly generated Issue IDs (e.g., #45, #46).
   - Create the Parent Epic AFTER the children, and immediately inject those exact IDs into the Epic's Task List.
   - This entirely eliminates the manual loop of drafting, creating, and editing to fix broken links.
3. **RELATIONSHIPS**: 
   - Always use strict relationship keywords followed by the exact ID or URL: Blocked by #123, Depends on #123, Relates to #123. 
   - Never use plain text descriptions for relationships. Find the correct Issue ID first.

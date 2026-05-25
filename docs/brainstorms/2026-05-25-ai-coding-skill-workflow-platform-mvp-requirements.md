---
date: 2026-05-25
topic: ai-coding-skill-workflow-platform-mvp
---

# AI Coding Skill Workflow Platform MVP

## Summary

This MVP proposes a personal AI Coding Skill workflow platform centered on searchable Skill cards. The product starts from a free-form task or problem input, helps the user narrow to relevant Skills through scenario-aware results, and provides complete Skill detail and lightweight history so Skills become reusable workflow assets instead of scattered reference material.

---

## Problem Frame

Today, the user finds Skills by going back into existing projects and manually reading through large amounts of content to locate something reusable. The problem is not only that Skills live in different places, but that the user must repeatedly scan too much information before they can tell which Skill is relevant, how to use it, and whether it worked before.

This makes common AI Coding tasks slower and more tiring than they should be. Even when a good Skill already exists, it is easy to fall back to copy-paste behavior because the retrieval and judgment cost is too high, and the usage history is too weak to support confident reuse.

---

## Actors

- A1. AI Coding developer: The primary user who searches, reviews, reuses, and maintains Skill cards during development work.
- A2. AI agent collaborator: A secondary consumer of the same Skill information model in future phases; not a primary workflow driver in MVP.

---

## Key Flows

- F1. Find a Skill from a current problem
  - **Trigger:** The user arrives with a task, blocker, or question in natural language.
  - **Actors:** A1
  - **Steps:** The user enters a keyword, problem statement, or task description on the homepage; the system returns matching Skill cards; the user scans the cards and opens one detail page.
  - **Outcome:** The user reaches a Skill detail page that appears relevant to the current task within a short decision window.
  - **Covered by:** R1, R2, R3, R4, R10

- F2. Narrow by scenario when the query is vague
  - **Trigger:** The user prefers to start from a known AI Coding scenario or needs help narrowing a broad problem.
  - **Actors:** A1
  - **Steps:** The user selects a common scenario entry; the system shows Skills associated with that scenario; the user further judges options using card metadata.
  - **Outcome:** The user reduces search scope without needing to know exact Skill names in advance.
  - **Covered by:** R1, R2, R3, R10

- F3. Consume and reuse a Skill
  - **Trigger:** The user opens a Skill detail page from search results.
  - **Actors:** A1
  - **Steps:** The user reads the Skill's purpose, applicable scenarios, trigger conditions, input requirements, usage method, source path, and recent history; the user decides whether to reuse the Skill in the current task.
  - **Outcome:** The user can quickly understand whether the Skill fits and how to apply it.
  - **Covered by:** R4, R5, R6, R7

- F4. Add or update a Skill card manually
  - **Trigger:** The user wants to capture a new Skill or maintain an existing one.
  - **Actors:** A1
  - **Steps:** The user opens a create or edit form, fills in the required card fields, optionally appends a short history note, and saves the card.
  - **Outcome:** The Skill becomes part of the searchable library with a stable, reusable structure.
  - **Covered by:** R8, R9, R11

---

## Requirements

**Search and entry**
- R1. The homepage must provide a prominent free-form input as the primary entry for describing a current task, blocker, or question in natural language.
- R2. The homepage must also provide a secondary set of common AI Coding scenario entry points so the user can narrow from scenario when they do not want to start from free text.
- R3. Submitting a free-form query or selecting a scenario must take the user to a results view showing the matching Skill cards.

**Results and decision support**
- R4. The results view must present Skill cards that help the user judge relevance before opening details.
- R5. Each Skill card in results must include, at minimum, Skill name, one-line purpose, applicable scenarios, trigger conditions or keywords, input requirements, and the most recent usage record summary.
- R6. The results view must support a single Skill belonging to multiple scenarios.
- R7. The results view must help the user understand why a Skill may be relevant to the current query or selected scenario through visible matching context such as scenario overlap, trigger overlap, or keyword overlap.

**Skill detail and history**
- R8. The Skill detail page must show the full Skill information model for a single card, including what problem it solves, when to use it, applicable scenarios, trigger conditions, required inputs, usage method, expected output, and source link or path.
- R9. The Skill detail page must include lightweight history records showing how the Skill was used, modified, or validated over time.

**Manual maintenance**
- R10. The MVP must support manually creating and editing Skill cards through a form-based workflow.
- R11. Creating or editing a Skill card must require, at minimum, Skill name, one-line purpose, applicable scenarios, trigger conditions or keywords, input requirements, usage method, and source link or path.
- R12. History records may be entered manually as simple text entries instead of a structured audit system.

**MVP boundaries**
- R13. The MVP must focus on search, understanding, reuse, and lightweight accumulation of Skills rather than online execution or automation.
- R14. The MVP must be usable by a single person without requiring collaboration, permissions management, or team workflow setup.

---

## Acceptance Examples

- AE1. **Covers R1, R3, R4, R5, R7.** Given a user enters `qiankun 子应用白屏` on the homepage, when results load, the user sees Skill cards with enough visible context to judge which ones are relevant before opening details.
- AE2. **Covers R2, R3, R6.** Given a user starts from a scenario entry such as front-end bug investigation, when the results page opens, the user sees all Skills associated with that scenario, including Skills that also belong to other scenarios.
- AE3. **Covers R8, R9.** Given a user opens a Skill detail page, when the page renders, the user can read the Skill's purpose, usage conditions, required inputs, expected output, source reference, and at least one recent history note.
- AE4. **Covers R10, R11, R12.** Given a user creates a new Skill card manually, when required fields are completed and the card is saved, the Skill becomes available in the searchable library and the user may append a simple text history note.

---

## Success Criteria

- The user can usually reach a likely relevant Skill within 30 seconds from entering a task or problem.
- In common tasks, at least one of the top three result cards appears relevant enough to open.
- Skill cards are reused across multiple AI Coding tasks instead of being rediscovered from raw project documents each time.
- Newly added Skill cards are discoverable and reused in later tasks.
- Most actively used Skill cards accumulate short, readable history notes that help future reuse.
- A downstream planner or implementer can build the MVP without inventing the main pages, core flows, card fields, or product boundaries.

---

## Scope Boundaries

### Deferred for later

- Automatic import or parsing of Skills from repositories, documents, or chat history
- AI agent auto-recommendation or automatic Skill invocation
- More structured analytics, scoring, or recommendation logic beyond basic relevance presentation
- Richer history systems such as diff tracking, approval workflows, or validation states

### Outside this product's identity

- A generic knowledge base for all development information
- A team collaboration and permissions platform
- A platform whose primary value is executing Skills online instead of helping people find, understand, and reuse them

---

## Key Decisions

- Search-first homepage: The product starts from a free-form task or problem because that matches the user's real retrieval behavior better than category-first navigation.
- Scenario-assisted narrowing: Scenario entry remains important, but as a secondary narrowing aid rather than the primary entry point.
- Standardized Skill cards over raw documents: The MVP treats normalized Skill cards as the core product unit so retrieval and judgment happen before opening source material.
- Manual maintenance over automation: The MVP chooses a low-ceremony form-based workflow to validate the product's core value before adding import or parsing complexity.
- Lightweight history over heavy tracking: Simple text history is enough for MVP because the main need is reuse confidence, not a full audit system.

---

## Dependencies / Assumptions

- The initial value of the MVP depends on the user being willing to manually normalize a meaningful set of existing Skills into cards.
- Search relevance in MVP is assumed to be good enough when driven by card metadata such as scenarios, keywords, and trigger conditions.
- The product assumes a relatively small initial Skill library where manual curation is affordable.
- The product assumes the current repo will serve as the first implementation surface for a personal single-user web app.

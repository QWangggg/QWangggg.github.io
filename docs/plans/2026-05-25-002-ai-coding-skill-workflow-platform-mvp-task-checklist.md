---
title: AI Coding Skill Workflow Platform MVP Task Checklist
type: feat
status: active
date: 2026-05-25
origin: docs/plans/2026-05-25-001-feat-ai-coding-skill-workflow-platform-mvp-plan.md
---

# AI Coding Skill Workflow Platform MVP Task Checklist

## Use

This checklist is the execution-facing breakdown of the implementation plan. It is ordered for delivery, keeps the main loop closed first, and avoids backend, permissions, auto-import, or auto-recommendation work.

Main chain to protect at every step:

`Search / scenario entry -> results judgment -> detail reuse -> manual maintenance`

---

## Task 1. Replace the stale route map with the MVP shell

**Goal**

Replace the current broken blog-oriented routing with a minimal app shell and four MVP views: home, results, skill detail, and manage.

**Files**

- `.umirc.ts`
- `src/layouts/index.tsx`
- `src/pages/index.tsx`
- `src/pages/results/index.tsx`
- `src/pages/skills/[id].tsx`
- `src/pages/manage/index.tsx`

**Acceptance**

- App boots without pointing to missing blog pages.
- `/`, `/results`, `/skills/:id`, and `/manage` are all reachable.
- A shared shell exists across the four views.
- Unknown routes do not produce a blank or broken page.

---

## Task 2. Define the Skill card data model

**Goal**

Create one stable TypeScript model for Skills, scenarios, and history so all later pages read the same shape.

**Files**

- `src/features/skills/types.ts`
- `src/features/skills/selectors.ts`

**Acceptance**

- A single `Skill` domain shape exists and includes:
  - name
  - one-line purpose
  - applicable scenarios
  - trigger conditions or keywords
  - input requirements
  - usage method
  - expected output
  - source link or path
  - history entries
- Multi-scenario Skills are supported in the model.
- Page code does not invent separate ad hoc Skill shapes.

---

## Task 3. Add seed data for realistic MVP flows

**Goal**

Provide enough sample Skills to exercise search, scenario entry, results comparison, detail reading, and history display from first run.

**Files**

- `src/features/skills/data.ts`

**Acceptance**

- App has a usable seed dataset on first load.
- Seed data includes multiple scenarios and at least some overlapping keywords.
- At least one Skill has multiple history entries.
- At least one Skill belongs to multiple scenarios.

---

## Task 4. Add local persistence for Skill create/edit

**Goal**

Support real browser-side Skill persistence so manual maintenance is not demo-only.

**Files**

- `src/features/skills/storage.ts`
- `src/features/skills/selectors.ts`

**Acceptance**

- First run hydrates seed data when storage is empty.
- Edited or newly created Skills survive browser refresh.
- Invalid or missing storage payload falls back safely to seed data.
- Storage logic is isolated from page UI code.

---

## Task 5. Build the homepage primary entry

**Goal**

Implement the search-first homepage with a prominent free-form task/problem input.

**Files**

- `src/pages/index.tsx`
- `src/components/search-hero/index.tsx`

**Acceptance**

- Homepage leads with one clear free-form input.
- User can submit a natural-language task or blocker.
- Submission navigates to the results view with the query preserved.
- Homepage visually communicates this is a Skill workflow product, not the old blog.

---

## Task 6. Add secondary scenario entry on the homepage

**Goal**

Support scenario-first narrowing as a secondary path without competing with the main search input.

**Files**

- `src/pages/index.tsx`
- `src/components/scenario-entry/index.tsx`

**Acceptance**

- Homepage exposes common AI Coding scenario entries.
- Scenario entry is visually secondary to free-form search.
- Clicking a scenario navigates to the results view with that scenario applied.
- A user can start discovery without knowing an exact Skill name.

---

## Task 7. Implement client-side search and filtering

**Goal**

Turn query text and scenario selection into a deterministic results set suitable for MVP use.

**Files**

- `src/features/skills/search.ts`
- `src/utils/query.ts`
- `src/features/skills/selectors.ts`

**Acceptance**

- Free-form query returns filtered Skill results.
- Scenario selection returns filtered Skill results.
- Query + scenario can coexist without breaking filtering.
- Matching logic uses visible Skill metadata rather than hidden magic.

---

## Task 8. Build the results page and Skill judgment cards

**Goal**

Make the results page good enough for fast decision-making before opening detail.

**Files**

- `src/pages/results/index.tsx`
- `src/components/skill-card/index.tsx`

**Acceptance**

- Results page renders Skill cards from current query and/or scenario.
- Each card shows:
  - Skill name
  - one-line purpose
  - applicable scenarios
  - trigger conditions or keywords
  - input requirements
  - recent history summary
- Results page gives visible relevance clues such as query, scenario, or keyword overlap.
- Empty results state is recoverable and not just blank.

---

## Task 9. Wire results cards to the detail route

**Goal**

Connect list judgment to detail consumption cleanly.

**Files**

- `src/pages/results/index.tsx`
- `src/components/skill-card/index.tsx`
- `src/pages/skills/[id].tsx`

**Acceptance**

- Clicking a result card opens the correct Skill detail page.
- Invalid Skill ids do not crash the app.
- Navigation from results to detail preserves the sense of current task context.

---

## Task 10. Build the Skill detail page

**Goal**

Let the user fully understand a Skill and decide whether to reuse it without going back to raw project documents.

**Files**

- `src/pages/skills/[id].tsx`
- `src/components/skill-detail/index.tsx`
- `src/components/history-timeline/index.tsx`

**Acceptance**

- Detail page shows:
  - what problem the Skill solves
  - when to use it
  - applicable scenarios
  - trigger conditions
  - required inputs
  - usage method
  - expected output
  - source link or path
  - history entries
- Missing history does not break the page.
- Detail page has a clear path toward manual maintenance.

---

## Task 11. Build the manual manage page shell

**Goal**

Create a dedicated maintenance surface for adding and updating Skills without polluting the homepage main flow.

**Files**

- `src/pages/manage/index.tsx`
- `src/components/skill-form/index.tsx`

**Acceptance**

- Manage view is reachable from the app shell and/or detail page.
- Manage view clearly supports create and edit flows.
- Manage flow is secondary to discovery, not the primary landing experience.

---

## Task 12. Implement create Skill form with required fields

**Goal**

Support adding a new Skill card with the minimum required MVP fields.

**Files**

- `src/components/skill-form/index.tsx`
- `src/features/skills/storage.ts`

**Acceptance**

- User can create a Skill with the required fields only.
- Required-field validation prevents incomplete saves.
- Successful save makes the new Skill searchable immediately.
- Newly created Skills can include multiple scenarios.

---

## Task 13. Implement edit Skill flow and manual history append

**Goal**

Support maintaining existing Skills and adding lightweight history notes.

**Files**

- `src/pages/manage/index.tsx`
- `src/components/skill-form/index.tsx`
- `src/features/skills/storage.ts`

**Acceptance**

- Existing Skills can be loaded into the form and updated.
- A simple text history note can be appended during edit.
- After save, changes are visible in results and detail views.
- Browser refresh does not discard the changes.

---

## Task 14. Close the main loop end to end

**Goal**

Verify the primary MVP workflow works as one continuous experience instead of disconnected screens.

**Files**

- `src/pages/index.tsx`
- `src/pages/results/index.tsx`
- `src/pages/skills/[id].tsx`
- `src/pages/manage/index.tsx`
- `src/layouts/index.tsx`

**Acceptance**

- A user can:
  - start from free-form search or scenario entry
  - judge results
  - open a Skill detail page
  - edit or create a Skill
  - return and see the updated data reflected in discovery
- The loop works with seeded data and persisted data.
- No step in the main chain requires backend, permissions, or automation features.

---

## Task 15. Add focused verification coverage for the MVP chain

**Goal**

Add small but meaningful tests around the main behavior so AI Coding iterations can move safely.

**Files**

- `src/pages/__tests__/routing-shell.test.tsx`
- `src/features/skills/__tests__/storage.test.ts`
- `src/features/skills/__tests__/search.test.ts`
- `src/pages/__tests__/search-flow.test.tsx`
- `src/pages/__tests__/skill-detail.test.tsx`
- `src/pages/__tests__/manage-skill.test.tsx`
- `src/pages/__tests__/mvp-smoke.test.tsx`

**Acceptance**

- Route shell behavior is covered.
- Local persistence behavior is covered.
- Search and scenario filtering behavior is covered.
- Skill detail rendering behavior is covered.
- Create/edit flow behavior is covered.
- At least one smoke test covers the full main chain.

---

## Task 16. Final MVP cleanup for first usable version

**Goal**

Make the app coherent enough to actually use as a first personal MVP.

**Files**

- `README.md`
- `src/layouts/index.tsx`
- `src/pages/index.tsx`
- `src/pages/results/index.tsx`
- `src/pages/skills/[id].tsx`
- `src/pages/manage/index.tsx`

**Acceptance**

- README no longer describes the project as a blog.
- Empty states, first-run state, and missing-id state feel intentional.
- Desktop and mobile widths both preserve the main discovery and maintenance flow.
- The shipped scope still excludes backend, permissions, auto-import, and auto-recommendation.


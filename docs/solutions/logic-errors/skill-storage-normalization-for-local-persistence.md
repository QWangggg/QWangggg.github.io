---
title: Normalize persisted Skill records before the UI consumes local storage data
date: 2026-05-26
category: docs/solutions/logic-errors
module: skill storage
problem_type: logic_error
component: tooling
symptoms:
  - "Persisted Skill records could contain missing or wrongly typed fields such as `history`, `triggerKeywords`, or `inputRequirements`"
  - "Results, detail, and manage pages assume array-shaped fields and can break or render unsafe state when local storage data is malformed"
  - "A single stale or partially corrupted browser payload could poison the whole single-user workflow"
root_cause: logic_error
resolution_type: code_fix
severity: medium
tags: [localstorage, skill-storage, normalization, mvp, defensive-data-loading]
---

# Normalize persisted Skill records before the UI consumes local storage data

## Problem

The MVP stores Skill cards in browser `localStorage`, but the UI reads those records as if every field already matches the latest TypeScript shape. That assumption breaks as soon as a persisted payload is stale, partially corrupted, or created before the current field contract existed.

## Symptoms

- A stored Skill could have non-array values where the UI expects arrays
- History entries could be present but structurally incomplete
- Page code in the results, detail, or manage flow could dereference fields like `history`, `triggerConditions`, or `inputRequirements` and crash or render misleading state
- Seeded data looked correct, so the problem stayed hidden until browser persistence was part of the workflow

## What Didn't Work

- Relying on TypeScript alone did not protect runtime data loaded from `localStorage`
- Only checking `Array.isArray(parsed)` at the top level was too weak; the outer payload could be an array while individual Skill records were still malformed
- Treating malformed storage as a purely page-level bug would have duplicated defensive logic across results, detail, and manage views

## Solution

Normalize persisted Skill records at the storage boundary before any page consumes them.

Key implementation changes in `src/features/skills/storage.ts`:

```ts
function safeString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function safeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => safeString(item))
    .filter(Boolean);
}
```

Then normalize both history entries and full Skill records before returning them from `loadSkills()`:

```ts
function normalizeSkill(value: unknown, fallbackSkill: Skill): Skill | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const item = value as Partial<Skill>;
  const id = safeString(item.id);
  const name = safeString(item.name);

  if (!id || !name) {
    return null;
  }

  return {
    id,
    slug: safeString(item.slug) || toSlug(name),
    name,
    applicableScenarios: safeStringArray(item.applicableScenarios),
    triggerKeywords: safeStringArray(item.triggerKeywords),
    inputRequirements: safeStringArray(item.inputRequirements),
    history,
    updatedAt: safeString(item.updatedAt) || fallbackSkill.updatedAt,
    ...
  };
}
```

Finally, persist the normalized payload back through the same storage layer so later reads see the repaired shape.

The coverage added in `src/features/skills/__tests__/storage.test.ts` proved two core cases:

- malformed-but-recoverable records are normalized into safe shapes
- completely unusable records fall back to seeded Skills

## Why This Works

The bug was caused by trusting browser persistence as if it were compile-time-safe application state. By moving normalization into the storage layer, every consumer gets the same repaired data contract and the UI no longer needs to defensively guess whether a field is present or correctly typed.

This is especially important in a single-user MVP with no backend schema enforcement. The storage boundary is the only reliable place to absorb drift between old payloads and the current app model.

## Prevention

- Treat `localStorage` as untrusted runtime input, not as already-validated application state
- Normalize persisted objects at the read boundary before passing them into selectors or pages
- Add tests for both recoverable malformed payloads and unrecoverable payloads
- Prefer one central storage repair path over scattering optional chaining and fallback arrays through page components
- When the Skill model evolves, extend normalization first so old browser data does not silently break the app

## Related Issues

- [Umi test runner failed because Babel core was older than a transitive syntax plugin](../test-failures/umi-test-babel-core-version-mismatch.md)

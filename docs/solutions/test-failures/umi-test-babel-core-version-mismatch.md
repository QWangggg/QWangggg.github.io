---
title: Umi test runner failed because Babel core was older than a transitive syntax plugin
date: 2026-05-26
category: docs/solutions/test-failures
module: frontend test toolchain
problem_type: test_failure
component: testing_framework
symptoms:
  - "Running `npm.cmd test -- --runInBand` failed before any test executed"
  - "Jest reported `@babel/plugin-syntax-import-attributes` required Babel `^7.22.0`, but `@babel/core` was `7.18.6`"
  - "New page-level tests looked broken even though the real failure was in the shared test toolchain"
root_cause: incomplete_setup
resolution_type: dependency_update
severity: medium
tags: [umi, umi-test, babel, jest, test-runner, dependency-version]
---

# Umi test runner failed because Babel core was older than a transitive syntax plugin

## Problem

After adding MVP tests to this Umi 3 project, the test runner failed before executing any assertions. The failure looked like a test-code problem at first, but the actual breakage lived in the shared Babel toolchain used by `umi-test`.

## Symptoms

- `npm.cmd test -- --runInBand` exited immediately with a Babel version assertion error
- The stack trace pointed at `@babel/plugin-syntax-import-attributes`
- The installed `@umijs/test` package was still resolving `@babel/core@7.18.6`
- Multiple test files failed in the same way, regardless of their actual content

## What Didn't Work

- Re-running the test command without changing dependencies did not help because the failure happened before test execution
- Treating the issue as a page-test bug was misleading; the same Babel error appeared across unrelated test files (session history)
- Adding more test code would not have changed the outcome because the loader stack itself was incompatible

## Solution

Pin a compatible Babel core version in `devDependencies`, reinstall packages, and then re-run the test suite.

`package.json`:

```json
{
  "devDependencies": {
    "@babel/core": "^7.28.5",
    "@umijs/test": "^3.5.43"
  }
}
```

Then refresh dependencies:

```bash
npm.cmd install
```

After the Babel mismatch was fixed, the remaining test issues could be handled normally:

- replace an unnecessary `react-test-renderer` dependency with `react-dom/server`
- add an explicit `import React from 'react'` in JSX files that still need classic-transform compatibility in the Jest environment

## Why This Works

`umi-test` in this project pulled in an older `@babel/core`, while one of its transitive syntax plugins required a newer Babel major-minor range. That mismatch caused Babel to abort before Jest could execute any tests. Pinning `@babel/core` to a compatible version aligned the toolchain and let the test runner initialize correctly.

The follow-up test fixes worked only after that shared toolchain issue was resolved. In other words, the page tests were not the root cause; the Babel dependency graph was.

## Prevention

- When a Jest/Umi failure happens before any assertion runs, inspect the shared toolchain versions before debugging individual test files
- Use `npm.cmd ls @babel/core @babel/plugin-syntax-import-attributes` (or the equivalent dependency tree command) to confirm version alignment quickly
- Prefer low-dependency test utilities when possible; here, `react-dom/server` avoided introducing another package just to smoke-test layout rendering
- Keep one small test that proves the runner itself is healthy after dependency changes, not just feature-specific tests

## Related Issues

- No existing `docs/solutions/` entries were present in this repo when this was documented

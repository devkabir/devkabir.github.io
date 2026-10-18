---
title: WPMU DEV — Vue 2 to Vue 3 Migration
date: '2024-04-01'
summary: Migrated 60K+ lines of plugin code to Vue 3 Composition API.
problem: Legacy Vue 2 codebases in complex WordPress plugins reached end-of-life, creating technical debt, maintenance bottlenecks, and build tooling incompatibilities.
status: Live
thumb: /images/projects/vue-migration-full.avif
featured: true
tech:
  - Vue 3
  - Vue 2
  - TypeScript
  - JavaScript
  - WordPress
  - Vite
---

### Opening

At WPMU DEV, I migrated 60K+ lines of code to Vue 3 Composition API while working on WordPress plugins including Defender and Beehive.

### Migration Scope

- Upgraded frontend architecture from Vue 2 Options API to Vue 3 Composition API.
- Modernized build tooling and dependencies across 60K+ lines of code in Defender and Beehive.

### My Responsibilities

- **My contribution**: Directly refactored legacy components into modular Vue 3 composables, resolved build toolchain incompatibilities, and ensured backward compatibility with WordPress admin interfaces.
- **Team and product context**: The team coordinated release sequencing, end-to-end regression testing, and production deployment across products serving tens of thousands of active WordPress sites.

### Technical Decisions

- **Decision 1**: Incremental component migration.
  - **Constraint**: Plugins had to remain fully operational during development cycles without blocking scheduled bug fixes.
  - **Options**: Complete ground-up rewrite vs. phased component-by-component migration.
  - **Decision**: Phased migration using Vue 3 Composition API compatibility wrappers.
  - **Trade-off**: Temporary dual-pattern overhead in transitional branches.
  - **Outcome**: Maintained unbroken delivery cadence with zero production regressions.

### Architecture

```
[Browser UI: Vue 3 Components] <---> [WordPress REST API / Admin AJAX] <---> [WordPress Core & Plugin Backend (PHP)] <---> [MySQL Database]
```

*Caption: Components involved in Vue 3 component migration.*

### Validation and Releases

- Ran automated unit testing, static analysis, and cross-browser regression suites.
- Shipped through incremental release tags and staged deployments.

### Verified Engineering Metrics

| Metric | Scope | Before | After | Measurement method |
| --- | --- | --- | --- | --- |
| Code Modernization | Plugin UI codebase | Vue 2 (Options API) | Vue 3 (Composition API) | LOC count & git blame |
| Code Volume | Frontend modules | 60K+ LOC | 60K+ LOC migrated | Repository audit |

*Note: No before-and-after performance measurements are available.*

### Results

Migrated 60K+ lines of code to Vue 3 Composition API.

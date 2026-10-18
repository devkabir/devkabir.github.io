---
title: Defender — WordPress Security Plugin
date: '2024-03-01'
summary: Security hardening, Vue 3 component migration, and reviewed releases at WPMU DEV.
problem: WordPress sites need protection against brute force attacks, unauthorized logins, vulnerability exploits, and file tampering, without losing administrative usability or performance.
status: Maintained
thumb: /images/projects/defender-full.avif
featured: true
tech:
  - PHP
  - WordPress
  - Vue 3
  - REST API
demo: https://wordpress.org/plugins/defender-security/
---

### Problem

WordPress sites need protection against brute force attacks, unauthorized logins, vulnerability exploits, and file tampering, without losing administrative usability or performance.

### My Role

I contribute to Defender at WPMU DEV, working on security hardening, Vue 3 components, and incremental releases through peer review and CI/CD.

### Team and Product Context

The team handles shared product releases, infrastructure, and distributed code review. The product serves tens of thousands of active WordPress sites.

### One Shipped Change

- Adhered to WPMU DEV publication rules and code standards.
- Shipped incremental updates, security hardening, and UI changes through a CI/CD pipeline with peer code reviews.
- Migrated legacy UI components to Vue 3 Composition API.

### Architecture

```
[Admin Browser UI (Vue 3 / Options)] <---> [Defender REST API & Security Hooks] <---> [WordPress Core Security Filters] <---> [MySQL Audit Logs & Config]
```

*Caption: Components involved in Defender security hardening and component migration.*

### Validation

Automated test suites, static analysis, and peer code review prior to merge and release staging.

### Verified Engineering Metrics

| Metric | Scope | Before | After | Measurement method |
| --- | --- | --- | --- | --- |
| Component Migration | Defender Admin UI | Legacy components | Vue 3 Composition API | Code review & tests |
| Active Sites Reached | Production deployments | Tens of thousands | Tens of thousands | WordPress.org statistics |

*Note: No before-and-after performance measurements are available.*

### Result

Contributed to a security plugin serving tens of thousands of active WordPress sites.

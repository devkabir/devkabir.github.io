---
name: read-file-review
description: Review a single file for correctness bugs by reading only that one file — no codebase search, no builds, no tests, no edits. Use this skill whenever the user asks to "review this file", "check this file", "look at <path>", "any bugs in this file?", or pastes/points at one absolute path and wants an opinion on it. Also use it when the user has already told you which file they mean (in this message or earlier in the conversation, including a file they opened in the editor) and just says "review it" — the point is to read that exact path and stop, instead of exploring the repo. Strongly prefer this over broader review workflows when the user scopes the request to one file.
---

# Single-file correctness review

The user has a specific file in mind and wants to know whether it is _correct_. They do not want a repo tour. Every extra grep, build, or test run costs them time and attention they explicitly did not spend, so the discipline here is: read the one file, think hard about it, report what's actually wrong.

## Resolve the path first

1. If the user gave an absolute path in this message, use it verbatim. Do not search for it, do not glob for a "better" match, do not verify it exists by listing the directory — just read it.
2. If they gave no path, look back through the conversation: an earlier message, a path you already read, or the file the user has open in their editor (the harness reports this). If exactly one candidate is there, that's the file.
3. If there is no candidate, or two or more plausible ones, ask for the path in one short line and stop. Guessing wastes a whole turn when the answer takes the user three seconds.

Read the file once, in full. If it's large, read it in parts rather than sampling — a correctness review on a partially-read file produces confident nonsense about code you didn't see.

## Stay inside the file

The scope boundary is the point of this skill, not a limitation to work around. While reviewing, do not:

- grep or glob the codebase, read imports' source, or open sibling files
- run builds, type checks, linters, tests, or the app
- edit anything, including "obvious" one-line fixes
- spawn subagents

That means some things are genuinely unknowable from here — whether an imported helper really returns what the call site assumes, whether a prop is always passed. That's fine. Say so as an assumption rather than opening another file: "assuming `formatDate` returns a string, line 42 is fine; if it can return null the template throws." The user can open the other file faster than you can, and they know the answer already. If a finding's severity hinges entirely on something outside the file, say which file would settle it.

If the user later asks you to verify or fix something, that's a new instruction — follow it then. Don't pre-empt it.

## What counts as a finding

Report **correctness** problems: things that produce a wrong result, crash, hang, or silently corrupt state.

- null/undefined dereferences and missing guards
- off-by-one, wrong comparison or boolean operator, inverted condition
- async bugs: unawaited promises, races, unhandled rejections, state read before it settles
- wrong or missing cleanup (listeners, timers, subscriptions, aborts)
- reactivity bugs in framework code: state mutated in a way the framework won't observe, effects with wrong dependencies, derived values that go stale
- resource and error handling: swallowed errors, unclosed handles, unchecked return values
- logic that contradicts what the surrounding code or comments clearly intend

Do not report style, naming, formatting, architecture opinions, or "you could also add X" features. The user asked about bugs. If the file looks correct, saying so plainly is the right answer and a valuable one — don't manufacture findings to seem thorough. Resist the pull to pad: one real bug beats five speculative ones, and a reviewer who cries wolf gets ignored.

Before reporting anything, test it against the actual code: construct the concrete input or sequence of events that makes it go wrong. If you can't, you have a suspicion, not a finding — either drop it or label it clearly as unverified with what you'd need to confirm it.

## Report format

Reply in chat as bullets, most severe first. No files written, no preamble, no closing summary.

```
- `path/to/file.ext:LINE` — <what's wrong>. <when it breaks / what happens>.
```

Keep each bullet to one or two sentences. Put the severity ordering to work: the thing that crashes in production goes first.

**Example — findings:**

```
- `src/routes/+page.svelte:52` — `data.user.name` is read without checking `data.user`; renders blank for signed-out visitors and throws when `data.user` is undefined after a failed load.
- `src/routes/+page.svelte:88` — the `setInterval` in `onMount` is never cleared, so navigating away leaves a timer updating a destroyed component.
- `src/routes/+page.svelte:31` — `items.length > 0 ? items[1] : null` skips index 0; a single-item list reads as empty.
```

**Example — nothing wrong:**

```
No correctness bugs found in `src/lib/utils/slug.ts`. Two things I couldn't check from this file alone: `normalize()` is imported from `./text` (line 3), so the assumption that it never returns an empty string is unverified, and the regex at line 14 assumes input is already trimmed by the caller.
```

That second example is the shape to aim for when the file is clean: a clear verdict, plus the assumptions the single-file scope forced you to make, so the user knows exactly what was and wasn't covered.

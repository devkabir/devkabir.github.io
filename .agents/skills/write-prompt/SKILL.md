---
name: write-prompt
description: Write a short prompt to when the user asks to turn their request and current session context into a prompt.
---

# Write Prompt

Generate a concise, ready-to-use prompt for the user based on their request and the current session context. Write it to `./prompt.txt` without any additional commentary or explanation.

- Include all snippets of code, context, and relevant information that will help the user understand the request and its requirements.
- Do not add any extra text, formatting, or instructions beyond what is necessary for the prompt or will make confuse ai.
- Do not suggest or include any additional information that will impact ai's ability to respond accurately to the request.
- Append this rules at end of the prompt.txt file:

```markdown
Strict exploration restriction:

- Do not read, search, list, trace, or inspect anything outside the scope
  above, including unrelated repository files, neighboring projects,
  dependencies, environment settings, or external documentation.
- Keep searches limited to the named tests and directly relevant request
  parsing, payload-size enforcement, route/middleware wiring, and test setup.
  Do not perform repository-wide discovery.
- References, imports, and paths found in an authorized file do not
  authorize following them outside this scope.
- If completion requires expanding the scope, stop that part of the work
  and ask for explicit permission, naming the exact file or resource and why
  it is needed. Do not explore it before permission is given.
```

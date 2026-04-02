# Contributing to JS Lab

Thanks for helping improve JS Lab. This project is intended to be easy to pick up, safe to change, and welcoming to new contributors.

## Local setup

1. Install dependencies with `npm install`.
2. Start the app with `npm start`.
3. Run checks before opening a pull request:
   - `npm run lint`
   - `npm run format:check`
   - `npm run build`

## Suggested workflow

1. Pick or open an issue.
2. Keep changes focused to one topic.
3. Update docs if you change behavior.
4. Add or adjust tests where practical.
5. Open a pull request with a clear summary and screenshots for UI changes.

## Style guide

- Prefer small, readable components.
- Use existing folder conventions under `src/`.
- Keep user-facing text clear and concise.
- Avoid introducing new dependencies unless they solve a real problem.

## Project structure

- `src/components/` - reusable UI pieces
- `src/data/` - curriculum and content data
- `src/utils/` - shared helpers
- `public/` - static files and HTML template

If you are unsure about a change, open a discussion before making a large refactor.

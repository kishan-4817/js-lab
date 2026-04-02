# JS Lab

JS Lab is an interactive JavaScript learning environment built with React. It is designed to feel more like a hands-on practice space than a textbook.

## What it includes

- Live code editor and output area
- Memory and execution visualizations
- Guided lessons with XP tracking
- Async, DOM, and project-based exercises
- Progress saved in `localStorage`

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm start
```

The app opens at `http://localhost:3000`.

## Available scripts

- `npm start` - run the development server
- `npm run build` - create a production build
- `npm test` - run the test runner
- `npm run lint` - lint source files
- `npm run format` - format the repository
- `npm run format:check` - verify formatting

## Project structure

```text
public/
src/
  components/
  data/
  utils/
```

### Source layout

- `src/components/` contains reusable UI pieces
- `src/data/` contains the curriculum content
- `src/utils/` contains shared helper logic

## Contributing

We welcome contributions. Before opening a pull request, please read:

- [Contributing guide](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)

If you are adding a feature, please try to keep the change focused and include a short explanation of the user impact.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

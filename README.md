# Dev Yantra

Dev Yantra is a growing collection of fast, simple, browser-based developer utilities — no sign-up, no backend, just tools that do exactly what they say.

**Live site:** _add your Vercel URL here after deploying_

## Available tools

- **CSS Box Shadow Generator** — build and preview CSS `box-shadow` values with live controls for offset, blur, spread, color, opacity, and inset, then copy the generated CSS.

More utilities (JSON tools, HTML tools, regex tools, converters, formatters, and more) are planned and will be added incrementally.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for testing
- [pnpm](https://pnpm.io/) as the package manager
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Clone the repo and install dependencies:

\`\`\`bash
git clone https://github.com/tsairaj02/dev-yantra.git
cd dev-yantra
pnpm install
\`\`\`

Run the development server:

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build locally |
| `pnpm test` | Run the test suite |
| `pnpm lint` | Run ESLint |

## Project structure

\`\`\`
src/
  app/              # Routes (App Router)
    tools/          # Individual utility pages
  components/
    layout/         # Header, footer, shared layout pieces
    tools/          # UI for each utility
  lib/
    tools/          # Pure logic for each utility (framework-agnostic)
\`\`\`

## License

MIT
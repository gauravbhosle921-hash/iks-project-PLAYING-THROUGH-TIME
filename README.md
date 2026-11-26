# Playing Through Time — Liquid Heritage Edition

A premium dark-glass redesign of the original research website. The original research text, 200 quiz questions and scoring, four research PDFs, images, source links, shared comments, and game-only AI search are retained.

## Open on a Mac

1. Double-click the ZIP to extract it.
2. Open `Playing_Through_Time_Premium`.
3. Double-click `index.html` to explore the research, galleries, quizzes, and PDFs.
4. The shared comment board and AI search use Netlify Functions, so those features require the hosted deployment.

## Deploy to Netlify

The project includes the existing `netlify.toml`, Netlify Functions, and the Netlify Blobs comment store. Deploy through the Git-connected Netlify site so the server functions are included. Set `OPENAI_API_KEY` as a secret environment variable in Netlify's production context and redeploy. Never commit `.env.local` or put an API key in the webpage.

AI search is scoped to the four games and supplied research. OpenAI API use may incur charges. The existing local key is not included in this folder or ZIP.

## Contents

- `index.html`: original content and visitor interactions with the Liquid Heritage stylesheet and transition effects.
- `assets/`: original images plus the new local design assets.
- `sources/`: all four supplied research PDFs.
- `netlify/functions/`: persistent comments and research-grounded game search.
- `CREDITS.md`: image credits.

The ambient medallion is a lightweight CSS 3D-style animation. Blender was not installed in the workspace, so this edition does not include a Blender-authored `.blend` model.

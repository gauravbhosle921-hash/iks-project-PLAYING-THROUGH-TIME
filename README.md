# Playing Through Time — Liquid Heritage Edition

A premium dark-glass redesign of the original research website. The original research text, 200 quiz questions and scoring, four research PDFs, images, source links, shared comments, and a local keyword search across the research and quizzes are retained. The AI-powered question-and-answer search is labelled as coming soon and does not require an API key.

## Open on a Mac

1. Double-click the ZIP to extract it.
2. Open `Playing_Through_Time_Premium`.
3. Double-click `index.html` to explore the research, galleries, quizzes, and PDFs.
4. The shared comment board uses a Netlify Function and is available on the hosted deployment. Keyword search runs in the browser. AI-powered question-and-answer search is not enabled yet and is clearly marked as coming soon.

## Deploy to Netlify

The project includes the existing `netlify.toml`, Netlify Functions, and the Netlify Blobs comment store. Deploy through the Git-connected Netlify site so the server functions are included. No API key is included or required for the current keyword search and community comments. The AI question-and-answer feature is marked as coming soon.

## Contents

- `index.html`: original content and visitor interactions with the Liquid Heritage stylesheet and transition effects.
- `assets/`: original images plus the new local design assets.
- `sources/`: all four supplied research PDFs.
- `netlify/functions/`: persistent shared comments. AI question-and-answer search is not wired into the current interface.
- `CREDITS.md`: image credits.

The ambient medallion is a lightweight CSS 3D-style animation. Blender was not installed in the workspace, so this edition does not include a Blender-authored `.blend` model.

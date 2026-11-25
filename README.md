# Playing Through Time

An educational archive about Chaturanga and chess, Pachisi/Chausar and Ludo, Gilli-Danda and cricket, and Malla-Yuddha and wrestling. The original page content, 200 quiz questions, images, and four supplied research PDFs are included.

## Open the website on a Mac

1. Extract the ZIP by double-clicking it in Finder.
2. Open the extracted `Playing_Through_Time` folder.
3. Double-click `index.html`; choose Safari or Chrome if prompted.

The research pages, quizzes, local images, and source PDFs work offline. The shared comments and AI research search need the hosted Netlify version because they use server functions.

## Netlify features

- `netlify/functions/comments.mjs` saves and retrieves public comments using Netlify Blobs. Comment authors are told comments are public. The service stores comment text, optional display name, game topic, and posting time.
- `netlify/functions/game-search.mjs` searches excerpts prepared from the four bundled research PDFs and answers only questions naming one of the four game topics. The OpenAI key stays in a server environment variable; it is not included in the web page or repository.
- Search requests are sent to the OpenAI API. Do not submit private information. OpenAI API usage may incur charges.

## Deploy

Connect this GitHub repository to Netlify and deploy the `main` branch. The included `netlify.toml` configures the site root and function directory. In Netlify site settings, add `OPENAI_API_KEY` as a **secret environment variable** for the production deploy context, then trigger a redeploy. Never commit `.env.local` or paste the key into `index.html`.

Netlify Blobs is used for shared comments. A static drag-and-drop upload of only the site files will not deploy the server functions; use the Git-connected Netlify site or Netlify CLI deployment.

For local function development, install Node.js 20 or newer and run `npm install` followed by `npx netlify dev` in this folder. Set `OPENAI_API_KEY` in a local `.env` file for local AI search; keep it out of Git.

The four original reports are in `sources/`. Image attribution is in `CREDITS.md`.

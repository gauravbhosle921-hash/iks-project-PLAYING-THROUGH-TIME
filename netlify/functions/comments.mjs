import { getStore } from "@netlify/blobs";

const validGames = new Set(["chess", "pachisi", "cricket", "wrestling"]);
const recentSubmissions = new Map();
const store = () => getStore({ name: "playing-through-time-comments", consistency: "strong" });
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

export default async (request, context) => {
  if (request.method === "GET") {
    try {
      const db = store();
      const keys = [];
      for await (const page of db.list({ prefix: "comments/", paginate: true })) {
        keys.push(...page.blobs.map((blob) => blob.key));
      }
      const stored = await Promise.all(keys.map((key) => db.get(key, { type: "json", consistency: "strong" })));
      const comments = stored.map((entry) => entry?.data ?? entry).filter(Boolean)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json({ comments });
    } catch {
      return json({ error: "Comments are temporarily unavailable." }, 503);
    }
  }

  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const raw = await request.text();
    if (raw.length > 5000) return json({ error: "That comment is too long." }, 413);
    const body = JSON.parse(raw);
    if (typeof body.website === "string" && body.website.trim()) return json({ success: true });

    const game = typeof body.game === "string" ? body.game : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 40) : "";
    if (!validGames.has(game)) return json({ error: "Choose one of the four games." }, 400);
    if (message.length < 2 || message.length > 600) return json({ error: "Comments must be between 2 and 600 characters." }, 400);

    const ip = context.ip || request.headers.get("x-nf-client-connection-ip");
    if (ip) {
      const now = Date.now();
      const prior = recentSubmissions.get(ip) || 0;
      if (now - prior < 15000) return json({ error: "Please wait a few seconds before posting again." }, 429);
      recentSubmissions.set(ip, now);
      if (recentSubmissions.size > 1500) {
        for (const [key, time] of recentSubmissions) if (now - time > 60000) recentSubmissions.delete(key);
      }
    }

    const comment = {
      id: crypto.randomUUID(),
      game,
      name: name || "Guest",
      message,
      createdAt: new Date().toISOString(),
      status: "visible"
    };
    await store().setJSON(`comments/${comment.id}`, comment, { onlyIfNew: true });
    return json({ success: true, comment }, 201);
  } catch {
    return json({ error: "We could not save that comment. Please try again." }, 400);
  }
};

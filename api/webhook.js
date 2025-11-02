export const config = {
  api: {
    bodyParser: false, // 👈 importante: evita que Vercel procese el JSON antes
  },
};

export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Método no permitido" });

  try {
    // 🔥 leemos manualmente el cuerpo crudo
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks).toString();

    const webhookUrl = "https://n8n-n8n.bvil2a.easypanel.host/webhook/be7c4fcd-e1db-4d73-a634-0bc1df7028bd";

    const r = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rawBody, // 👈 enviamos exactamente lo que vino del form
    });

    const text = await r.text();

    res.status(200).json({
      success: true,
      n8nStatus: r.status,
      n8nResponse: text,
    });
  } catch (err) {
    console.error("Error enviando a n8n:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

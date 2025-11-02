export default async function handler(req, res) {
  // --- CORS (permite que el front en Vercel hable con n8n) ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Método no permitido" });
  }

  try {
    const webhookUrl = "https://n8n-n8n.bvil2a.easypanel.host/webhook/be7c4fcd-e1db-4d73-a634-0bc1df7028bd";

    // reenviamos el body del form al webhook de n8n
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    res.status(200).json({
      success: true,
      n8nStatus: response.status,
      n8nResponse: text,
    });
  } catch (error) {
    console.error("Error enviando a n8n:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}


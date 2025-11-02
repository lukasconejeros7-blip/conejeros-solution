export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  try {
    // URL segura (de Easypanel)
    const webhookUrl = 'https://n8n-n8n.bvil2a.easypanel.host/webhook/be7c4fcd-e1db-4d73-a634-0bc1df7028bd';

    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await r.text();
    return res.status(200).json({ success: true, n8nStatus: r.status, n8nBody: text });
  } catch (err) {
    console.error('Error enviando a n8n:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

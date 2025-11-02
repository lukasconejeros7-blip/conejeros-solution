export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const webhookUrl = 'https://n8n.tuservicioia.cl/webhook/be7c4fcd-e1db-4d73-a634-0bc1df7028bd';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data}`);
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Error enviando a n8n:', err);
    return res.status(500).json({ error: 'Error al conectar con n8n', details: err.message });
  }
}

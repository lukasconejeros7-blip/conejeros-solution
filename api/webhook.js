export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  try {
    // ✅ WEBHOOK DE N8N CORRECTO (seguro)
    const webhookUrl = 'https://n8n-n8n.bvil2a.easypanel.host/webhook/be7c4fcd-e1db-4d73-a634-0bc1df7028bd';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('❌ Error desde n8n:', text);
      return res.status(response.status).json({ success: false, error: text });
    }

    console.log('✅ Enviado correctamente a n8n:', text);
    return res.status(200).json({ success: true, message: 'Datos enviados correctamente a n8n' });
  } catch (err) {
    console.error('🚨 Error al conectar con n8n:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function sendMakeWebhook(
  _channel: string,
  payload: Record<string, unknown>,
  _label: string,
): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.REVIEW_WEBHOOK_URL?.trim();
  if (!url) {
    return { ok: false, error: "REVIEW_WEBHOOK_URL not set" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: `Webhook returned ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Webhook failed" };
  }
}

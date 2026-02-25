import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send('Missing token.');
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from('subscribers')
    .update({ confirmed: true, confirmed_at: new Date().toISOString() })
    .eq('confirm_token', token)
    .eq('confirmed', false)
    .select('email')
    .single();

  if (error || !data) {
    return res.status(400).send(`
      <html><body style="font-family:monospace;background:#0a0a0c;color:#a0a0a8;display:flex;justify-content:center;align-items:center;height:100vh;">
        <div style="text-align:center"><h1 style="color:#818cf8">UMBRA SIGNALS</h1><p>Invalid or expired confirmation link.</p></div>
      </body></html>
    `);
  }

  return res.status(200).send(`
    <html><body style="font-family:monospace;background:#0a0a0c;color:#a0a0a8;display:flex;justify-content:center;align-items:center;height:100vh;">
      <div style="text-align:center">
        <h1 style="color:#818cf8">UMBRA SIGNALS</h1>
        <p>✓ Subscription confirmed for ${data.email}</p>
        <p style="opacity:0.5;font-size:12px;">Shadow briefings incoming.</p>
        <a href="/" style="color:#818cf8;">← Return to Umbra Signals</a>
      </div>
    </body></html>
  `);
}

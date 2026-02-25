import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // Check if already subscribed
  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, confirmed')
    .eq('email', email.toLowerCase())
    .single();

  if (existing?.confirmed) {
    return res.status(200).json({ message: 'Already subscribed.' });
  }

  // Upsert subscriber
  const { data: subscriber, error: dbError } = await supabase
    .from('subscribers')
    .upsert(
      { email: email.toLowerCase(), confirmed: false },
      { onConflict: 'email' }
    )
    .select('confirm_token')
    .single();

  if (dbError) {
    console.error('DB error:', dbError);
    return res.status(500).json({ error: 'Subscription failed.' });
  }

  // Send confirmation email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    // Resend not configured yet — still accept the subscriber
    return res.status(200).json({
      message: 'Subscribed (confirmation email pending setup).'
    });
  }

  const confirmUrl = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://umbra-signals-preview.vercel.app'}/api/confirm?token=${subscriber.confirm_token}`;

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Umbra Signals <signals@umbrasignals.dev>',
        to: email.toLowerCase(),
        subject: 'Confirm your Umbra Signals subscription',
        html: `
          <div style="font-family: monospace; background: #0a0a0c; color: #a0a0a8; padding: 40px; max-width: 500px;">
            <h1 style="color: #818cf8; font-size: 18px;">UMBRA SIGNALS</h1>
            <p>Shadow Briefings on the AI Frontier</p>
            <hr style="border: 1px dashed #27272a;">
            <p>Confirm your subscription:</p>
            <a href="${confirmUrl}" style="display: inline-block; background: #a0a0a8; color: #0a0a0c; padding: 10px 24px; text-decoration: none; font-family: monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">CONFIRM SUBSCRIPTION</a>
            <hr style="border: 1px dashed #27272a;">
            <p style="font-size: 10px; opacity: 0.5;">If you didn't request this, ignore this email.</p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error('Resend error:', err);
      return res.status(200).json({ message: 'Subscribed. Confirmation email may be delayed.' });
    }

    return res.status(200).json({ message: 'Check your email to confirm.' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(200).json({ message: 'Subscribed. Confirmation email may be delayed.' });
  }
}

import { Resend } from "resend";

let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

const rateLimitMap = new Map();

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isGibberish(text) {
  if (!text || typeof text !== 'string') return false;
  const words = text.trim().split(/\s+/);
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (cleanWord.length >= 5) {
      // 5+ letter word with 0 vowels
      if (!/[aeiouyAEIOUY]/.test(cleanWord)) {
        return true;
      }
      // 5 consecutive consonants
      if (/[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]{5,}/.test(cleanWord)) {
        return true;
      }
    }
  }
  return false;
}

export default async function handler(req, res) {
  if (!resend) {
    return res.status(500).json({
      success: false,
      message: "Email service is not configured (missing API key).",
    });
  }

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { name, email, phone, company, message, website_url, formLoadTime } = req.body || {};

  // 1. Honeypot Check (Trap automated bots that auto-fill all form fields)
  if (website_url && typeof website_url === "string" && website_url.trim() !== "") {
    console.warn(`[Anti-Spam] Honeypot triggered by IP: ${ip}`);
    return res.status(200).json({ success: true }); // Return fake success to bot
  }

  // 2. Submission Speed Check (Bots submit forms in < 2.5s)
  if (formLoadTime && typeof formLoadTime === "number") {
    const elapsed = now - formLoadTime;
    if (elapsed < 2500) {
      console.warn(`[Anti-Spam] Fast submission (${elapsed}ms) by IP: ${ip}`);
      return res.status(200).json({ success: true }); // Return fake success to bot
    }
  }

  // Rate Limiting Logic (In-Memory per instance)
  const windowMs = 60 * 60 * 1000; // 1 hour
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
  } else {
    const data = rateLimitMap.get(ip);
    if (now - data.firstRequest > windowMs) {
      rateLimitMap.set(ip, { count: 1, firstRequest: now });
    } else {
      data.count += 1;
      if (data.count > 3) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }
      rateLimitMap.set(ip, data);
    }
  }

  const nameStr = typeof name === 'string' ? name.trim() : "";
  const emailStr = typeof email === 'string' ? email.trim() : "";
  const phoneStr = typeof phone === 'string' ? phone.trim() : "";
  const messageStr = typeof message === 'string' ? message.trim() : "";
  const companyStr = typeof company === 'string' ? company.trim() : "";

  if (!nameStr || !emailStr || !phoneStr || !messageStr) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and message are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailStr)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  // 3. Gibberish & Bot Heuristic Detection
  if (isGibberish(nameStr) || isGibberish(companyStr) || isGibberish(messageStr)) {
    console.warn(`[Anti-Spam] Gibberish text detected from IP ${ip}: name="${nameStr}", company="${companyStr}"`);
    return res.status(200).json({ success: true }); // Return fake success to bot
  }

  const digitsOnly = phoneStr.replace(/\D/g, "");
  if (digitsOnly.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number.",
    });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Credence Lighting <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO_EMAIL || "info@credencelighting.com";

  const cleanName = escapeHtml(nameStr);
  const cleanEmail = escapeHtml(emailStr);
  const cleanPhone = escapeHtml(phoneStr);
  const cleanCompany = escapeHtml(companyStr);
  const cleanMessage = escapeHtml(messageStr);

  try {
    const adminEmail = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: emailStr,
      subject: "New Website Inquiry",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
          <h2 style="border-bottom:2px solid #c8a96b;padding-bottom:10px;color:#1a1a1a;">
            New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name:</td><td>${cleanName}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td><a href="mailto:${cleanEmail}">${cleanEmail}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Phone:</td><td>${cleanPhone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Company:</td><td>${cleanCompany || "N/A"}</td></tr>
          </table>
          <h3 style="margin-top:20px;color:#1a1a1a;">Message:</h3>
          <p style="background:#f9f9f9;padding:16px;border-left:4px solid #c8a96b;line-height:1.6;">
            ${cleanMessage.replace(/\n/g, "<br />")}
          </p>
          <p style="color:#888;font-size:12px;margin-top:24px;">
            Sent via credencelighting.com contact form
          </p>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error("Admin Email Error:", adminEmail.error);
      throw new Error(adminEmail.error.message);
    }

    // We wrap this in a try/catch because if using onboarding@resend.dev,
    // sending to an unverified email (like the visitor's) will throw an error.
    try {
      const visitorEmail = await resend.emails.send({
        from: fromEmail,
        to: emailStr,
        subject: "Thank you for contacting Credence Lighting",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
            <h2 style="border-bottom:2px solid #c8a96b;padding-bottom:10px;color:#1a1a1a;">
              Thank You, ${nameStr}
            </h2>
            <p>Thank you for reaching out to <strong>Credence Lighting</strong>. We have received your inquiry and our team will get back to you shortly.</p>
            <p style="margin-top:24px;">Warm regards,<br /><strong>Credence Lighting Team</strong><br />
            <a href="mailto:info@credencelighting.com">info@credencelighting.com</a></p>
          </div>
        `,
      });

      if (visitorEmail.error) {
        console.warn("Visitor Email Warning:", visitorEmail.error.message);
      }
    } catch (visitorErr) {
      console.warn("Failed to send auto-reply to visitor:", visitorErr.message);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
}

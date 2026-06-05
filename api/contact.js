import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { name, email, phone, company, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and message are required.",
    });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Credence Lighting <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO_EMAIL || "info@credencelighting.com";

  try {
    const adminEmail = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: "New Website Inquiry",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
          <h2 style="border-bottom:2px solid #c8a96b;padding-bottom:10px;color:#1a1a1a;">
            New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Phone:</td><td>${phone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Company:</td><td>${company || "N/A"}</td></tr>
          </table>
          <h3 style="margin-top:20px;color:#1a1a1a;">Message:</h3>
          <p style="background:#f9f9f9;padding:16px;border-left:4px solid #c8a96b;line-height:1.6;">
            ${message.replace(/\n/g, "<br />")}
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
        to: email,
        subject: "Thank you for contacting Credence Lighting",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
            <h2 style="border-bottom:2px solid #c8a96b;padding-bottom:10px;color:#1a1a1a;">
              Thank You, ${name}
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

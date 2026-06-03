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

  try {
    await resend.emails.send({
      from: "Credence Lighting <noreply@credencelighting.com>",
      to: "info@credencelighting.com",
      replyTo: email,
      subject: "New Website Inquiry",
      html: `
        New Contact Form Submission

        **Name:** ${name}

        **Email:** ${email}

        **Phone:** ${phone}

        **Company:** ${company || "N/A"}

        **Message:**

        ${message.replace(/\n/g, "\n")}
      `,
    });

    await resend.emails.send({
      from: "Credence Lighting <noreply@credencelighting.com>",
      to: email,
      subject: "Thank you for contacting Credence Lighting",
      html: `
        Dear ${name},

        Thank you for contacting Credence Lighting.

        We have received your inquiry and our team will get back to you shortly.

        Regards,

        Credence Lighting Team
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
}

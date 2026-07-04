import { useState } from "react";
import TextReveal from "../ui/motion/TextReveal";
import FadeUp from "../ui/motion/FadeUp";


export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-transparent z-10 text-white px-4 md:px-16 py-20 md:py-24 overflow-hidden"
    >

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">

          <div className="max-w-4xl">
            <FadeUp delay={0}>
              <p className="uppercase tracking-[0.4em] text-xs text-[#c8a96b] mb-6">
                Contact
              </p>
            </FadeUp>

            <h2 className="text-5xl md:text-7xl font-serif leading-[1] flex flex-wrap gap-2">
              <TextReveal text="Let’s Create" />
              <TextReveal text="Something Exceptional" delay={2} className="italic text-[#c8a96b] block mt-2 w-full" />
            </h2>
          </div>

          <FadeUp delay={4}>
            <p className="max-w-xl text-white/55 leading-8 text-lg">
              We collaborate with visionary brands, architects,
              and developers to craft premium lighting experiences
              that elevate atmosphere and redefine spatial identity.
            </p>
          </FadeUp>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-stretch">

          {/* LEFT INFO PANEL */}
          <FadeUp
            delay={2}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 flex flex-col justify-between min-h-[520px] md:min-h-[620px]"
          >

            {/* INNER GLOW */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#c8a96b]/10 blur-[120px] rounded-full" />

            <div className="relative z-10">

              <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-10">
                Studio Information
              </p>

              <div className="space-y-10">

                <div>
                  <p className="text-white/30 uppercase tracking-[0.25em] text-xs mb-4">
                    Call
                  </p>

                  <div className="space-y-2 text-xl text-white/80">
                    <a href="tel:+971564965660" className="block hover:text-[#c8a96b] transition duration-300">
                      +971 564 965 660
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-white/30 uppercase tracking-[0.25em] text-xs mb-4">
                    Email
                  </p>

                  <a href="mailto:info@credencelighting.com" className="text-xl text-white/80 hover:text-[#c8a96b] transition duration-300">
                    info@credencelighting.com
                  </a>
                </div>

                <div>
                  <p className="text-white/30 uppercase tracking-[0.25em] text-xs mb-4">
                    Location
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/ec2HMCDNXYtYviV7A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white/70 leading-8 hover:text-[#c8a96b] transition-colors duration-300"
                  >
                    <strong className="text-white">Credence Lighting LLC</strong>
                    <br />
                    Unit E77, Arabtec Eastern Model
                    <br />
                    <span className="text-white/40">(Near Al Ramla Supermarket)</span>
                    <br />
                    Dubai Investment Park 1
                    <br />
                    Dubai, United Arab Emirates
                  </a>
                </div>

              </div>

            </div>

            {/* BOTTOM TEXT */}
            <div className="relative z-10 mt-16 pt-8 border-t border-white/10">

              <p className="text-white/40 leading-8">
                Premium architectural and commercial
                lighting solutions crafted with precision,
                elegance, and innovation.
              </p>

            </div>

          </FadeUp>

          {/* RIGHT FORM */}
          <FadeUp
            delay={4}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111111] p-8 md:p-12 min-h-[520px] md:min-h-[620px]"
          >

            <div className="relative z-10">

              <div className="mb-12">

                <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-5">
                  Start A Conversation
                </p>

                <h3 className="text-4xl md:text-5xl font-serif leading-tight">
                  Tell Us About
                  <span className="italic text-[#c8a96b]">
                    {" "}Your Vision
                  </span>
                </h3>

              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
                  />

                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
                  />

                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
                  />
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="7"
                  placeholder="Tell us about your project..."
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30 resize-none"
                />

                <button
                  type="submit"
                  className="group mt-4 bg-[#c8a96b] hover:bg-[#d8bb82] text-black px-10 py-5 rounded-2xl uppercase tracking-[0.25em] text-sm transition duration-500 flex items-center gap-3"
                >
                  {status.type === "loading" ? "Sending..." : "Send Message →"}
                </button>

                {status.message && (
                  <p className={`text-sm ${status.type === "success" ? "text-[#a3ff8f]" : status.type === "error" ? "text-[#ff9e9e]" : "text-white/80"}`}>
                    {status.message}
                  </p>
                )}

              </form>

            </div>

          </FadeUp>

        </div>

      </div>

    </section>
  )
}

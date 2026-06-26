// import { motion } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   ArrowUpRight,
// } from "lucide-react";

// export default function ContactSection() {
//   return (
//   <section className="relative bg-[#0b0b0b] overflow-hidden py-24 md:py-32 px-6 md:px-16 text-white">

//     {/* SOFT GLOW */}
//     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c8a96b]/10 blur-[160px] rounded-full" />

//     <div className="relative z-10 max-w-[1500px] mx-auto">

//       {/* TOP */}
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//         className="max-w-4xl"
//       >

//         <p className="uppercase tracking-[0.4em] text-xs text-[#c8a96b] mb-6">
//           Contact
//         </p>

//         <h2 className="text-5xl md:text-7xl font-serif leading-[1.05]">
//           Let’s Create
//           <span className="italic text-[#c8a96b]">
//             {" "}Something Exceptional
//           </span>
//         </h2>

//         <p className="mt-8 text-white/55 text-lg leading-9 max-w-2xl">
//           From luxury retail environments to architectural
//           lighting experiences, our specialists help bring
//           visionary spaces to life with precision and elegance.
//         </p>

//       </motion.div>

//       {/* MAIN GRID */}
//       <div className="grid lg:grid-cols-2 gap-16 mt-20 items-center">

//         {/* LEFT */}
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 1 }}
//           viewport={{ once: true }}
//           className="space-y-10 flex flex-col justify-center h-full"
//         >

//           <div>
//             <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-4">
//               Call
//             </p>

//             <div className="space-y-2 text-white/70 text-lg">
//               <p>+971 564 965 660</p>
//               <p>+971 559 167 311</p>
//             </div>
//           </div>

//           <div>
//             <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-4">
//               Email
//             </p>

//             <p className="text-white/70 text-lg">
//               info@credencelighting.com
//             </p>
//           </div>

//           <div>
//             <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-4">
//               Studio
//             </p>

//             <p className="text-white/70 leading-8">
//               Dubai Investment Park,
//               <br />
//               Dubai, UAE
//             </p>
//           </div>

//         </motion.div>

//         {/* RIGHT FORM */}
//         <motion.div
//           initial={{ opacity: 0, y: 80 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 1 }}
//           viewport={{ once: true }}
//          className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 md:p-10 w-full max-w-[720px] lg:ml-auto"
//         >

//           <form className="space-y-5">

//             <div className="grid md:grid-cols-2 gap-5">

//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
//               />

//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
//               />

//             </div>

//             <input
//               type="text"
//               placeholder="Company Name"
//               className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30"
//             />

//             <textarea
//               rows="5"
//               placeholder="Tell us about your project..."
//               className="w-full bg-transparent border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a96b] transition duration-500 placeholder:text-white/30 resize-none"
//             />

//             <button
//               type="submit"
//               className="group mt-4 bg-[#c8a96b] hover:bg-[#d8bb82] text-black px-10 py-4 rounded-2xl uppercase tracking-[0.25em] text-sm transition duration-500 flex items-center gap-3"
//             >
//               Send Message

//               <ArrowUpRight
//                 size={18}
//                 className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-500"
//               />
//             </button>

//           </form>

//         </motion.div>

//       </div>

//     </div>
//   </section>
// );
// }
import { useState } from "react";
import { motion } from "framer-motion";

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
      className="relative bg-[#0b0b0b] text-white px-4 md:px-16 py-20 md:py-24 overflow-hidden"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c8a96b]/10 blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20"
        >

          <div className="max-w-4xl">

            <p className="uppercase tracking-[0.4em] text-xs text-[#c8a96b] mb-6">
              Contact
            </p>

            <h2 className="text-5xl md:text-7xl font-serif leading-[1]">
              Let’s Create
              <span className="italic text-[#c8a96b] block mt-2">
                Something Exceptional
              </span>
            </h2>

          </div>

          <p className="max-w-xl text-white/55 leading-8 text-lg">
            We collaborate with visionary brands, architects,
            and developers to craft premium lighting experiences
            that elevate atmosphere and redefine spatial identity.
          </p>

        </motion.div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-stretch">

          {/* LEFT INFO PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
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
                    <p>+971 564 965 660</p>
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

                  <p className="text-white/70 leading-8">
                    Arabtec Eastern Model,
                    <br />
                    Dubai Investment Park,
                    <br />
                    Dubai, UAE
                  </p>
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

          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111111] p-8 md:p-12 min-h-[520px] md:min-h-[620px]"
          >

            {/* GLOW */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#c8a96b]/10 blur-[140px] rounded-full" />

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

          </motion.div>

        </div>

      </div>

    </section>
  )
}

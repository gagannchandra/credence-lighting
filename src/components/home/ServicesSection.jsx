import { motion } from "framer-motion";
import { Wrench, Monitor, ClipboardList, Settings, Headset, Briefcase } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Requirement Analysis",
      description: "Understanding project objectives, technical needs, and design intent.",
      icon: ClipboardList,
    },
    {
      title: "Design & Planning",
      description: "Lighting layouts, technical coordination, and value-engineered solutions.",
      icon: Monitor,
    },
    {
      title: "Product Selection & Supply",
      description: "Certified high-quality, and energy-efficient lighting products.",
      icon: Briefcase,
    },
    {
      title: "Installation & Execution",
      description: "Skilled installation with strict safety and quality control.",
      icon: Wrench,
    },
    {
      title: "Testing & Commissioning",
      description: "Complete system testing for performance, safety, and compliance.",
      icon: Settings,
    },
    {
      title: "Project Handover & Support",
      description: "Documentation, training, warranty support, and after-sales service.",
      icon: Headset,
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-black text-white flex flex-col items-center overflow-hidden px-6">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-[#c8a96b]/5 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wide">
              OUR <span className="text-[#c8a96b]">SERVICES</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#c8a96b]/40 mx-auto mt-6 mb-10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white/70 text-lg md:text-xl leading-relaxed text-center"
          >
            End-to-end delivery from design to commissioning.{" "}
            <span className="text-white font-medium">Complete system validation and documentation.</span>{" "}
            Strong after-sales support, including{" "}
            <span className="text-white font-medium">maintenance, warranty, and AMC</span>.{" "}
            Powered by advanced lighting technology and LED screens. Proven projects across the{" "}
            <span className="text-white font-medium">UAE and GCC</span>. Commitment to{" "}
            <span className="text-white font-medium">reliability, trust, and service excellence.</span>
          </motion.p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden border border-white/10 rounded-[2rem] p-8 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#c8a96b]/10 via-transparent to-transparent pointer-events-none" />

                <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                  {/* ICON CONTAINER */}
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Icon className="w-10 h-10 text-black" strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-3 group-hover:text-[#c8a96b] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

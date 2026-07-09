import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SEO from "../../components/seo/SEO";
import InlineFAQ from "../../components/seo/InlineFAQ";
import FadeUp from "../../components/ui/motion/FadeUp";
import { scrollToTop } from "../../utils/scrollUtils";
import ArticleBody from "../../components/blog/ArticleBody";

export default function LocationTemplate({ 
  seo, 
  schema, 
  hero, 
  stats,
  services, 
  contentBlocks,
  relatedProjects,
  faqs 
}) {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <SEO 
        title={seo.title} 
        description={seo.description}
        schema={schema}
      />
      <Navbar />

      <main className="relative bg-black overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-36 pb-24 px-6 md:px-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#c8a96b]/10 blur-[180px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <FadeUp>
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin size={14} className="text-[#c8a96b]" />
                <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b]">
                  {hero.location}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={1}>
              <h1 className="text-fluid-h1 font-serif text-white leading-tight">
                {hero.title} <span className="italic text-[#c8a96b]">{hero.titleItalic}</span>
              </h1>
            </FadeUp>
            <FadeUp delay={2}>
              <p className="mt-8 text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                {hero.description}
              </p>
            </FadeUp>
            <FadeUp delay={3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#c8a96b] text-black text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors duration-300 rounded-full"
                >
                  Contact Our Local Team
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 rounded-full"
                >
                  View Regional Projects
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* STATS */}
        {stats && (
          <section className="relative py-16 border-y border-white/10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10">
              {stats.map(([number, label], index) => (
                <FadeUp key={label} delay={index * 1}>
                  <div className={`text-center ${index !== 0 ? "md:border-l md:border-white/10" : ""}`}>
                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-2">{number}</h3>
                    <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b]/80">{label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>
        )}

        {/* SERVICES IN REGION */}
        {services && (
          <section className="py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <FadeUp>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                    Comprehensive Lighting Services
                  </h2>
                </div>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <FadeUp key={service.title} delay={index * 1}>
                      <div className="group relative overflow-hidden border border-white/10 rounded-[2rem] p-8 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 h-full">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#c8a96b]/10 via-transparent to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          {Icon && (
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c8a96b] transition-colors duration-500 mb-6">
                              <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500" strokeWidth={1.5} />
                            </div>
                          )}
                          <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#c8a96b] transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* AI-OPTIMIZED RICH CONTENT */}
        {contentBlocks && (
          <section className="py-16 px-6 md:px-12 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto">
              <ArticleBody blocks={contentBlocks} />
            </div>
          </section>
        )}

        {/* RELATED PROJECTS */}
        {relatedProjects && (
          <section className="py-24 px-6 md:px-12 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <FadeUp>
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                      Featured Projects in the Region
                    </h2>
                  </div>
                  <Link to="/projects" className="hidden md:flex items-center gap-2 text-[#c8a96b] hover:text-white transition-colors duration-300">
                    <span className="text-sm uppercase tracking-widest">View All</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((project, index) => (
                  <FadeUp key={project.title} delay={index * 1}>
                    <Link to={project.link} className="group block border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-[#c8a96b]/30 transition-all duration-500">
                      <div className="h-64 overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#c8a96b] transition-colors">{project.title}</h3>
                        <p className="text-white/60 text-sm">{project.description}</p>
                      </div>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        {faqs && (
          <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto">
              <FadeUp>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                    Frequently Asked Questions
                  </h2>
                </div>
              </FadeUp>
              <InlineFAQ faqs={faqs} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#c8a96b] opacity-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                Ready to Discuss Your Project in {hero.location}?
              </h2>
              <p className="text-white/60 text-lg mb-10">
                Connect with our local lighting design experts to explore solutions tailored perfectly for your space.
              </p>
              <Link
                to="/contact"
                className="inline-block px-10 py-5 bg-[#c8a96b] text-black text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors duration-300 rounded-full"
              >
                Contact Us Today
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

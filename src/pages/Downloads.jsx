import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/ui/BackButton";

const resources = [
  {
    title: "Product Catalogue",
    type: "PDF Document",
    description:
      "Explore our premium architectural and commercial lighting solutions.",
    href: "/pdfs/catalogue.pdf",
    download: true,
  },
  {
    title: "Company Profile",
    type: "PDF Document",
    description:
      "Learn about Credence Lighting, our global presence, and project expertise.",
    href: "/pdfs/credence%20profile.pdf",
    download: true,
  },
  {
    title: "Project Album",
    type: "PDF Document",
    description:
      "A visual album showcasing our completed lighting and architectural projects.",
    href: "/pdfs/album.pdf",
    download: true,
  },
];

export default function Downloads() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <BackButton />

      <section className="relative pt-40 px-6 md:px-16 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#c8a96b]/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-xs text-[#c8a96b] mb-6">
            Downloads
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight">
            Company
            <span className="italic text-[#c8a96b]"> Resources</span>
          </h1>

          <p className="mt-8 text-white/50 max-w-2xl text-lg leading-8">
            Access catalogues, company profiles, and technical documents
            for your next commercial lighting project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {resources.map((item) => (
              <a
                key={item.title}
                href={item.href}
                {...(item.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                className="group border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-[#c8a96b] transition duration-500 rounded-[1.5rem]"
              >
                <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-6">
                  {item.type}
                </p>

                <h2 className="text-3xl font-serif mb-4">{item.title}</h2>

                <p className="text-white/50 leading-7">{item.description}</p>

                <div className="mt-10 text-sm uppercase tracking-[0.3em] text-white/70 group-hover:text-[#c8a96b] transition duration-300">
                  Download PDF ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

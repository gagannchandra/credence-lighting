import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/ui/Loader";
import ScrollToTop from "./components/ScrollToTop";
import WhatsappFloat from "./components/ui/WhatsappFloat";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";
import AmbientBackground from "./components/layout/AmbientBackground";
const Home = lazy(() => import("./pages/Home"));
const Downloads = lazy(() => import("./pages/Downloads"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Brands = lazy(() => import("./pages/Brands"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Faq = lazy(() => import("./pages/Faq"));

// Money Pages
const LightingCompanyDubai = lazy(() => import("./pages/LightingCompanyDubai"));
const LightingShowroomDubai = lazy(() => import("./pages/LightingShowroomDubai"));
const CeilingLightsDubai = lazy(() => import("./pages/CeilingLightsDubai"));
const OutdoorLightingDubai = lazy(() => import("./pages/OutdoorLightingDubai"));
const PendantLightsDubai = lazy(() => import("./pages/PendantLightsDubai"));
const LEDStripLightsDubai = lazy(() => import("./pages/LEDStripLightsDubai"));

// Industry Pages
const HotelLighting = lazy(() => import("./pages/HotelLighting"));
const ResidentialLighting = lazy(() => import("./pages/ResidentialLighting"));
const OfficeLighting = lazy(() => import("./pages/OfficeLighting"));
const RetailLighting = lazy(() => import("./pages/RetailLighting"));
const RestaurantLighting = lazy(() => import("./pages/RestaurantLighting"));
const EntertainmentLighting = lazy(() => import("./pages/EntertainmentLighting"));

// Location Pages
const LocationAbuDhabi = lazy(() => import("./pages/LocationAbuDhabi"));
const LocationSharjah = lazy(() => import("./pages/LocationSharjah"));
const LocationAjman = lazy(() => import("./pages/LocationAjman"));
const LocationRAK = lazy(() => import("./pages/LocationRAK"));
const LocationUAE = lazy(() => import("./pages/LocationUAE"));
const LocationKSA = lazy(() => import("./pages/LocationKSA"));
const LocationBahrain = lazy(() => import("./pages/LocationBahrain"));

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(!window.__PRERENDER_INJECTED);

  useEffect(() => {
    if (window.__PRERENDER_INJECTED) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="initial-loader" isInitial={true} />}
      </AnimatePresence>

      <SmoothScroll>
      <AmbientBackground />
      <CustomCursor />
      <ScrollToTop />

      <Suspense fallback={loading ? null : <Loader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/faq" element={<Faq />} />

            {/* Money Pages */}
            <Route path="/lighting-company-dubai" element={<LightingCompanyDubai />} />
            <Route path="/lighting-showroom-dubai" element={<LightingShowroomDubai />} />
            <Route path="/ceiling-lights-dubai" element={<CeilingLightsDubai />} />
            <Route path="/outdoor-lighting-dubai" element={<OutdoorLightingDubai />} />
            <Route path="/pendant-lights-dubai" element={<PendantLightsDubai />} />
            <Route path="/led-strip-lights-dubai" element={<LEDStripLightsDubai />} />

            {/* Industry Pages */}
            <Route path="/hotel-lighting" element={<HotelLighting />} />
            <Route path="/residential-lighting" element={<ResidentialLighting />} />
            <Route path="/office-lighting" element={<OfficeLighting />} />
            <Route path="/retail-lighting" element={<RetailLighting />} />
            <Route path="/restaurant-lighting" element={<RestaurantLighting />} />
            <Route path="/entertainment-lighting" element={<EntertainmentLighting />} />

            {/* Location Pages */}
            <Route path="/lighting-suppliers-abu-dhabi" element={<LocationAbuDhabi />} />
            <Route path="/lighting-companies-sharjah" element={<LocationSharjah />} />
            <Route path="/lighting-solutions-ajman" element={<LocationAjman />} />
            <Route path="/lighting-solutions-rak" element={<LocationRAK />} />
            <Route path="/lighting-companies-uae" element={<LocationUAE />} />
            <Route path="/lighting-companies-saudi-arabia" element={<LocationKSA />} />
            <Route path="/lighting-companies-bahrain" element={<LocationBahrain />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <WhatsappFloat />
    </SmoothScroll>
    </>
  );
}
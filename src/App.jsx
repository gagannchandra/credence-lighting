// // import { Routes, Route } from "react-router-dom";

// // import Navbar from "./components/Navbar";
// // import Hero from "./components/Hero";
// // import AboutSection from "./components/AboutSection";
// // import ProductsSection from "./components/ProductsSection";
// // import ProjectsSection from "./components/ProjectsSection";
// // import Downloads from "./pages/Downloads";
// // import ProjectDetails from "./pages/ProjectDetails";
// // import ContactSection from "./components/ContactSection";
// // import BrandsSection from "./components/BrandsSection";
// // import Footer from "./components/Footer";
// // import GlobalPresence from "./components/GlobalPresence";

// // function Home() {
// //   return (
// //     <>
// //       <Navbar />
// //       <Hero />
// //       <AboutSection />
// //       <ProductsSection />
// //       <BrandsSection />
// //       <GlobalPresence/>
// //       <ProjectsSection />
// //       <ContactSection />
// //       <Footer />
// //     </>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />

// //       <Route
// //         path="/project/:id"
// //         element={<ProjectDetails />}
// //       />
// //       <Route
// //   path="/downloads"
// //   element={<Downloads />}
// // />
// //     </Routes>
// //   );
// // }
// import { Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Downloads from "./pages/Downloads";
// import ProjectDetails from "./pages/ProjectDetails";
// import ProductDetails from "./pages/ProductDetails";
// import NotFound from "./pages/NotFound";
// import Brands from "./pages/Brands";
// import ScrollToTop from "./components/ScrollToTop";
// import WhatsappFloat from "./components/ui/WhatsappFloat";

// export default function App() {
//   return (
//        <>
//       <ScrollToTop />
//     <Routes>
//       <Route path="/" element={<Home />} />

//       <Route
//         path="/project/:id"
//         element={<ProjectDetails />}
//       />

//       <Route
//         path="/product/:id"
//         element={<ProductDetails />}
//       />

//       <Route
//         path="/downloads"
//         element={<Downloads />}
//       />
//       <Route
//   path="/brands"
//   element={<Brands />}
// />

//       <Route
//         path="*"
//         element={<NotFound />}
//       />
//     </Routes>
//      <WhatsappFloat />
//         </>
//   );
// }
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import ProjectDetails from "./pages/ProjectDetails";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Brands from "./pages/Brands";
import Gallery from "./pages/Gallery";
import ScrollToTop from "./components/ScrollToTop";
import WhatsappFloat from "./components/ui/WhatsappFloat";

export default function App() {
  const location = useLocation();
const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return <Loader />;
}
  return (
    <>
      <ScrollToTop />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route
          path="/project/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        

        <Route
          path="/downloads"
          element={<Downloads />}
        />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/brands"
          element={<Brands />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <WhatsappFloat />
    </>
  );
}
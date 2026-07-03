import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductsSection from "../components/home/ProductsSection";
import { scrollToTop } from "../utils/scrollUtils";

export default function Products() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black pt-10">
        <ProductsSection />
      </div>
      <Footer />
    </>
  );
}

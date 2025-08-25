import { useEffect } from "react";
import Header from "@/components/Header";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="section-padding bg-gradient-to-b from-background to-secondary/20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Nos Produits Naturels
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète de produits bio et naturels pour votre bien-être
            </p>
          </div>
        </div>
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
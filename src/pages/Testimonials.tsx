import { useEffect } from "react";
import Header from "@/components/Header";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Testimonials = () => {
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
              Témoignages Clients
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les retours de nos clients satisfaits
            </p>
          </div>
        </div>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
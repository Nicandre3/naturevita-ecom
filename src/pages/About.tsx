import { useEffect } from "react";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => {
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
              À Propos de NatureVita
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre mission, nos valeurs et notre engagement pour votre bien-être naturel
            </p>
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
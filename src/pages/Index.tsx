import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Animation au scroll pour les éléments fade-in
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    // Effet de parallaxe sur le scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5;
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div className="fade-in">
          <ProductsSection />
        </div>
        <div className="fade-in">
          <TestimonialsSection />
        </div>
        <div className="fade-in">
          <AboutSection />
        </div>
        <div className="fade-in">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

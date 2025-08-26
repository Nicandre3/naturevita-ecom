import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-naturevita.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Découvrez la Puissance du Jinja",
      subtitle: "Racine miracle pour votre santé et vitalité",
      description: "Plongez dans les bienfaits ancestraux du Jinja, une racine naturelle aux propriétés exceptionnelles pour booster votre énergie et améliorer votre bien-être quotidien.",
      cta: "Découvrir le Jinja",
      image: heroImage
    },
    {
      title: "IRU Soap - Beauté Naturelle",
      subtitle: "Savon artisanal aux ingrédients bio",
      description: "Transformez votre routine beauté avec notre savon IRU, formulé avec des ingrédients 100% naturels pour une peau douce, hydratée et éclatante.",
      cta: "Voir nos Savons",
      image: heroImage
    },
    {
      title: "Miel Pur & Authentique",
      subtitle: "Directement de nos ruches naturelles",
      description: "Savourez la pureté de notre miel artisanal, récolté avec amour et respect des abeilles pour vous offrir un produit d'exception aux multiples vertus.",
      cta: "Goûter nos Miels",
      image: heroImage
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background avec parallaxe */}
      <div 
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20" />

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge qualité */}
          <div className="inline-flex items-center space-x-2 bg-background/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-background font-medium">100% Naturel & Bio</span>
            <Star className="w-4 h-4 text-gold fill-gold" />
          </div>

          {/* Titre principal avec animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-background mb-6 leading-tight">
            <span className="block animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {slides[currentSlide].title}
            </span>
          </h1>

          {/* Sous-titre */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-background/90 mb-4 font-light animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {slides[currentSlide].subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-background/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {slides[currentSlide].description}
          </p>

          {/* Actions CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button 
              className="btn-hero text-lg px-10 py-4 group"
              onClick={() => navigate('/products')}
            >
              {slides[currentSlide].cta}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="ghost" className="text-background border-background/30 hover:bg-background/10 px-8 py-4 group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Voir la vidéo
            </Button>
          </div>

          {/* Statistiques */}
          <div className="flex items-center justify-center space-x-8 md:space-x-16 mt-16 animate-fade-in" style={{ animationDelay: "1s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-background">500+</div>
              <div className="text-background/70 text-sm md:text-base">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-background">100%</div>
              <div className="text-background/70 text-sm md:text-base">Produits naturels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-background">4.9/5</div>
              <div className="text-background/70 text-sm md:text-base">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-background scale-125" 
                : "bg-background/40 hover:bg-background/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-float">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/70 rounded-full mt-2 animate-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Aminata Diallo",
      age: 32,
      location: "Dakar, Sénégal",
      product: "Jinja Premium",
      rating: 5,
      comment: "Le Jinja de NatureVita a complètement transformé ma vie ! Depuis que je l'utilise, j'ai retrouvé une énergie incroyable et ma confiance en moi. Produit 100% naturel comme promis.",
      beforeAfter: {
        before: "Fatigue constante, manque d'énergie",
        after: "Énergie débordante, vitalité retrouvée"
      },
      timeUsed: "3 mois d'utilisation",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Koffi Asante",
      age: 28,
      location: "Abidjan, Côte d'Ivoire",
      product: "IRU Soap Clarifiant",
      rating: 5,
      comment: "Mon visage n'a jamais été aussi éclatant ! Le savon IRU a éliminé toutes mes imperfections en quelques semaines. Je recommande vivement à tous mes amis.",
      beforeAfter: {
        before: "Peau terne avec imperfections",
        after: "Teint éclatant et uniforme"
      },
      timeUsed: "6 semaines d'utilisation",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Fatou Camara",
      age: 35,
      location: "Bamako, Mali",
      product: "Miel de Fleurs Sauvages",
      rating: 5,
      comment: "Ce miel est exceptionnel ! Je l'utilise chaque matin dans mon thé et le soir pour mes soins visage. Ma peau est plus douce et ma santé s'est grandement améliorée.",
      beforeAfter: {
        before: "Problèmes digestifs, peau sèche",
        after: "Digestion améliorée, peau hydratée"
      },
      timeUsed: "4 mois d'utilisation",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Ibrahim Sow",
      age: 41,
      location: "Conakry, Guinée",
      product: "Pack Complet Jinja + IRU",
      rating: 5,
      comment: "Après des années de produits chimiques, NatureVita m'a réconcilié avec le naturel. Ma femme et moi utilisons tous leurs produits. Résultats garantis !",
      beforeAfter: {
        before: "Stress, fatigue, problèmes de peau",
        after: "Bien-être général, couple épanoui"
      },
      timeUsed: "8 mois d'utilisation",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section id="temoignages" className="section-padding bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Témoignages Clients
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez les transformations incroyables de nos clients qui ont choisi NatureVita 
            pour retrouver leur bien-être naturellement.
          </p>
        </div>

        {/* Statistiques de satisfaction */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Clients heureux</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Recommandent</div>
          </div>
        </div>

        {/* Témoignage principal */}
        <div className="relative max-w-6xl mx-auto">
          <div className="card-product relative overflow-hidden">
            {/* Icône de citation */}
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8">
              {/* Contenu textuel */}
              <div className="space-y-6">
                {/* Informations client */}
                <div className="flex items-center space-x-4">
                  <img
                    src={currentTestimonialData.avatar}
                    alt={currentTestimonialData.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {currentTestimonialData.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentTestimonialData.age} ans • {currentTestimonialData.location}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {currentTestimonialData.product}
                      </Badge>
                      {currentTestimonialData.verified && (
                        <Badge variant="default" className="text-xs">
                          ✓ Vérifié
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Étoiles */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonialData.rating
                          ? "text-gold fill-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {currentTestimonialData.timeUsed}
                  </span>
                </div>

                {/* Commentaire */}
                <blockquote className="text-lg leading-relaxed text-card-foreground italic">
                  "{currentTestimonialData.comment}"
                </blockquote>

                {/* Bouton vidéo */}
                <Button variant="outline" className="flex items-center space-x-2 group">
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Voir témoignage vidéo</span>
                </Button>
              </div>

              {/* Avant/Après */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-4">
                  Résultats obtenus
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="text-sm font-medium text-destructive mb-1">Avant</div>
                    <div className="text-sm text-card-foreground">
                      {currentTestimonialData.beforeAfter.before}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-sm font-medium text-primary mb-1">Après</div>
                    <div className="text-sm text-card-foreground">
                      {currentTestimonialData.beforeAfter.after}
                    </div>
                  </div>
                </div>

                {/* Durée d'utilisation */}
                <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-sm font-medium text-accent mb-1">Durée d'utilisation</div>
                  <div className="text-lg font-semibold text-card-foreground">
                    {currentTestimonialData.timeUsed}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles de navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Indicateurs */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary scale-125"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Galerie de témoignages courts */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-card rounded-lg p-6 border border-border/50 hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? "text-gold fill-gold" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-card-foreground leading-relaxed line-clamp-3">
                "{testimonial.comment}"
              </p>
              
              <Badge variant="outline" className="mt-3 text-xs">
                {testimonial.product}
              </Badge>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Rejoignez nos clients satisfaits
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Commandez dès maintenant et découvrez vous aussi les bienfaits de nos produits 100% naturels.
          </p>
          <Button className="btn-hero text-lg px-10 py-4">
            Commander maintenant
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
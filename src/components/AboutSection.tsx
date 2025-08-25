import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Leaf, Users, Award, Facebook, Instagram, MessageCircle } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Leaf,
      title: "100% Naturel",
      description: "Tous nos produits sont issus de la nature, sans additifs chimiques ni conservateurs artificiels."
    },
    {
      icon: Heart,
      title: "Bien-être Authentique",
      description: "Nous croyons au pouvoir des remèdes traditionnels africains pour votre santé et beauté."
    },
    {
      icon: Users,
      title: "Communauté Engagée",
      description: "Plus qu'une marque, nous créons une famille unie autour des valeurs du naturel."
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Chaque produit est soigneusement sélectionné et testé pour vous garantir l'excellence."
    }
  ];

  const team = [
    {
      name: "Dr. Amadou Diarra",
      role: "Fondateur & Herboriste",
      description: "Expert en médecine traditionnelle africaine avec 15 ans d'expérience",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Aïcha Traoré",
      role: "Responsable Qualité",
      description: "Garantit la pureté et l'authenticité de chaque produit NatureVita",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Moussa Kone",
      role: "Directeur Commercial",
      description: "Passionné par le partage des bienfaits de la nature africaine",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const socialLinks = [
    {
      platform: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/naturevita",
      followers: "10K+",
      description: "Suivez nos actualités et conseils santé"
    },
    {
      platform: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/221123456789",
      followers: "Chat",
      description: "Contact direct pour vos questions"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/naturevita",
      followers: "15K+",
      description: "Découvrez nos produits en images"
    }
  ];

  return (
    <section id="apropos" className="section-padding">
      <div className="container mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            À propos de NatureVita
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez l'histoire et les valeurs qui font de NatureVita votre partenaire de confiance 
            pour un bien-être naturel et authentique.
          </p>
        </div>

        {/* Notre histoire */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Notre Histoire
            </Badge>
            <h3 className="text-3xl font-bold text-foreground">
              Une passion pour les trésors de la nature africaine
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                NatureVita est née d'une passion profonde pour les remèdes traditionnels africains 
                et d'une conviction : la nature offre tout ce dont nous avons besoin pour notre bien-être.
              </p>
              <p>
                Fondée par le Dr. Amadou Diarra, herboriste passionné, notre entreprise s'appuie sur 
                des siècles de savoir-faire traditionnel pour vous proposer des produits d'exception, 
                100% naturels et authentiques.
              </p>
              <p>
                Chaque produit NatureVita est le fruit d'une sélection rigoureuse et d'un respect 
                total de l'environnement et des communautés locales qui perpétuent ces traditions ancestrales.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button className="btn-hero">
                Découvrir nos produits
              </Button>
              <Button variant="outline">
                Notre démarche qualité
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <img
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop"
                alt="Herboristerie traditionnelle"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badges flottants */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs">Clients</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs">Années</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Nos Valeurs Fondamentales
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ces principes guident chacune de nos actions et nous permettent de vous offrir 
              des produits d'exception en toute confiance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card-product text-center group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notre équipe */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Rencontrez Notre Équipe
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés dédiés à votre bien-être et à la promotion 
              des bienfaits de la nature africaine.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-product text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-1">
                  {member.name}
                </h4>
                <Badge variant="secondary" className="mb-3">
                  {member.role}
                </Badge>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Suivez-nous sur les Réseaux Sociaux
          </h3>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Rejoignez notre communauté et restez informés de nos dernières actualités, 
            conseils santé et offres spéciales.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-product group cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-card-foreground">
                        {social.platform}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {social.followers} • {social.description}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
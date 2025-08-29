import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Leaf,
  Shield,
  Truck
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "Produits", href: "#produits" },
    { name: "Témoignages", href: "#temoignages" },
    { name: "À propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
  ];

  const productCategories = [
    { name: "Jinja Premium", href: "#produits" },
    { name: "Savons IRU", href: "#produits" },
    { name: "Miel Naturel", href: "#produits" },
    { name: "Packs Découverte", href: "#produits" },
    { name: "Nouveautés", href: "#produits" },
  ];

  const legalLinks = [
    { name: "Conditions d'utilisation", href: "/cgu" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Mentions légales", href: "/legal" },
    { name: "Livraison & Retours", href: "/shipping" },
    { name: "FAQ", href: "/faq" },
  ];

  const features = [
    {
      icon: Leaf,
      title: "100% Naturel",
      description: "Produits biologiques certifiés"
    },
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Satisfaction ou remboursé"
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Dans toute l'Afrique de l'Ouest"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/10 to-accent/5 border-t border-border">
      {/* Section supérieure avec newsletter */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Restez connecté avec NatureVita
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Inscrivez-vous à notre newsletter pour recevoir nos conseils bien-être, 
                nos offres exclusives et les dernières nouveautés en avant-première.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 h-12"
                />
                <Button className="btn-hero h-12 px-8">
                  <Mail className="w-4 h-4 mr-2" />
                  S'abonner
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Pas de spam, promis ! Vous pouvez vous désabonner à tout moment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informations entreprise */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">NatureVita</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Votre partenaire de confiance pour un bien-être naturel. 
              Découvrez la puissance des remèdes traditionnels africains 
              avec nos produits 100% naturels et authentiques.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/naturevita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/naturevita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary/50 rounded-full mr-3 group-hover:bg-primary transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Produits */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Nos Produits
            </h3>
            <ul className="space-y-3">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href={category.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary/50 rounded-full mr-3 group-hover:bg-primary transition-colors duration-300"></span>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <a 
                  href="tel:+237 000000000"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  +237 000 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <a 
                  href="mailto:contact@naturevita.sn"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  contact@naturevita.sn
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">
                  Cameroun, Douala<br />
                  Livraison en Afrique de l'Ouest
                </span>
              </div>
            </div>

            {/* Horaires */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-medium text-foreground mb-2">Horaires</h4>
              <p className="text-sm text-muted-foreground">
                Lun-Ven: 8h-20h<br />
                Sam: 9h-18h<br />
                Dim: 10h-16h
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section inférieure */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 NatureVita. Fait avec</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span>au Cameroun</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
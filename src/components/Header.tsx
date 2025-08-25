import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "Produits", href: "#produits" },
    { name: "Témoignages", href: "#temoignages" },
    { name: "À propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">NatureVita</h1>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">2</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">0</span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
            <Button className="btn-hero">
              Commander
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border shadow-lg animate-slide-in-right">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs">2</span>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs">0</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </div>
              <Button className="btn-hero w-full mt-4">
                Commander maintenant
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
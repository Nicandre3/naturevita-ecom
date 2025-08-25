import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const { cartCount, favoritesCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Produits", href: "/products" },
    { name: "Témoignages", href: "/testimonials" },
    { name: "À propos", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">NatureVita</h1>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors duration-300 font-medium relative group ${
                  location.pathname === item.href ? "text-primary" : ""
                }`}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">
                  {favoritesCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="relative" onClick={() => setShowCart(true)}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
            <Button className="btn-hero" onClick={() => setShowCart(true)}>
              Commander
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
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
          <div className="md:hidden fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 ${
                    location.pathname === item.href ? "text-primary" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="w-5 h-5" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="relative" onClick={() => setShowCart(true)}>
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </div>
              <Button className="btn-hero w-full mt-4" onClick={() => setShowCart(true)}>
                Commander maintenant
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </header>
  );
};

export default Header;
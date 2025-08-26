import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye, Zap, Shield, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ProductDetailsModal from "./ProductDetailsModal";
import jinjaImage from "@/assets/jinja-product.jpg";
import iruSoapImage from "@/assets/iru-soap.jpg";
import honeyImage from "@/assets/honey-product.jpg";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const categories = [
    { id: "all", name: "Tous nos produits", icon: Leaf },
    { id: "jinja", name: "Jinja", icon: Zap },
    { id: "soap", name: "Savons IRU", icon: Shield },
    { id: "honey", name: "Miel", icon: Star },
  ];

  const products = [
    {
      id: 1,
      name: "Jinja Premium - Racine Séchée",
      category: "jinja",
      price: 15000,
      originalPrice: 20000,
      image: jinjaImage,
      rating: 4.9,
      reviews: 127,
      description: "Racine de Jinja premium séchée naturellement, reconnue pour ses propriétés énergisantes et ses bienfaits pour la santé masculine.",
      benefits: ["Boost d'énergie naturel", "Améliore la vitalité", "100% naturel"],
      badge: "Bestseller",
      inStock: true
    },
    {
      id: 2,
      name: "Jinja Poudre Bio",
      category: "jinja",
      price: 12000,
      originalPrice: null,
      image: jinjaImage,
      rating: 4.8,
      reviews: 89,
      description: "Poudre de Jinja finement moulue, idéale pour préparer vos tisanes et décoctions traditionnelles.",
      benefits: ["Facile à utiliser", "Absorption rapide", "Goût authentique"],
      badge: "Nouveau",
      inStock: true
    },
    {
      id: 3,
      name: "IRU Soap - Savon Clarifiant",
      category: "soap",
      price: 8000,
      originalPrice: 10000,
      image: iruSoapImage,
      rating: 4.7,
      reviews: 203,
      description: "Savon artisanal IRU aux propriétés clarifiantes, parfait pour tous types de peau, formulé avec des ingrédients naturels.",
      benefits: ["Peau éclatante", "Hydratation longue durée", "Anti-âge naturel"],
      badge: "Promo",
      inStock: true
    },
    {
      id: 4,
      name: "IRU Soap - Savon Exfoliant",
      category: "soap",
      price: 9000,
      originalPrice: null,
      image: iruSoapImage,
      rating: 4.6,
      reviews: 156,
      description: "Savon exfoliant doux aux extraits naturels, élimine les cellules mortes et révèle la beauté naturelle de votre peau.",
      benefits: ["Exfoliation douce", "Peau lisse", "Ingrédients bio"],
      badge: null,
      inStock: false
    },
    {
      id: 5,
      name: "Miel de Fleurs Sauvages",
      category: "honey",
      price: 6000,
      originalPrice: null,
      image: honeyImage,
      rating: 4.9,
      reviews: 178,
      description: "Miel pur de fleurs sauvages, récolté dans nos ruches naturelles, riche en enzymes et antioxydants.",
      benefits: ["Antioxydants naturels", "Boost immunitaire", "Goût unique"],
      badge: "Bio",
      inStock: true
    },
    {
      id: 6,
      name: "Miel d'Acacia Premium",
      category: "honey",
      price: 8000,
      originalPrice: null,
      image: honeyImage,
      rating: 4.8,
      reviews: 134,
      description: "Miel d'acacia cristallisé lentement, aux propriétés apaisantes et au goût délicat, parfait pour le bien-être quotidien.",
      benefits: ["Propriétés apaisantes", "Cristallisation lente", "Saveur délicate"],
      badge: "Premium",
      inStock: true
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "Bestseller": return "default";
      case "Nouveau": return "secondary";
      case "Promo": return "destructive";
      case "Bio": return "secondary";
      case "Premium": return "default";
      default: return "outline";
    }
  };

  const handleAddToCart = (product: any) => {
    if (!product.inStock) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier.`
    });
  };

  const handleToggleFavorite = (productId: number) => {
    if (isInFavorites(productId)) {
      removeFromFavorites(productId);
      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris."
      });
    } else {
      addToFavorites(productId);
      toast({
        title: "Ajouté aux favoris",
        description: "Le produit a été ajouté à vos favoris."
      });
    }
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  return (
    <section id="produits" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Nos Produits Naturels
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de produits 100% naturels, 
            soigneusement sélectionnés pour votre bien-être et votre beauté.
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2 px-6 py-3 rounded-full hover-lift"
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-product group">
              {/* Image du produit */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badge */}
                {product.badge && (
                  <Badge 
                    variant={getBadgeVariant(product.badge)}
                    className="absolute top-3 left-3 font-semibold"
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Stock status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm font-semibold">
                      Rupture de stock
                    </Badge>
                  </div>
                )}

                {/* Actions rapides */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="w-10 h-10 rounded-full p-0"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${isInFavorites(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="w-10 h-10 rounded-full p-0"
                    onClick={() => handleViewDetails(product)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Informations produit */}
              <div className="space-y-4">
                {/* Note et avis */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-gold fill-gold"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>

                {/* Nom du produit */}
                <h3 className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Bénéfices */}
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Prix et action */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    className="flex items-center space-x-2"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? "Ajouter" : "Indisponible"}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA vers boutique complète */}
        <div className="text-center mt-16">
          <Button 
            className="btn-hero text-lg px-10 py-4"
            onClick={() => navigate('/products')}
          >
            Voir tous nos produits
          </Button>
        </div>

        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default ProductsSection;
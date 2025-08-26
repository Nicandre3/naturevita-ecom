import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Heart, ShoppingCart, Send, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  badge: string | null;
  inStock: boolean;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [productReviews, setProductReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Marie Diallo",
      rating: 5,
      comment: "Excellent produit ! J'ai vu des résultats dès la première semaine. Je recommande vivement.",
      date: "2024-01-15"
    },
    {
      id: 2,
      author: "Ousmane Fall",
      rating: 4,
      comment: "Très bon produit naturel, conforme à mes attentes. Livraison rapide.",
      date: "2024-01-10"
    }
  ]);

  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();
  const { toast } = useToast();

  if (!product) return null;

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

  const handleAddToCart = () => {
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

  const handleToggleFavorite = () => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris."
      });
    } else {
      addToFavorites(product.id);
      toast({
        title: "Ajouté aux favoris",
        description: "Le produit a été ajouté à vos favoris."
      });
    }
  };

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire un commentaire.",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now(),
      author: "Client Anonyme",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setProductReviews([review, ...productReviews]);
    setNewReview({ rating: 5, comment: "" });
    
    toast({
      title: "Avis publié !",
      description: "Merci pour votre avis sur ce produit."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image du produit */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              {product.badge && (
                <Badge 
                  variant={getBadgeVariant(product.badge)}
                  className="absolute top-3 left-3 font-semibold"
                >
                  {product.badge}
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <Badge variant="destructive" className="text-sm font-semibold">
                    Rupture de stock
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            {/* Note et avis */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
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

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Bénéfices */}
            <div>
              <h4 className="font-semibold mb-3">Bénéfices :</h4>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Prix */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                className="flex-1"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? "Ajouter au panier" : "Indisponible"}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isInFavorites(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Section des avis */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-semibold">Avis clients</h3>
          
          {/* Formulaire d'avis */}
          <div className="card-product space-y-4">
            <h4 className="font-semibold">Donnez votre avis</h4>
            
            <div>
              <Label>Note</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 cursor-pointer ${
                        star <= newReview.rating
                          ? "text-gold fill-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Votre commentaire</Label>
              <Textarea
                id="comment"
                placeholder="Partagez votre expérience avec ce produit..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>

            <Button onClick={handleSubmitReview}>
              <Send className="w-4 h-4 mr-2" />
              Publier mon avis
            </Button>
          </div>

          {/* Liste des avis */}
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div key={review.id} className="card-product">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{review.author}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-gold fill-gold"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
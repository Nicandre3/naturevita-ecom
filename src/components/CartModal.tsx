import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Mon Panier ({cartCount})</span>
            </DialogTitle>
          </DialogHeader>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
              <p className="text-muted-foreground mb-6">
                Découvrez nos produits naturels et ajoutez-les à votre panier
              </p>
              <Button onClick={onClose}>
                Continuer mes achats
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Articles du panier */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold">{item.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Contrôles quantité */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Prix total et suppression */}
                    <div className="text-right space-y-2">
                      <p className="font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé du panier */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Continuer mes achats
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1 btn-hero">
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)}
        onSuccess={() => {
          setShowCheckout(false);
          onClose();
        }}
      />
    </>
  );
};

export default CartModal;
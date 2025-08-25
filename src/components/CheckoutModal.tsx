import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, MapPin, User, Phone, Mail } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal = ({ isOpen, onClose, onSuccess }: CheckoutModalProps) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    quartier: "",
    paymentMethod: "orange"
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.nom || !formData.telephone || !formData.adresse) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulation de traitement de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous intégreriez avec Orange Money / Mobile Money via Supabase
      toast({
        title: "Commande confirmée !",
        description: `Votre commande de ${formatPrice(cartTotal)} a été passée avec succès. Vous recevrez un SMS de confirmation.`
      });
      
      clearCart();
      onSuccess();
      
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finaliser ma commande</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire de commande */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Informations personnelles */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Informations personnelles</span>
                </h3>
                
                <div>
                  <Label htmlFor="nom">Nom complet *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="+237 6XX XXX XXX"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (optionnel)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <Separator />

              {/* Adresse de livraison */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Adresse de livraison</span>
                </h3>
                
                <div>
                  <Label htmlFor="adresse">Adresse complète *</Label>
                  <Input
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    placeholder="Rue, avenue, immeuble..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="quartier">Quartier</Label>
                    <Input
                      id="quartier"
                      name="quartier"
                      value={formData.quartier}
                      onChange={handleInputChange}
                      placeholder="Quartier"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ville">Ville</Label>
                    <Input
                      id="ville"
                      name="ville"
                      value={formData.ville}
                      onChange={handleInputChange}
                      placeholder="Ville"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Mode de paiement */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Mode de paiement</span>
                </h3>
                
                <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange}>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="orange" id="orange" />
                    <Label htmlFor="orange" className="flex items-center space-x-2 cursor-pointer">
                      <Smartphone className="w-4 h-4 text-orange-500" />
                      <span>Orange Money</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex items-center space-x-2 cursor-pointer">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span>Mobile Money (MTN)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={isProcessing}
              >
                {isProcessing ? "Traitement en cours..." : `Payer ${formatPrice(cartTotal)}`}
              </Button>
            </form>
          </div>

          {/* Résumé de commande */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Résumé de votre commande</h3>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Qté: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison:</span>
                <span className="text-green-600">Gratuite</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Livraison gratuite !</h4>
              <p className="text-sm text-muted-foreground">
                Nous livrons gratuitement dans toute la ville. Délai de livraison : 24-48h.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
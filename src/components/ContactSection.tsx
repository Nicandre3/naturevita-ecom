import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+221 77 123 45 67",
      description: "Lun-Dim 8h-20h",
      action: "tel:+221771234567"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+221 77 123 45 67",
      description: "Chat en temps réel",
      action: "https://wa.me/221771234567"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@naturevita.sn",
      description: "Réponse sous 24h",
      action: "mailto:contact@naturevita.sn"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Dakar, Sénégal",
      description: "Livraison dans toute l'Afrique",
      action: null
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Contactez-nous
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une question sur nos produits ? Besoin de conseils personnalisés ? 
            Notre équipe est là pour vous accompagner dans votre démarche bien-être.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Parlons de votre bien-être
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nous sommes à votre écoute pour répondre à toutes vos questions et vous aider 
                à choisir les produits les mieux adaptés à vos besoins. N'hésitez pas à nous contacter !
              </p>
            </div>

            {/* Cartes de contact */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="card-product group cursor-pointer">
                    {info.action ? (
                      <a 
                        href={info.action}
                        target={info.action.startsWith('http') ? '_blank' : undefined}
                        rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-card-foreground">
                            {info.title}
                          </h4>
                          <p className="text-card-foreground font-medium">
                            {info.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-card-foreground">
                            {info.title}
                          </h4>
                          <p className="text-card-foreground font-medium">
                            {info.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Horaires */}
            <div className="card-product">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground">
                  Horaires d'ouverture
                </h4>
              </div>
              <div className="space-y-2 ml-16">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lundi - Vendredi</span>
                  <span className="text-card-foreground font-medium">8h00 - 20h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi</span>
                  <span className="text-card-foreground font-medium">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimanche</span>
                  <span className="text-card-foreground font-medium">10h00 - 16h00</span>
                </div>
              </div>
            </div>

            {/* Contact WhatsApp direct */}
            <div className="text-center">
              <Button 
                className="btn-hero w-full text-lg"
                onClick={() => window.open('https://wa.me/221771234567', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chatter sur WhatsApp
              </Button>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="card-product">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">
                Envoyez-nous un message
              </h3>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
              </p>
            </div>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <div className="flex items-center space-x-2 p-4 bg-primary/10 border border-primary/20 rounded-lg mb-6">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">
                  Message envoyé avec succès ! Nous vous répondrons bientôt.
                </span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-medium">
                  Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Nom complet *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+221 77 123 45 67"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Sujet
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Objet de votre message"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre demande en détail..."
                  rows={6}
                  required
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full btn-hero text-lg py-4"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Envoyer le message</span>
                  </div>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez que nous traitions vos données 
                conformément à notre politique de confidentialité.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h3>
          <p className="text-muted-foreground mb-8">
            Consultez notre section FAQ pour des réponses immédiates aux questions les plus courantes.
          </p>
          <Button variant="outline" className="hover-lift">
            Voir la FAQ complète
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
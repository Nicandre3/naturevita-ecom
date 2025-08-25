import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData = [
    {
      question: "Vos produits sont-ils 100% naturels ?",
      answer: "Oui, tous nos produits sont fabriqués à partir d'ingrédients 100% naturels et biologiques. Nous ne utilisons aucun produit chimique nocif ou conservateur artificiel."
    },
    {
      question: "Combien de temps faut-il pour voir les résultats ?",
      answer: "Les résultats varient selon les personnes et le produit utilisé. En général, vous pouvez commencer à voir des améliorations après 2-3 semaines d'utilisation régulière."
    },
    {
      question: "Comment utiliser les produits Jinja ?",
      answer: "Pour Jinja, mélangez une cuillère à café dans un verre d'eau tiède, de préférence le matin à jeun. Suivez les instructions sur l'emballage pour un dosage optimal."
    },
    {
      question: "Le savon IRU convient-il à tous les types de peau ?",
      answer: "Oui, le savon IRU est formulé pour convenir à tous les types de peau, y compris les peaux sensibles. Ses ingrédients naturels respectent l'équilibre de votre peau."
    },
    {
      question: "Où livrez-vous vos produits ?",
      answer: "Nous livrons partout en Côte d'Ivoire. La livraison est gratuite pour les commandes supérieures à 25 000 FCFA."
    },
    {
      question: "Puis-je retourner un produit si je ne suis pas satisfait ?",
      answer: "Oui, nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait, vous pouvez retourner le produit pour un remboursement complet."
    },
    {
      question: "Comment conserver les produits naturels ?",
      answer: "Conservez les produits dans un endroit frais et sec, à l'abri de la lumière directe du soleil. Fermez bien les contenants après utilisation."
    },
    {
      question: "Y a-t-il des effets secondaires ?",
      answer: "Nos produits naturels sont généralement bien tolérés. Cependant, nous recommandons de faire un test de patch avant la première utilisation et de consulter un professionnel de santé en cas de doute."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="section-padding bg-gradient-to-b from-background to-secondary/20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos produits naturels
            </p>
          </div>
        </div>
        
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="card-product border-none shadow-soft"
                >
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-12 text-center card-product">
              <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/+2250749586420" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-hero inline-flex items-center justify-center"
                >
                  WhatsApp Support
                </a>
                <a 
                  href="/contact"
                  className="btn-hero bg-secondary hover:bg-secondary/80 text-secondary-foreground inline-flex items-center justify-center"
                >
                  Formulaire de Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
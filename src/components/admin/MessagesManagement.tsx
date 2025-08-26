import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Filter, Eye, Reply, Trash2, MessageSquare, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: "nouveau" | "lu" | "repondu" | "archive";
  priority: "basse" | "normale" | "haute";
}

const mockMessages: Message[] = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+225 07 12 34 56 78",
    subject: "Question sur la livraison",
    message: "Bonjour, j'aimerais savoir quels sont vos délais de livraison pour Abidjan ? Merci !",
    date: "2024-01-15",
    status: "nouveau",
    priority: "normale"
  },
  {
    id: "2",
    name: "Jean Kouame",
    email: "jean.kouame@email.com",
    subject: "Problème avec ma commande",
    message: "Bonjour, j'ai passé une commande il y a 5 jours (CMD002) et je n'ai toujours pas reçu de nouvelles. Pouvez-vous m'aider ?",
    date: "2024-01-14",
    status: "lu",
    priority: "haute"
  },
  {
    id: "3",
    name: "Fatou Traore",
    email: "fatou.traore@email.com",
    phone: "+225 01 23 45 67 89",
    subject: "Demande de partenariat",
    message: "Bonjour, je représente une boutique bio à Bouaké et j'aimerais discuter d'un éventuel partenariat pour vendre vos produits.",
    date: "2024-01-13",
    status: "repondu",
    priority: "haute"
  },
  {
    id: "4",
    name: "Paul Diallo",
    email: "paul.diallo@email.com",
    subject: "Informations produit",
    message: "Bonjour, pourriez-vous me donner plus d'informations sur la composition de votre miel ? Je suis allergique à certains pollens.",
    date: "2024-01-12",
    status: "nouveau",
    priority: "normale"
  },
  {
    id: "5",
    name: "Aminata Cisse",
    email: "aminata.cisse@email.com",
    subject: "Félicitations !",
    message: "Bonjour, je voulais juste vous féliciter pour la qualité de vos produits. J'ai testé votre savon Iru et il est fantastique !",
    date: "2024-01-11",
    status: "lu",
    priority: "basse"
  }
];

export function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    const matchesPriority = filterPriority === "all" || message.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateMessageStatus = (id: string, status: Message["status"]) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status } : message
    ));
  };

  const markAsRead = (id: string) => {
    updateMessageStatus(id, "lu");
  };

  const sendReply = (messageId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une réponse",
        variant: "destructive"
      });
      return;
    }

    updateMessageStatus(messageId, "repondu");
    setReplyText("");
    setSelectedMessage(null);
    
    toast({
      title: "Réponse envoyée",
      description: "Votre réponse a été envoyée avec succès",
    });
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
    toast({
      title: "Message supprimé",
      description: "Le message a été supprimé avec succès",
    });
  };

  const getStatusBadge = (status: Message["status"]) => {
    const variants = {
      "nouveau": { variant: "default" as const, text: "Nouveau" },
      "lu": { variant: "secondary" as const, text: "Lu" },
      "repondu": { variant: "outline" as const, text: "Répondu" },
      "archive": { variant: "outline" as const, text: "Archivé" }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getPriorityBadge = (priority: Message["priority"]) => {
    switch (priority) {
      case "haute":
        return <Badge variant="destructive">Haute</Badge>;
      case "normale":
        return <Badge variant="secondary">Normale</Badge>;
      case "basse":
        return <Badge variant="outline">Basse</Badge>;
    }
  };

  // Statistiques
  const newMessages = messages.filter(m => m.status === "nouveau").length;
  const readMessages = messages.filter(m => m.status === "lu").length;
  const repliedMessages = messages.filter(m => m.status === "repondu").length;
  const highPriorityMessages = messages.filter(m => m.priority === "haute" && m.status !== "repondu").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Messages</h2>
        <p className="text-muted-foreground">Gérez les messages de vos clients</p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{newMessages}</div>
            <p className="text-xs text-muted-foreground">Non lus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lus</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{readMessages}</div>
            <p className="text-xs text-muted-foreground">En attente de réponse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Répondus</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{repliedMessages}</div>
            <p className="text-xs text-muted-foreground">Traités</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Priorité Haute</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityMessages}</div>
            <p className="text-xs text-muted-foreground">À traiter en urgence</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans les messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="nouveau">Nouveaux</SelectItem>
                <SelectItem value="lu">Lus</SelectItem>
                <SelectItem value="repondu">Répondus</SelectItem>
                <SelectItem value="archive">Archivés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48">
                <MessageSquare className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="haute">Haute</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="basse">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des messages */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
          <CardDescription>Tous les messages de contact</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expéditeur</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow 
                  key={message.id}
                  className={message.status === "nouveau" ? "bg-blue-50" : ""}
                >
                  <TableCell>
                    <div>
                      <p className={`font-medium ${message.status === "nouveau" ? "font-bold" : ""}`}>
                        {message.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {message.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className={`${message.status === "nouveau" ? "font-semibold" : ""}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(message.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell>
                    {new Date(message.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(message);
                              if (message.status === "nouveau") {
                                markAsRead(message.id);
                              }
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Message de {message.name}</DialogTitle>
                            <DialogDescription>
                              Reçu le {new Date(message.date).toLocaleDateString("fr-FR")}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold mb-2">Informations de contact</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Nom:</strong> {selectedMessage.name}</p>
                                  <p><strong>Email:</strong> {selectedMessage.email}</p>
                                  {selectedMessage.phone && (
                                    <p><strong>Téléphone:</strong> {selectedMessage.phone}</p>
                                  )}
                                  <p><strong>Priorité:</strong> {getPriorityBadge(selectedMessage.priority)}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Sujet</h4>
                                <p>{selectedMessage.subject}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Message</h4>
                                <div className="p-4 bg-muted rounded-lg">
                                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                              </div>

                              {selectedMessage.status !== "repondu" && (
                                <div>
                                  <h4 className="font-semibold mb-2">Réponse</h4>
                                  <Textarea
                                    placeholder="Tapez votre réponse ici..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                  />
                                  <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setReplyText("");
                                        setSelectedMessage(null);
                                      }}
                                    >
                                      Annuler
                                    </Button>
                                    <Button onClick={() => sendReply(selectedMessage.id)}>
                                      <Reply className="w-4 h-4 mr-2" />
                                      Envoyer la réponse
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer le message</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMessage(message.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
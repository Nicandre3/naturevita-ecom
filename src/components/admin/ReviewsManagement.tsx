import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Star, Check, X, Search, Filter, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  productName: string;
  customerName: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  status: "en_attente" | "approuve" | "rejete";
}

const mockReviews: Review[] = [
  {
    id: "1",
    productName: "Miel Pur Bio",
    customerName: "Marie Dubois",
    email: "marie.dubois@email.com",
    rating: 5,
    comment: "Excellent produit ! Le miel est délicieux et de très bonne qualité. Je recommande vivement.",
    date: "2024-01-15",
    status: "en_attente"
  },
  {
    id: "2",
    productName: "Savon Iru Traditionnel",
    customerName: "Jean Kouame",
    email: "jean.kouame@email.com",
    rating: 4,
    comment: "Très bon savon naturel. Ma peau est plus douce depuis que je l'utilise.",
    date: "2024-01-14",
    status: "approuve"
  },
  {
    id: "3",
    productName: "Huile Jinja Premium",
    customerName: "Fatou Traore",
    email: "fatou.traore@email.com",
    rating: 5,
    comment: "Produit exceptionnel ! L'huile a vraiment aidé à améliorer ma peau. Merci NatureVita !",
    date: "2024-01-13",
    status: "approuve"
  },
  {
    id: "4",
    productName: "Miel Pur Bio",
    customerName: "Paul Diallo",
    email: "paul.diallo@email.com",
    rating: 2,
    comment: "Le produit n'était pas conforme à mes attentes. Déçu de cet achat.",
    date: "2024-01-12",
    status: "en_attente"
  },
  {
    id: "5",
    productName: "Savon Iru Traditionnel",
    customerName: "Aminata Cisse",
    email: "aminata.cisse@email.com",
    rating: 5,
    comment: "Super savon ! Texture agréable et parfum naturel. Je rachèterai certainement.",
    date: "2024-01-11",
    status: "en_attente"
  }
];

export function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const { toast } = useToast();

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || review.status === filterStatus;
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const approveReview = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: "approuve" as const } : review
    ));
    toast({
      title: "Avis approuvé",
      description: "L'avis a été approuvé et sera visible publiquement",
    });
  };

  const rejectReview = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: "rejete" as const } : review
    ));
    toast({
      title: "Avis rejeté",
      description: "L'avis a été rejeté et ne sera pas affiché publiquement",
      variant: "destructive"
    });
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Avis supprimé",
      description: "L'avis a été supprimé définitivement",
    });
  };

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "approuve":
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>;
      case "rejete":
        return <Badge variant="destructive">Rejeté</Badge>;
      case "en_attente":
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const pendingCount = reviews.filter(r => r.status === "en_attente").length;
  const approvedCount = reviews.filter(r => r.status === "approuve").length;
  const rejectedCount = reviews.filter(r => r.status === "rejete").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Avis</h2>
        <p className="text-muted-foreground">Modérez et gérez les avis clients</p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Avis à modérer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Avis publiés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Avis refusés</p>
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
                  placeholder="Rechercher dans les avis..."
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
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="approuve">Approuvés</SelectItem>
                <SelectItem value="rejete">Rejetés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-48">
                <Star className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Note" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les notes</SelectItem>
                <SelectItem value="5">5 étoiles</SelectItem>
                <SelectItem value="4">4 étoiles</SelectItem>
                <SelectItem value="3">3 étoiles</SelectItem>
                <SelectItem value="2">2 étoiles</SelectItem>
                <SelectItem value="1">1 étoile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des avis */}
      <Card>
        <CardHeader>
          <CardTitle>Avis Clients ({filteredReviews.length})</CardTitle>
          <CardDescription>Gérez les avis laissés par vos clients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      <p className="text-sm text-muted-foreground">{review.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.productName}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm">({review.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2 text-sm">{review.comment}</p>
                  </TableCell>
                  <TableCell>
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(review.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {review.status === "en_attente" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => approveReview(review.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rejectReview(review.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <X className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l'avis</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteReview(review.id)}
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
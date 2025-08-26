import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Eye, Package, Truck, CheckCircle, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "en_attente" | "confirmee" | "en_preparation" | "expediee" | "livree" | "annulee";
  paymentMethod: string;
  paymentStatus: "en_attente" | "paye" | "echec";
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "CMD001",
    customerName: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+225 07 12 34 56 78",
    address: "Cocody, Abidjan",
    items: [
      { productName: "Miel Pur Bio", quantity: 2, price: 25000 },
      { productName: "Savon Iru", quantity: 1, price: 8000 }
    ],
    total: 58000,
    status: "livree",
    paymentMethod: "Orange Money",
    paymentStatus: "paye",
    date: "2024-01-15"
  },
  {
    id: "CMD002",
    customerName: "Jean Kouame",
    email: "jean.kouame@email.com",
    phone: "+225 05 98 76 54 32",
    address: "Plateau, Abidjan",
    items: [
      { productName: "Huile Jinja Premium", quantity: 1, price: 15000 }
    ],
    total: 15000,
    status: "en_preparation",
    paymentMethod: "Wave",
    paymentStatus: "paye",
    date: "2024-01-14"
  },
  {
    id: "CMD003",
    customerName: "Fatou Traore",
    email: "fatou.traore@email.com",
    phone: "+225 01 23 45 67 89",
    address: "Treichville, Abidjan",
    items: [
      { productName: "Pack Découverte", quantity: 1, price: 45000 }
    ],
    total: 45000,
    status: "confirmee",
    paymentMethod: "MTN Money",
    paymentStatus: "paye",
    date: "2024-01-13"
  },
  {
    id: "CMD004",
    customerName: "Paul Diallo",
    email: "paul.diallo@email.com",
    phone: "+225 02 87 65 43 21",
    address: "Yopougon, Abidjan",
    items: [
      { productName: "Miel Pur Bio", quantity: 1, price: 25000 },
      { productName: "Savon Iru", quantity: 3, price: 8000 }
    ],
    total: 49000,
    status: "en_attente",
    paymentMethod: "Orange Money",
    paymentStatus: "en_attente",
    date: "2024-01-12"
  }
];

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} a été mise à jour`,
    });
  };

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      "en_attente": { variant: "secondary" as const, icon: Clock, text: "En attente" },
      "confirmee": { variant: "default" as const, icon: CheckCircle, text: "Confirmée" },
      "en_preparation": { variant: "secondary" as const, icon: Package, text: "En préparation" },
      "expediee": { variant: "default" as const, icon: Truck, text: "Expédiée" },
      "livree": { variant: "default" as const, icon: CheckCircle, text: "Livrée" },
      "annulee": { variant: "destructive" as const, icon: Clock, text: "Annulée" }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paye":
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>;
      case "en_attente":
        return <Badge variant="secondary">En attente</Badge>;
      case "echec":
        return <Badge variant="destructive">Échec</Badge>;
    }
  };

  // Statistiques
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "en_attente").length;
  const completedOrders = orders.filter(o => o.status === "livree").length;
  const totalRevenue = orders
    .filter(o => o.paymentStatus === "paye")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h2>
        <p className="text-muted-foreground">Suivez et gérez toutes vos commandes</p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Toutes les commandes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} FCFA</div>
            <p className="text-xs text-muted-foreground">Total encaissé</p>
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
                  placeholder="Rechercher une commande..."
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
                <SelectItem value="confirmee">Confirmées</SelectItem>
                <SelectItem value="en_preparation">En préparation</SelectItem>
                <SelectItem value="expediee">Expédiées</SelectItem>
                <SelectItem value="livree">Livrées</SelectItem>
                <SelectItem value="annulee">Annulées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des commandes */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes ({filteredOrders.length})</CardTitle>
          <CardDescription>Liste de toutes vos commandes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} article(s)
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.total.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline">{order.paymentMethod}</Badge>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en_attente">En attente</SelectItem>
                        <SelectItem value="confirmee">Confirmée</SelectItem>
                        <SelectItem value="en_preparation">En préparation</SelectItem>
                        <SelectItem value="expediee">Expédiée</SelectItem>
                        <SelectItem value="livree">Livrée</SelectItem>
                        <SelectItem value="annulee">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de la commande {order.id}</DialogTitle>
                          <DialogDescription>
                            Informations complètes de la commande
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Informations client */}
                            <div>
                              <h4 className="font-semibold mb-2">Informations Client</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Nom:</strong> {selectedOrder.customerName}</p>
                                <p><strong>Email:</strong> {selectedOrder.email}</p>
                                <p><strong>Téléphone:</strong> {selectedOrder.phone}</p>
                                <p><strong>Adresse:</strong> {selectedOrder.address}</p>
                              </div>
                            </div>

                            {/* Articles commandés */}
                            <div>
                              <h4 className="font-semibold mb-2">Articles Commandés</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                                    <div>
                                      <p className="font-medium">{item.productName}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Quantité: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium">
                                      {(item.price * item.quantity).toLocaleString()} FCFA
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between items-center font-semibold text-lg">
                                  <span>Total:</span>
                                  <span>{selectedOrder.total.toLocaleString()} FCFA</span>
                                </div>
                              </div>
                            </div>

                            {/* Informations paiement */}
                            <div>
                              <h4 className="font-semibold mb-2">Paiement</h4>
                              <div className="space-y-1 text-sm">
                                <p><strong>Méthode:</strong> {selectedOrder.paymentMethod}</p>
                                <p><strong>Statut:</strong> {getPaymentStatusBadge(selectedOrder.paymentStatus)}</p>
                                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString("fr-FR")}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
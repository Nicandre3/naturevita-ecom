import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Star,
  MessageSquare
} from "lucide-react";

const salesData = [
  { month: "Jan", ventes: 45000, commandes: 150 },
  { month: "Fév", ventes: 52000, commandes: 180 },
  { month: "Mar", ventes: 48000, commandes: 165 },
  { month: "Avr", ventes: 61000, commandes: 220 },
  { month: "Mai", ventes: 55000, commandes: 195 },
  { month: "Juin", ventes: 67000, commandes: 240 },
];

const productData = [
  { name: "Miel Pur Bio", value: 35, color: "#16a34a" },
  { name: "Savon Iru", value: 28, color: "#eab308" },
  { name: "Huile Jinja", value: 22, color: "#dc2626" },
  { name: "Autres", value: 15, color: "#6b7280" },
];

const recentOrders = [
  { id: "#CMD001", client: "Marie Dubois", produit: "Miel Pur Bio", montant: 25000, statut: "Livré" },
  { id: "#CMD002", client: "Jean Kouame", produit: "Savon Iru", montant: 8000, statut: "En cours" },
  { id: "#CMD003", client: "Fatou Traore", produit: "Huile Jinja", montant: 15000, statut: "Préparation" },
  { id: "#CMD004", client: "Paul Diallo", produit: "Pack Découverte", montant: 45000, statut: "Livré" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328,000 FCFA</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-emerald-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              {" "}depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">240</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-emerald-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              {" "}depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3.1%
              </span>
              {" "}depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-emerald-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3%
              </span>
              {" "}depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ventes</CardTitle>
            <CardDescription>Revenus mensuels en FCFA</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} FCFA`, "Ventes"]} />
                <Line 
                  type="monotone" 
                  dataKey="ventes" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Produits</CardTitle>
            <CardDescription>Ventes par catégorie de produits</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Commandes récentes et Alertes */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commandes Récentes</CardTitle>
            <CardDescription>Les dernières commandes passées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.client}</p>
                    <p className="text-xs">{order.produit}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{order.montant.toLocaleString()} FCFA</p>
                    <Badge 
                      variant={
                        order.statut === "Livré" ? "default" : 
                        order.statut === "En cours" ? "secondary" : 
                        "outline"
                      }
                    >
                      {order.statut}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes et Notifications</CardTitle>
            <CardDescription>Informations importantes à surveiller</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Stock Faible</span>
                </div>
                <p className="text-xs text-red-800">3 produits ont un stock inférieur à 10 unités</p>
              </div>

              <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Nouveaux Avis</span>
                </div>
                <p className="text-xs text-yellow-800">5 nouveaux avis clients à modérer</p>
              </div>

              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Messages</span>
                </div>
                <p className="text-xs text-blue-800">8 nouveaux messages de contact</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Objectif Mensuel</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  240 000 FCFA restant pour atteindre l'objectif
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
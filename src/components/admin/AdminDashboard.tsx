import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
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
  MessageSquare,
  RefreshCw,
  Loader2
} from "lucide-react";
import { apiService, DashboardStats, Order, Product } from '@/services/api';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardStats, orders, products] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getOrders(),
        apiService.getProducts()
      ]);

      setStats(dashboardStats);
      // Prendre les 5 dernières commandes
      setRecentOrders(orders.slice(0, 5));
      // Filtrer les produits en rupture de stock
      setLowStockProducts(products.filter(p => p.stock < 10));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du dashboard",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'destructive',
      processing: 'default',
      shipped: 'secondary',
      delivered: 'default'
    };
    
    const labels = {
      pending: 'En attente',
      processing: 'En cours',
      shipped: 'Expédié',
      delivered: 'Livré'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement du dashboard...</span>
      </div>
    );
  }

  if (!stats) {
    return <div>Erreur lors du chargement des données</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <Button variant="outline" className="gap-2" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
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
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
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
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                {stats.lowStockCount} en rupture
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
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
            <CardTitle>Évolution des Revenus</CardTitle>
            <CardDescription>Revenus mensuels en FCFA</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} FCFA`, "Revenus"]} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
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
            <CardTitle>Top Produits</CardTitle>
            <CardDescription>Meilleures ventes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" />
              </BarChart>
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
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                    <p className="text-xs">{order.products?.length || 0} article(s)</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{order.total.toLocaleString()} FCFA</p>
                    {getStatusBadge(order.status)}
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
              {stats.lowStockCount > 0 && (
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">Stock Faible</span>
                  </div>
                  <p className="text-xs text-red-800">{stats.lowStockCount} produits ont un stock faible</p>
                </div>
              )}

              {stats.pendingOrders > 0 && (
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Commandes en attente</span>
                  </div>
                  <p className="text-xs text-yellow-800">{stats.pendingOrders} commandes à traiter</p>
                </div>
              )}

              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Messages</span>
                </div>
                <p className="text-xs text-blue-800">Vérifiez les nouveaux messages de contact</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Objectif Mensuel</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Progression vers l'objectif mensuel
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
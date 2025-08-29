import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  MessageSquare, 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Reply,
  Trash2,
  Loader2,
  Send
} from 'lucide-react';
import { apiService, Message } from '@/services/api';

const MessagesManagement = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await apiService.getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Données simulées pour le développement
  const mockMessages = [
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie@example.com',
      subject: 'Question sur vos produits',
      message: 'Bonjour, je souhaiterais avoir des informations sur vos miels...',
      status: 'unread' as const,
      createdAt: new Date().toISOString()
    }
  ];

  const displayMessages = messages.length > 0 ? messages : mockMessages;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des messages...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Messages</h2>
        <p className="text-muted-foreground">Gérez les messages de contact des clients</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages ({displayMessages.length})</CardTitle>
          <CardDescription>Liste de tous les messages de contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayMessages.map((message) => (
              <div key={message.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{message.name}</h4>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    <p className="font-medium mt-1">{message.subject}</p>
                    <p className="text-sm mt-2">{message.message}</p>
                  </div>
                  <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
                    {message.status === 'unread' ? 'Non lu' : 'Lu'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesManagement;
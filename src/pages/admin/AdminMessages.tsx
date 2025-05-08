
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2, Mail, Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock message data
const messageData = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Website Design Inquiry',
    message: 'Hi Ahmed, I was wondering if you are available for a website design project...',
    date: '2025-04-22',
    read: true
  },
  {
    id: 2,
    sender: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    subject: 'Speaking Opportunity',
    message: 'Hello, I would like to invite you to speak at our upcoming tech conference...',
    date: '2025-04-20',
    read: false
  },
  {
    id: 3,
    sender: 'Mohammad Al-Farsi',
    email: 'malfarsi@example.com',
    subject: 'Collaboration Proposal',
    message: 'Dear Ahmed, I have been following your work and would like to propose a collaboration...',
    date: '2025-04-18',
    read: false
  },
  {
    id: 4,
    sender: 'Laura Chen',
    email: 'laura.chen@example.com',
    subject: 'Consultation Request',
    message: 'Hello Ahmed, I am looking for a consultation on a digital transformation project...',
    date: '2025-04-15',
    read: true
  },
  {
    id: 5,
    sender: 'Carlos Rodriguez',
    email: 'carlos.r@example.com',
    subject: 'Job Opportunity',
    message: 'Dear Mr. Jamal, I am writing to you about a senior position at our company...',
    date: '2025-04-12',
    read: true
  }
];

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState(messageData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredMessages = searchQuery 
    ? messages.filter(message => 
        message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const unreadCount = messages.filter(message => !message.read).length;

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
    
    setSelectedMessage(id);
    
    toast({
      title: "Message Viewed",
      description: "Message marked as read.",
    });
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
    
    if (selectedMessage === id) {
      setSelectedMessage(null);
    }
    
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleReply = (email: string) => {
    toast({
      title: "Composing Reply",
      description: `Preparing email reply to: ${email}`,
    });
  };

  return (
    <AdminLayout title="Messages">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="md:col-span-1">
          <ScrollReveal>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Inbox</CardTitle>
                  {unreadCount > 0 && (
                    <Badge>{unreadCount} unread</Badge>
                  )}
                </div>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {filteredMessages.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No messages found</p>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedMessage === message.id 
                            ? 'bg-primary/10 border-primary/20' 
                            : 'hover:bg-secondary'
                        } ${!message.read ? 'border-l-4 border-l-primary' : ''}`}
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!message.read ? 'text-primary' : ''}`}>
                            {message.sender}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(message.date)}
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1 truncate">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{message.email}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Message View */}
        <div className="md:col-span-2">
          <ScrollReveal>
            <Card>
              <CardContent className="p-6">
                {selectedMessage ? (
                  (() => {
                    const message = messages.find(m => m.id === selectedMessage);
                    if (!message) return <p>Message not found</p>;
                    
                    return (
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold">{message.subject}</h2>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-medium">{message.sender}</span>
                              <span className="text-muted-foreground">&lt;{message.email}&gt;</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Received on {formatDate(message.date)}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleReply(message.email)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(message.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border-t pt-6">
                          <p className="whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select a message to view</h3>
                    <p className="text-muted-foreground mt-1">
                      Choose a message from the list to view its contents
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;

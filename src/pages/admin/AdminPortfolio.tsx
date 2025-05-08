
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Link, Image, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'E-Commerce Website Redesign',
    category: 'Web Design',
    client: 'Fashion Store',
    completionDate: '2025-03-15',
    featured: true,
    imagesCount: 6,
    status: 'completed',
    url: 'https://example.com/project1'
  },
  {
    id: 2,
    title: 'Mobile Banking App UI',
    category: 'Mobile App',
    client: 'Finance Bank',
    completionDate: '2025-02-10',
    featured: true,
    imagesCount: 8,
    status: 'completed',
    url: 'https://example.com/project2'
  },
  {
    id: 3,
    title: 'Corporate Brand Identity',
    category: 'Branding',
    client: 'Tech Solutions Inc',
    completionDate: '2025-01-20',
    featured: false,
    imagesCount: 5,
    status: 'completed',
    url: null
  },
  {
    id: 4,
    title: 'Educational Platform Design',
    category: 'Web Design',
    client: 'Online Academy',
    completionDate: '2024-12-05',
    featured: false,
    imagesCount: 4,
    status: 'completed',
    url: 'https://example.com/project4'
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    category: 'Web Application',
    client: 'Marketing Agency',
    completionDate: null,
    featured: false,
    imagesCount: 2,
    status: 'in-progress',
    url: null
  }
];

const AdminPortfolio: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'In Progress';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredItems = searchQuery 
    ? portfolioItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : portfolioItems;

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Portfolio Item",
      description: `Editing portfolio item with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Portfolio Item",
      description: `Deleting portfolio item with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Portfolio Item",
      description: `Viewing portfolio item with ID: ${id}`,
    });
  };

  const handleManageImages = (id: number) => {
    toast({
      title: "Manage Images",
      description: `Managing images for portfolio item with ID: ${id}`,
    });
  };

  return (
    <AdminLayout title="Portfolio Management">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search portfolio items..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Portfolio Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <ScrollReveal>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-3xl font-bold">{portfolioItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured Items</p>
                  <p className="text-3xl font-bold">
                    {portfolioItems.filter(item => item.featured).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-3xl font-bold">
                    {new Set(portfolioItems.map(item => item.category)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Portfolio Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.title}
                      {item.featured && (
                        <Badge variant="default" className="ml-2">Featured</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{formatDate(item.completionDate)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === 'completed' ? 'default' : 'outline'}
                        className={item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                      >
                        {item.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(item.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleManageImages(item.id)}>
                          <Image className="h-4 w-4" />
                          <span className="sr-only">Images</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ScrollReveal>
    </AdminLayout>
  );
};

export default AdminPortfolio;

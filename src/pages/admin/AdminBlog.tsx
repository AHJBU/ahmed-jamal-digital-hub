
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeaturedPostsManager from '@/components/admin/FeaturedPostsManager';
import WordPressImporter from '@/components/admin/WordPressImporter';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Design Trends for 2025',
    category: 'Design',
    author: 'Ahmed Jamal',
    status: 'published',
    publishDate: '2025-04-20',
    views: 452
  },
  {
    id: 2,
    title: 'Introduction to React Hooks',
    category: 'Development',
    author: 'Ahmed Jamal',
    status: 'published',
    publishDate: '2025-04-15',
    views: 321
  },
  {
    id: 3,
    title: 'Mastering Social Media Marketing',
    category: 'Marketing',
    author: 'Ahmed Jamal',
    status: 'published',
    publishDate: '2025-04-10',
    views: 287
  },
  {
    id: 4,
    title: 'The Future of Mobile App Design',
    category: 'Design',
    author: 'Ahmed Jamal',
    status: 'draft',
    publishDate: 'N/A',
    views: 0
  },
  {
    id: 5,
    title: 'Building Accessible Websites',
    category: 'Development',
    author: 'Ahmed Jamal',
    status: 'scheduled',
    publishDate: '2025-04-25',
    views: 0
  }
];

const AdminBlog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;
  
  const formatDate = (dateString: string) => {
    return dateString === 'N/A' ? 'N/A' : new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'outline';
    }
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Blog Post",
      description: `Editing blog post with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Blog Post",
      description: `Deleting blog post with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Blog Post",
      description: `Viewing blog post with ID: ${id}`,
    });
  };

  return (
    <AdminLayout title="Blog Posts">
      <Tabs defaultValue="posts">
        <ScrollReveal>
          <div className="mb-6 flex justify-between">
            <TabsList>
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="featured">Featured Posts</TabsTrigger>
              <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            </TabsList>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </div>
        </ScrollReveal>
        
        <TabsContent value="posts">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search blog posts..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Published Posts</p>
                      <p className="text-3xl font-bold">
                        {blogPosts.filter(post => post.status === 'published').length}
                      </p>
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
                      <p className="text-sm text-muted-foreground">Draft Posts</p>
                      <p className="text-3xl font-bold">
                        {blogPosts.filter(post => post.status === 'draft').length}
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
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-3xl font-bold">
                        {blogPosts.reduce((sum, post) => sum + post.views, 0)}
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
                <CardTitle>Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Publish Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {post.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={post.status === 'published' ? 'default' : 'outline'}
                            className={getStatusColor(post.status)}
                          >
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(post.publishDate)}</TableCell>
                        <TableCell>{post.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleView(post.id)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(post.id)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
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
        </TabsContent>
        
        <TabsContent value="featured">
          <FeaturedPostsManager />
        </TabsContent>
        
        <TabsContent value="wordpress">
          <WordPressImporter />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminBlog;

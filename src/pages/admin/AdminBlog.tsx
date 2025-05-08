
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Eye, Save, FileEdit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeaturedPostsManager from '@/components/admin/FeaturedPostsManager';
import WordPressImportExport from '@/components/admin/WordPressImportExport';
import EnhancedBlogPostEditor, { BlogPostData } from '@/components/admin/EnhancedBlogPostEditor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Design Trends for 2025',
    category: 'Design',
    author: {
      id: '1',
      name: 'Ahmed Jamal',
      avatar: '/placeholder.svg',
      bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
      socialMedia: {}
    },
    status: 'published',
    publishDate: '2025-04-20',
    views: 452,
    content: 'Design trends article content goes here...',
    excerpt: 'An overview of emerging design trends for 2025',
    featuredImage: '/placeholder.svg',
    backgroundType: 'image',
    tags: ['design', 'trends', '2025'],
    featured: true,
    allowComments: true,
    language: 'en'
  },
  {
    id: '2',
    title: 'Introduction to React Hooks',
    category: 'Development',
    author: {
      id: '1',
      name: 'Ahmed Jamal',
      avatar: '/placeholder.svg',
      bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
      socialMedia: {}
    },
    status: 'published',
    publishDate: '2025-04-15',
    views: 321,
    content: 'React hooks tutorial content goes here...',
    excerpt: 'Learn how to use React Hooks in your applications',
    featuredImage: '/placeholder.svg',
    backgroundType: 'image',
    tags: ['react', 'hooks', 'javascript'],
    featured: false,
    allowComments: true,
    language: 'en'
  },
  {
    id: '3',
    title: 'Mastering Social Media Marketing',
    category: 'Marketing',
    author: {
      id: '1',
      name: 'Ahmed Jamal',
      avatar: '/placeholder.svg',
      bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
      socialMedia: {}
    },
    status: 'published',
    publishDate: '2025-04-10',
    views: 287,
    content: 'Social media marketing content goes here...',
    excerpt: 'Strategies for effective social media marketing',
    featuredImage: '/placeholder.svg',
    backgroundType: 'image',
    tags: ['marketing', 'social media'],
    featured: false,
    allowComments: true,
    language: 'en'
  },
  {
    id: '4',
    title: 'The Future of Mobile App Design',
    category: 'Design',
    author: {
      id: '1',
      name: 'Ahmed Jamal',
      avatar: '/placeholder.svg',
      bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
      socialMedia: {}
    },
    status: 'draft',
    publishDate: 'N/A',
    views: 0,
    content: 'Mobile app design article content goes here...',
    excerpt: 'Exploring future trends in mobile app design',
    featuredImage: '/placeholder.svg',
    backgroundType: 'image',
    tags: ['mobile', 'app', 'design'],
    featured: false,
    allowComments: true,
    language: 'en'
  },
  {
    id: '5',
    title: 'Building Accessible Websites',
    category: 'Development',
    author: {
      id: '1',
      name: 'Ahmed Jamal',
      avatar: '/placeholder.svg',
      bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
      socialMedia: {}
    },
    status: 'scheduled',
    publishDate: '2025-04-25',
    views: 0,
    content: 'Accessibility article content goes here...',
    excerpt: 'Best practices for creating accessible websites',
    featuredImage: '/placeholder.svg',
    backgroundType: 'image',
    tags: ['accessibility', 'web development'],
    featured: false,
    allowComments: true,
    language: 'en'
  }
];

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPostData | null>(null);
  const [posts, setPosts] = useState(blogPosts);
  const [draftPosts, setDraftPosts] = useState<BlogPostData[]>([]);
  
  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = localStorage.getItem('blog-drafts');
    if (savedDrafts) {
      try {
        setDraftPosts(JSON.parse(savedDrafts));
      } catch (error) {
        console.error("Error loading drafts:", error);
      }
    }
  }, []);
  
  const filteredPosts = searchQuery 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;
  
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
      case 'private':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'outline';
    }
  };

  const handleEdit = (id: string) => {
    // Find the post to edit
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setCurrentPost(postToEdit);
      setIsEditorOpen(true);
    } else {
      toast({
        title: "Edit Blog Post",
        description: `Post with ID ${id} not found`,
        variant: "destructive",
      });
    }
  };

  const handleEditInPage = (id: string) => {
    // Navigate to a dedicated editor page
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Blog Post",
      description: `Deleting blog post with ID: ${id}`,
      variant: "destructive",
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleView = (id: string) => {
    toast({
      title: "View Blog Post",
      description: `Viewing blog post with ID: ${id}`,
    });
    // In a real app, navigate to the blog post page
    // navigate(`/blog/${id}`);
  };

  const handleNewPost = () => {
    setCurrentPost(null); // Clear current post for a new one
    setIsEditorOpen(true);
  };

  const handleNewPostInPage = () => {
    // Navigate to a dedicated editor page for a new post
    navigate("/admin/blog/new");
  };

  const handleSavePost = (postData: BlogPostData) => {
    if (postData.id) {
      // Update existing post
      setPosts(posts.map(post => post.id === postData.id ? postData : post));
      toast({
        title: "Post Updated",
        description: `Blog post "${postData.title}" has been updated.`,
      });
    } else {
      // Add new post with generated ID
      const newPost = { 
        ...postData, 
        id: Date.now().toString() 
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Post Created",
        description: `Blog post "${postData.title}" has been created.`,
      });
    }
    setIsEditorOpen(false);
  };

  const handleAutosave = (postData: BlogPostData) => {
    // Handle autosave - store in drafts
    const existingDraftIndex = draftPosts.findIndex(draft => draft.id === postData.id);
    
    if (existingDraftIndex >= 0) {
      // Update existing draft
      const updatedDrafts = [...draftPosts];
      updatedDrafts[existingDraftIndex] = postData;
      setDraftPosts(updatedDrafts);
    } else {
      // Add new draft
      const newDraft = {
        ...postData,
        id: postData.id || `draft-${Date.now()}`,
      };
      setDraftPosts([newDraft, ...draftPosts]);
    }
    
    // Save drafts to localStorage
    localStorage.setItem('blog-drafts', JSON.stringify(draftPosts));
    console.log("Post autosaved", postData.title);
  };

  return (
    <AdminLayout title="Blog Posts">
      <Tabs defaultValue="posts">
        <ScrollReveal>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <TabsList>
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="featured">Featured Posts</TabsTrigger>
              <TabsTrigger value="wordpress">WordPress</TabsTrigger>
              <TabsTrigger value="rss">RSS & Social</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleNewPostInPage}>
                <FileEdit className="mr-2 h-4 w-4" />
                New Post (Page)
              </Button>
              <Button onClick={handleNewPost}>
                <Plus className="mr-2 h-4 w-4" />
                Quick Post
              </Button>
            </div>
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
                        {posts.filter(post => post.status === 'published').length}
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
                        {posts.filter(post => post.status === 'draft').length + draftPosts.length}
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
                        {posts.reduce((sum, post) => sum + (post.views || 0), 0)}
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
                        <TableCell>{formatDate(post.publishDate.toString())}</TableCell>
                        <TableCell>{post.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleView(post.id || '')}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(post.id || '')}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditInPage(post.id || '')}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit in Page</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id || '')}>
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
        
        <TabsContent value="drafts">
          <ScrollReveal>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Autosaved Drafts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {draftPosts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No autosaved drafts found.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {draftPosts.map((draft) => (
                        <TableRow key={draft.id}>
                          <TableCell className="font-medium">
                            {draft.title || 'Untitled Draft'}
                          </TableCell>
                          <TableCell>
                            {draft.lastModified 
                              ? formatDate(new Date(draft.lastModified).toString())
                              : 'Unknown date'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setCurrentPost(draft);
                                  setIsEditorOpen(true);
                                }}
                              >
                                Continue Editing
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => {
                                  setDraftPosts(draftPosts.filter(p => p.id !== draft.id));
                                  localStorage.setItem('blog-drafts', JSON.stringify(
                                    draftPosts.filter(p => p.id !== draft.id)
                                  ));
                                  toast({
                                    title: "Draft Deleted",
                                    description: "The draft has been removed.",
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </TabsContent>
        
        <TabsContent value="featured">
          <FeaturedPostsManager />
        </TabsContent>
        
        <TabsContent value="wordpress">
          <WordPressImportExport />
        </TabsContent>
        
        <TabsContent value="rss">
          <ScrollReveal>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>RSS Feed Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rss-url">RSS Feed URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="rss-url"
                        readOnly
                        value="https://yourdomain.com/feed.xml"
                      />
                      <Button variant="outline">Copy</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Share this URL with your readers to subscribe to your blog
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="rss-enable" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="rss-enable">Enable RSS Feed</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rss-items">Items Per Feed</Label>
                    <Input
                      id="rss-items"
                      type="number"
                      defaultValue={20}
                      min={1}
                      max={100}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rss-description">Feed Description</Label>
                    <Textarea
                      id="rss-description"
                      defaultValue="Latest posts from Ahmed Jamal's blog"
                    />
                  </div>
                  
                  <Button>Update RSS Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Auto-Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Connect your social media accounts to automatically publish new blog posts
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Twitter / X</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Zapier Integration</h3>
                    <div className="space-y-2">
                      <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                      <Input
                        id="zapier-webhook"
                        placeholder="Paste your Zapier webhook URL here"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Use Zapier to connect your blog to 3000+ apps
                    </p>
                    <Button className="mt-4">Save Zapier Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </TabsContent>
      </Tabs>

      {/* Blog Post Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentPost ? `Edit: ${currentPost.title}` : 'Create New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for your blog post. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <EnhancedBlogPostEditor 
              post={currentPost || undefined} 
              onSave={handleSavePost} 
              onAutoSave={handleAutosave}
            />
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlog;

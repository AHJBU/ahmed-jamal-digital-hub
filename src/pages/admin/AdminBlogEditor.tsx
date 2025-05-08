
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import EnhancedBlogPostEditor, { BlogPostData } from '@/components/admin/EnhancedBlogPostEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock blog posts - in a real app, you'd fetch this from an API
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
  }
];

const defaultPost: BlogPostData = {
  title: '',
  content: '',
  excerpt: '',
  featuredImage: '',
  backgroundType: 'image',
  category: 'Technology',
  tags: [],
  status: 'draft',
  publishDate: new Date(),
  author: {
    id: '1',
    name: 'Ahmed Jamal',
    avatar: '/placeholder.svg',
    bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
    socialMedia: {}
  },
  views: 0,
  featured: false,
  allowComments: true,
  language: 'en',
};

const AdminBlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // If this is a new post
    if (!id || id === 'new') {
      setPost(defaultPost);
      setLoading(false);
      return;
    }

    // Find the post with the given ID
    const foundPost = blogPosts.find(p => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
    } else {
      setError(`Post with ID ${id} not found`);
    }
    
    setLoading(false);
  }, [id]);

  const handleSave = async (postData: BlogPostData) => {
    setSaving(true);
    try {
      // In a real app, send a request to the backend
      console.log("Saving post:", postData);
      
      // Simulate a save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Post Saved",
        description: `Blog post "${postData.title}" has been saved successfully.`,
      });
      
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAutosave = (postData: BlogPostData) => {
    // Store in localStorage for recovery
    try {
      localStorage.setItem(`blog-autosave-${id || 'new'}`, JSON.stringify(postData));
      console.log("Post autosaved:", postData.title);
    } catch (error) {
      console.error("Error autosaving post:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Loading Blog Post...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Error">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => navigate("/admin/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog Posts
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={id === 'new' ? "Create New Blog Post" : `Edit: ${post?.title || ''}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/blog")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog Posts
          </Button>
          
          <Button 
            disabled={saving} 
            onClick={() => document.getElementById('save-blog-form')?.click()}
          >
            {saving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Post
              </>
            )}
          </Button>
        </div>
        
        {post && (
          <div className="border rounded-lg p-6 bg-card space-y-6">
            <EnhancedBlogPostEditor 
              post={post} 
              onSave={handleSave} 
              onAutoSave={handleAutosave}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;


import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Save, Clock, Video, Image as ImageIcon, Users, Share, Star, Languages, Loader2 } from 'lucide-react';
import EnhancedFileUpload from './EnhancedFileUpload';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Types for the blog post data
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogPostData {
  id?: string;
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  backgroundVideo?: string;
  backgroundType: 'image' | 'video' | 'gif' | 'color';
  backgroundColor?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled' | 'private';
  publishDate: Date | string;
  lastModified?: Date | string;
  author: Author;
  views: number;
  featured: boolean;
  allowComments: boolean;
  socialShareImage?: string;
  ttsEnabled?: boolean;
  aiSummary?: string;
  language: string;
}

// Sample authors data
const sampleAuthors: Author[] = [
  {
    id: '1',
    name: 'Ahmed Jamal',
    avatar: '/placeholder.svg',
    bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
    socialMedia: {
      twitter: 'https://twitter.com/ahmedjamal',
      facebook: 'https://facebook.com/ahmedjamal',
      linkedin: 'https://linkedin.com/in/ahmedjamal',
    }
  },
  {
    id: '2',
    name: 'Noor Ahmed',
    avatar: '/placeholder.svg',
    bio: 'Content creator and digital marketing specialist.',
    socialMedia: {
      instagram: 'https://instagram.com/noorahmed',
      linkedin: 'https://linkedin.com/in/noorahmed',
    }
  }
];

// Sample categories
const categories = [
  'Design',
  'Development',
  'Marketing',
  'Business',
  'Technology',
  'Lifestyle',
  'Education',
  'Other'
];

// Form schema
const blogPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  excerpt: z.string().min(1, { message: "Excerpt is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  featuredImage: z.string().optional(),
  backgroundVideo: z.string().optional(),
  backgroundType: z.enum(['image', 'video', 'gif', 'color']),
  backgroundColor: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'private']),
  publishDate: z.any(), // Set to any for handling Date objects
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
    bio: z.string(),
    socialMedia: z.object({
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
    }).optional()
  }),
  views: z.number().int().min(0),
  featured: z.boolean(),
  allowComments: z.boolean(),
  socialShareImage: z.string().optional(),
  ttsEnabled: z.boolean().optional(),
  aiSummary: z.string().optional(),
  language: z.string(),
});

interface EnhancedBlogPostEditorProps {
  post?: BlogPostData;
  onSave: (postData: BlogPostData) => void;
  onAutoSave?: (postData: BlogPostData) => void;
}

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
  author: sampleAuthors[0],
  views: 0,
  featured: false,
  allowComments: true,
  language: 'en',
};

const EnhancedBlogPostEditor: React.FC<EnhancedBlogPostEditorProps> = ({ post = defaultPost, onSave, onAutoSave }) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    post?.publishDate ? new Date(post.publishDate) : new Date()
  );
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up form with default values
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      ...post,
      tags: post?.tags || [],
      views: post?.views || 0,
      featured: post?.featured || false,
      allowComments: post?.allowComments !== false,
      ttsEnabled: post?.ttsEnabled || false,
      language: post?.language || 'en',
    }
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof blogPostSchema>) => {
    // Generate slug if not provided
    const slug = post?.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    const finalData: BlogPostData = {
      ...data,
      slug,
      tags,
      publishDate: selectedDate || new Date(),
      lastModified: new Date(),
    };
    
    onSave(finalData);
  };

  // Set up autosave functionality
  useEffect(() => {
    if (!onAutoSave) return;
    
    const autoSave = () => {
      const currentData = form.getValues();
      const slug = post?.slug || currentData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      
      const draftData: BlogPostData = {
        ...currentData,
        slug,
        tags,
        status: 'draft',
        publishDate: selectedDate || new Date(),
        lastModified: new Date(),
      };
      
      onAutoSave(draftData);
    };
    
    // Set up autosave timer (every 30 seconds)
    autoSaveTimerRef.current = setInterval(autoSave, 30000);
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [form, onAutoSave, tags, selectedDate, post?.slug]);

  // Handle tags
  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle AI summary generation
  const generateAiSummary = () => {
    const content = form.getValues('content');
    if (!content || content.length < 100) {
      toast({
        title: "Not Enough Content",
        description: "Please add more content before generating a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAiSummary(true);
    
    // Simulate AI summary generation (would be replaced by actual API call)
    setTimeout(() => {
      const summary = `This is an AI-generated summary of the article "${form.getValues('title')}". It discusses key points related to ${form.getValues('category')} and provides insights for readers interested in this topic.`;
      form.setValue('aiSummary', summary);
      setIsGeneratingAiSummary(false);
      
      toast({
        title: "Summary Generated",
        description: "AI summary has been generated successfully.",
      });
    }, 2000);
  };

  // Handle author change
  const handleAuthorChange = (authorId: string) => {
    const selected = sampleAuthors.find(author => author.id === authorId);
    if (selected) {
      form.setValue('author', selected);
    }
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = (url: string) => {
    form.setValue('featuredImage', url);
    toast({
      title: "Image Uploaded",
      description: "Featured image has been uploaded successfully.",
    });
  };

  // Handle background video upload
  const handleBackgroundVideoUpload = (url: string) => {
    form.setValue('backgroundVideo', url);
    toast({
      title: "Video Uploaded",
      description: "Background video has been uploaded successfully.",
    });
  };

  // Handle social share image upload
  const handleSocialShareImageUpload = (url: string) => {
    form.setValue('socialShareImage', url);
    toast({
      title: "Image Uploaded",
      description: "Social share image has been uploaded successfully.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="seo">SEO & Sharing</TabsTrigger>
            <TabsTrigger value="ai">AI Features</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A brief summary of your blog post" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed in blog lists and search results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your blog post content here" 
                      className="min-h-[400px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} &times;
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <FormField
              control={form.control}
              name="backgroundType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select background type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="gif">GIF</SelectItem>
                        <SelectItem value="color">Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch('backgroundType') === 'image' && (
              <div className="space-y-4">
                <Label>Featured Image</Label>
                <EnhancedFileUpload
                  endpoint="/api/uploads/blog"
                  onSuccess={handleFeaturedImageUpload}
                  accept="image/*"
                  maxSize={5}
                  label="Upload Featured Image"
                  category="featured"
                />
                {form.watch('featuredImage') && (
                  <div className="border rounded p-2">
                    <img 
                      src={form.watch('featuredImage')} 
                      alt="Featured" 
                      className="max-h-48 object-cover rounded" 
                    />
                  </div>
                )}
              </div>
            )}

            {form.watch('backgroundType') === 'video' && (
              <div className="space-y-4">
                <Label>Background Video</Label>
                <EnhancedFileUpload
                  endpoint="/api/uploads/blog"
                  onSuccess={handleBackgroundVideoUpload}
                  accept="video/*"
                  maxSize={20}
                  label="Upload Background Video"
                  category="video"
                />
                {form.watch('backgroundVideo') && (
                  <div className="border rounded p-2">
                    <video 
                      src={form.watch('backgroundVideo')} 
                      controls
                      className="max-h-48 w-full object-cover rounded" 
                    />
                  </div>
                )}
              </div>
            )}
            
            {form.watch('backgroundType') === 'gif' && (
              <div className="space-y-4">
                <Label>Background GIF</Label>
                <EnhancedFileUpload
                  endpoint="/api/uploads/blog"
                  onSuccess={handleFeaturedImageUpload}
                  accept="image/gif"
                  maxSize={5}
                  label="Upload GIF"
                  category="gif"
                />
                {form.watch('featuredImage') && (
                  <div className="border rounded p-2">
                    <img 
                      src={form.watch('featuredImage')} 
                      alt="GIF Background" 
                      className="max-h-48 object-cover rounded" 
                    />
                  </div>
                )}
              </div>
            )}
            
            {form.watch('backgroundType') === 'color' && (
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value || "#ffffff"}
                          className="w-16 h-10"
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value || "#ffffff"}
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === 'published') {
                          setSelectedDate(new Date());
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select post status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch('status') === 'scheduled' && (
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="author.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => handleAuthorChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleAuthors.map(author => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label>Author Details</Label>
              {form.watch('author') && (
                <div className="p-4 border rounded space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={form.watch('author').avatar} alt={form.watch('author').name} />
                      <AvatarFallback>{form.watch('author').name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{form.watch('author').name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{form.watch('author').bio}</p>
                  <div className="flex gap-2">
                    {form.watch('author').socialMedia?.twitter && <Button size="sm" variant="outline">Twitter</Button>}
                    {form.watch('author').socialMedia?.facebook && <Button size="sm" variant="outline">Facebook</Button>}
                    {form.watch('author').socialMedia?.linkedin && <Button size="sm" variant="outline">LinkedIn</Button>}
                    {form.watch('author').socialMedia?.instagram && <Button size="sm" variant="outline">Instagram</Button>}
                  </div>
                </div>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="views"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial View Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Set an initial view count for this post. Actual views will increment from this number.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
                    <div className="space-y-0.5">
                      <FormLabel>Featured Post</FormLabel>
                      <FormDescription>
                        Featured posts are displayed prominently on the homepage
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="allowComments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
                    <div className="space-y-0.5">
                      <FormLabel>Allow Comments</FormLabel>
                      <FormDescription>
                        Enable or disable comments for this post
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* SEO & Sharing Tab */}
          <TabsContent value="seo" className="space-y-6">
            <div className="space-y-4">
              <Label>Social Share Image</Label>
              <p className="text-sm text-muted-foreground">This image will be used when sharing on social media. If not set, the featured image will be used.</p>
              <EnhancedFileUpload
                endpoint="/api/uploads/blog"
                onSuccess={handleSocialShareImageUpload}
                accept="image/*"
                maxSize={5}
                label="Upload Social Share Image"
                category="social"
              />
              {form.watch('socialShareImage') && (
                <div className="border rounded p-2">
                  <img 
                    src={form.watch('socialShareImage')} 
                    alt="Social Share" 
                    className="max-h-48 object-cover rounded" 
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Social Media Preview</Label>
              <div className="border rounded p-4 space-y-2">
                <h3 className="font-bold">{form.watch('title') || 'Your Blog Post Title'}</h3>
                <p className="text-sm text-muted-foreground">
                  {form.watch('excerpt') || 'Your blog post excerpt will appear here. Make it engaging!'}
                </p>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={form.watch('author')?.avatar || '/placeholder.svg'} alt="Author" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span>{form.watch('author')?.name || 'Author Name'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Social Media Sharing</Label>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" className="h-auto py-2 flex flex-col">
                  <span>Twitter</span>
                  <span className="text-xs text-muted-foreground">Not configured</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col">
                  <span>Facebook</span>
                  <span className="text-xs text-muted-foreground">Not configured</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col">
                  <span>LinkedIn</span>
                  <span className="text-xs text-muted-foreground">Not configured</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col">
                  <span>Pinterest</span>
                  <span className="text-xs text-muted-foreground">Not configured</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* AI Features Tab */}
          <TabsContent value="ai" className="space-y-6">
            <FormField
              control={form.control}
              name="ttsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
                  <div className="space-y-0.5">
                    <FormLabel>Text-to-Speech</FormLabel>
                    <FormDescription>
                      Enable audio player for this article using Text-to-Speech
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>AI Summary</Label>
                <Button 
                  type="button" 
                  variant="outline"
                  disabled={isGeneratingAiSummary}
                  onClick={generateAiSummary}
                >
                  {isGeneratingAiSummary ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Summary
                    </>
                  )}
                </Button>
              </div>
              <FormField
                control={form.control}
                name="aiSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="AI-generated summary will appear here"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormDescription>
                      This summary will be used for SEO, social sharing, and TTS narration
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 p-3 border rounded-lg bg-secondary/20">
              <h3 className="font-medium flex items-center">
                <Languages className="h-4 w-4 mr-2" />
                AI Translation
              </h3>
              <p className="text-sm text-muted-foreground">Translate this post to other languages using AI.</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" disabled={true} className="text-sm">
                  Translate to Arabic
                </Button>
                <Button variant="outline" disabled={true} className="text-sm">
                  Translate to French
                </Button>
                <Button variant="outline" disabled={true} className="text-sm">
                  Add Language...
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                AI translation requires API configuration in Settings
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <Clock className="inline-block h-4 w-4 mr-1" />
            Auto-saving draft...
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline">Preview</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {post.id ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EnhancedBlogPostEditor;

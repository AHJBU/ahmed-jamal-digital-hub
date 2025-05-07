
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/admin/FileUpload';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';
import { 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  Image as ImageIcon, 
  Video, 
  Youtube, 
  Quote, 
  FileCode, 
  PanelRight, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save,
  LinkIcon
} from 'lucide-react';

interface BlogPostEditorProps {
  post?: {
    id?: number;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    image: string;
    status: string;
    author: string;
    authorBio: string;
    authorAvatar: string;
  };
  onSave: (post: any) => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [category, setCategory] = useState(post?.category || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [featuredImage, setFeaturedImage] = useState(post?.image || '');
  const [status, setStatus] = useState(post?.status || 'draft');
  const [author, setAuthor] = useState(post?.author || '');
  const [authorBio, setAuthorBio] = useState(post?.authorBio || '');
  const [authorAvatar, setAuthorAvatar] = useState(post?.authorAvatar || '');
  const [isFeatured, setIsFeatured] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  
  // Dynamic editor buttons and handlers
  const editorButtons = [
    { icon: Bold, label: 'Bold', action: () => insertFormat('**', '**') },
    { icon: Italic, label: 'Italic', action: () => insertFormat('_', '_') },
    { icon: Link, label: 'Link', action: () => insertLink() },
    { icon: List, label: 'Bullet List', action: () => insertList('- ') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertList('1. ') },
    { icon: ImageIcon, label: 'Image', action: () => insertMedia('image') },
    { icon: Video, label: 'Video', action: () => insertMedia('video') },
    { icon: Youtube, label: 'YouTube', action: () => insertYouTube() },
    { icon: Quote, label: 'Blockquote', action: () => insertFormat('> ', '') },
    { icon: FileCode, label: 'Code Block', action: () => insertFormat('```\n', '\n```') },
  ];

  // Editor functions
  const insertFormat = (before: string, after: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const replacement = before + selection + after;
    
    setContent(
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end)
    );
    
    // Focus and set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selection.length
      );
    }, 0);
  };
  
  const insertList = (prefix: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    
    // Split by newline and add prefix to each line
    const lines = selection.split('\n');
    const formattedLines = lines.map(line => prefix + line).join('\n');
    
    // Insert with a newline after
    setContent(
      textarea.value.substring(0, start) +
      formattedLines +
      '\n\n' +
      textarea.value.substring(end)
    );
    
    // Focus and set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedLines.length + 2,
        start + formattedLines.length + 2
      );
    }, 0);
  };
  
  const insertLink = () => {
    // Prompt for URL
    const url = prompt('Enter the URL:', 'https://');
    if (!url) return;
    
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const linkText = selection || 'link text';
    
    const markdownLink = `[${linkText}](${url})`;
    
    setContent(
      textarea.value.substring(0, start) +
      markdownLink +
      textarea.value.substring(end)
    );
  };
  
  const insertMedia = (type: 'image' | 'video') => {
    // In a real application, you would open a media picker here
    const url = prompt(`Enter the ${type} URL:`, '');
    if (!url) return;
    
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    
    let markdownMedia = '';
    if (type === 'image') {
      const altText = prompt('Enter alt text for the image:', '') || '';
      markdownMedia = `![${altText}](${url})`;
    } else {
      markdownMedia = `<video controls src="${url}"></video>`;
    }
    
    setContent(
      textarea.value.substring(0, start) +
      markdownMedia +
      textarea.value.substring(start)
    );
  };
  
  const insertYouTube = () => {
    const url = prompt('Enter YouTube video URL:', '');
    if (!url) return;
    
    // Extract video ID from YouTube URL
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    if (!match) {
      alert('Invalid YouTube URL. Please provide a valid YouTube video URL.');
      return;
    }
    
    const videoId = match[1];
    const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    
    setContent(
      textarea.value.substring(0, start) +
      embedCode +
      textarea.value.substring(start)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !content || !category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare tag array
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    // Prepare post object
    const postData = {
      id: post?.id || Date.now(),
      title,
      content,
      excerpt,
      category,
      tags: tagArray,
      image: featuredImage,
      status,
      author,
      authorBio,
      authorAvatar,
      isFeatured,
      allowComments,
      updatedAt: new Date().toISOString()
    };
    
    onSave(postData);
    
    toast({
      title: "Success",
      description: `Post ${post?.id ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleFeaturedImageUpload = (url: string) => {
    setFeaturedImage(url);
    toast({
      title: "Image Uploaded",
      description: "Featured image has been successfully uploaded."
    });
  };
  
  const handleAuthorAvatarUpload = (url: string) => {
    setAuthorAvatar(url);
    toast({
      title: "Avatar Uploaded",
      description: "Author avatar has been successfully uploaded."
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
          <TabsTrigger value="author">Author</TabsTrigger>
        </TabsList>
        
        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <div className="border rounded-md p-1 mb-1">
                <div className="flex flex-wrap gap-1 p-1">
                  {editorButtons.map((button, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={button.action}
                      title={button.label}
                    >
                      <button.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
                <div className="flex gap-1 p-1 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertFormat('# ', '')}
                    className="text-xs"
                  >
                    H1
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertFormat('## ', '')}
                    className="text-xs"
                  >
                    H2
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertFormat('### ', '')}
                    className="text-xs"
                  >
                    H3
                  </Button>
                  <Separator orientation="vertical" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {}}
                    title="Align Left"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {}}
                    title="Align Center"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {}}
                    title="Align Right"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea 
                id="content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[300px] font-mono"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea 
                id="excerpt" 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the post"
                className="h-24"
              />
              <p className="text-sm text-muted-foreground mt-1">
                A short summary that appears in blog listing pages.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Example: React, Web Development, Tutorial
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select post status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isFeatured" 
                  checked={isFeatured} 
                  onCheckedChange={setIsFeatured} 
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="allowComments" 
                  checked={allowComments} 
                  onCheckedChange={setAllowComments} 
                />
                <Label htmlFor="allowComments">Allow Comments</Label>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* SEO Tab */}
        <TabsContent value="seo">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <div className="mt-2">
                    <EnhancedFileUpload
                      onFileUpload={handleFeaturedImageUpload}
                      defaultPreview={featuredImage}
                      acceptedFileTypes={['image/*']}
                      maxSize={5}
                      previewSize="large"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    placeholder="Meta title (leave blank to use post title)"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    placeholder="Meta description (leave blank to use excerpt)"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Author Tab */}
        <TabsContent value="author">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="author">Author Name</Label>
              <Input 
                id="author" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>
            
            <div>
              <Label htmlFor="authorBio">Author Bio</Label>
              <Textarea 
                id="authorBio" 
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                placeholder="Brief author biography"
                className="h-24"
              />
            </div>
            
            <div>
              <Label htmlFor="authorAvatar">Author Avatar</Label>
              <div className="mt-2">
                <EnhancedFileUpload
                  onFileUpload={handleAuthorAvatarUpload}
                  defaultPreview={authorAvatar}
                  acceptedFileTypes={['image/*']}
                  maxSize={2}
                  previewSize="small"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Post
        </Button>
      </div>
    </form>
  );
};

export default BlogPostEditor;

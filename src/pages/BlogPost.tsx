import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Share2, MessageSquare, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

// Mock blog data (same as in Blog.tsx)
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the upcoming trends in web development, from AI integration to enhanced user experiences and the evolution of frontend frameworks.',
    content: `
        <p>The field of web development is constantly evolving, with new technologies and approaches emerging to address the growing demands of the digital landscape. As we look ahead to 2025, several significant trends are poised to shape the future of web development.</p>

        <h2>AI Integration in Web Development</h2>
        <p>Artificial Intelligence is becoming increasingly integrated into web development workflows. From AI-assisted code generation to intelligent user interfaces that adapt to user behavior, the role of AI in web development is expanding rapidly. Developers are leveraging machine learning algorithms to create more personalized user experiences and streamline development processes.</p>

        <h2>The Rise of WebAssembly</h2>
        <p>WebAssembly (WASM) is gaining momentum as a powerful tool for high-performance web applications. By allowing developers to run code written in languages like C, C++, and Rust at near-native speed in browsers, WASM is opening new possibilities for complex web applications, including games, video editing tools, and data visualization platforms.</p>

        <h2>Progressive Web Apps Continue to Evolve</h2>
        <p>Progressive Web Apps (PWAs) continue to bridge the gap between web and native applications. With improvements in offline capabilities, push notifications, and integration with device features, PWAs are becoming an increasingly attractive alternative to native mobile apps.</p>

        <h2>The Growth of Headless CMS</h2>
        <p>Headless CMS architectures, which separate the content management from the presentation layer, are becoming the standard for modern web development. This approach provides greater flexibility, allowing developers to use any frontend technology while managing content through a user-friendly interface.</p>

        <h2>Edge Computing for Web Applications</h2>
        <p>Edge computing is transforming how web applications are delivered by processing data closer to the user. This approach reduces latency and improves the performance of web applications, particularly for users in regions with slower internet connections.</p>

        <h2>Conclusion</h2>
        <p>The future of web development is exciting, with technologies like AI, WebAssembly, and edge computing poised to transform how we build and experience the web. By staying informed about these trends and adopting new tools and approaches, developers can create more powerful, efficient, and user-friendly web applications that meet the evolving needs of users worldwide.</p>
    `,
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    date: '2025-04-15',
    author: 'Ahmed Jamal',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop',
    authorBio: 'Digital professional specializing in web development, design, and digital marketing strategies.',
    category: 'web-development',
    tags: ['React', 'AI', 'Web Trends', 'Frontend'],
    comments: [
      {
        id: 1,
        name: 'Sarah Johnson',
        date: '2025-04-16',
        content: 'Great insights on the future of web development! I\'m particularly excited about the potential of WebAssembly.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1074&auto=format&fit=crop'
      },
      {
        id: 2,
        name: 'Michael Chen',
        date: '2025-04-16',
        content: 'I\'ve been experimenting with AI-assisted development tools, and they\'ve significantly improved my workflow. Excited to see how this field evolves.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop'
      }
    ]
  },
  // Other blog posts would be defined here
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { translations, language } = useSettings();
  const t = translations.blog;
  
  const post = blogPosts.find(p => p.id === Number(id));
  
  if (!post) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}
          </h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
      : new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: language === 'ar' ? "تم إرسال التعليق بنجاح" : "Comment submitted successfully",
      description: language === 'ar' 
        ? "سيتم مراجعة تعليقك قبل النشر" 
        : "Your comment will be reviewed before publishing",
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
        
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Share Buttons */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">{t.share}</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            
            {/* Author */}
            <div className="mt-8 p-6 border rounded-lg bg-secondary/30">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>
            </div>
            
            {/* Comments */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">
                {t.comments} ({post.comments.length})
              </h3>
              
              <div className="space-y-6">
                {post.comments.map(comment => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.avatar} alt={comment.name} />
                          <AvatarFallback>{comment.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">{comment.name}</h4>
                            <span className="text-sm text-muted-foreground">{formatDate(comment.date)}</span>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{t.leaveComment}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      {language === 'ar' ? 'الاسم' : 'Name'}
                    </label>
                    <Input id="name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    {language === 'ar' ? 'التعليق' : 'Comment'}
                  </label>
                  <Textarea id="comment" rows={5} required />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'إرسال التعليق' : 'Submit Comment'}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Related Posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}
                </h3>
                <div className="space-y-4">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => (
                    <div key={relatedPost.id} className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <Link to={`/blog/${relatedPost.id}`}>
                          <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground">{formatDate(relatedPost.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;


import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, X } from 'lucide-react';

const AdminAbout: React.FC = () => {
  return (
    <AdminLayout title="About Me">
      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          {/* Introduction Section */}
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="intro-en">Introduction (English)</Label>
                <Textarea 
                  id="intro-en"
                  placeholder="Enter your introduction in English"
                  className="min-h-[100px]"
                  defaultValue="I am Ahmed Jamal, a multidisciplinary digital professional with over 10 years of experience in design, development, and social media. I believe in the power of creativity and technology to make a positive impact and transform ideas into tangible reality."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intro-ar">Introduction (Arabic)</Label>
                <Textarea 
                  id="intro-ar"
                  placeholder="Enter your introduction in Arabic"
                  className="min-h-[100px]"
                  defaultValue="أنا أحمد جمال، محترف رقمي متعدد المهارات مع أكثر من 10 سنوات من الخبرة في مجالات التصميم والتطوير ووسائل التواصل الاجتماعي. أؤمن بقوة الإبداع والتكنولوجيا في إحداث تأثير إيجابي وتحويل الأفكار إلى واقع ملموس."
                />
              </div>
            </CardContent>
          </Card>

          {/* My Story Section */}
          <Card>
            <CardHeader>
              <CardTitle>My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="story-en">My Story (English)</Label>
                <Textarea 
                  id="story-en"
                  placeholder="Enter your story in English"
                  className="min-h-[200px]"
                  defaultValue="I started my professional journey as a graphic designer, and quickly discovered my passion for web and applications. Over the years, my skills expanded to include web development, user experience design, social media management, and training. I enjoy working on diverse projects that challenge my abilities and expand my professional horizons."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="story-ar">My Story (Arabic)</Label>
                <Textarea 
                  id="story-ar"
                  placeholder="Enter your story in Arabic"
                  className="min-h-[200px]"
                  defaultValue="بدأت رحلتي المهنية كمصمم جرافيك، وسرعان ما اكتشفت شغفي بالويب والتطبيقات. مع مرور السنوات، توسعت مهاراتي لتشمل تطوير الويب، وتصميم تجربة المستخدم، وإدارة وسائل التواصل الاجتماعي، والتدريب. أستمتع بالعمل في مشاريع متنوعة تتحدى قدراتي وتوسع آفاقي المهنية."
                />
              </div>
            </CardContent>
          </Card>

          {/* Vision Section */}
          <Card>
            <CardHeader>
              <CardTitle>My Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vision-en">Vision (English)</Label>
                <Textarea 
                  id="vision-en"
                  placeholder="Enter your vision in English"
                  className="min-h-[100px]"
                  defaultValue="I constantly strive for innovation and continuous learning in everything I do. My vision is to contribute to shaping a more creative and inclusive digital future through human-centered designs and technical solutions."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vision-ar">Vision (Arabic)</Label>
                <Textarea 
                  id="vision-ar"
                  placeholder="Enter your vision in Arabic"
                  className="min-h-[100px]"
                  defaultValue="أسعى دائمًا للابتكار والتعلم المستمر في كل ما أقوم به. رؤيتي هي المساهمة في تشكيل مستقبل رقمي أكثر إبداعًا وشمولية من خلال تصميمات وحلول تقنية تركز على الإنسان."
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="relative border rounded-lg overflow-hidden aspect-square">
                    <img 
                      src="/placeholder.svg"
                      alt={`Gallery photo ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Drop files or click to upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload photos to display on your about page
                  </p>
                  <Button>Upload Photos</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL (YouTube/Vimeo)</Label>
                <Input 
                  id="video-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Video</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quotes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inspiring Quotes</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Quote
              </Button>
            </CardHeader>
            <CardContent>
              {/* Quote 1 */}
              <div className="border rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="quote1-text-en">Quote Text (English)</Label>
                    <Textarea
                      id="quote1-text-en"
                      defaultValue="Design is not just what it looks like. Design is how it works."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote1-text-ar">Quote Text (Arabic)</Label>
                    <Textarea
                      id="quote1-text-ar"
                      defaultValue="التصميم هو ليس كيف يبدو الشيء. التصميم هو كيف يعمل."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote1-author">Author</Label>
                    <Input
                      id="quote1-author"
                      defaultValue="Steve Jobs"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="destructive" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Remove Quote
                  </Button>
                </div>
              </div>
              
              {/* Quote 2 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="quote2-text-en">Quote Text (English)</Label>
                    <Textarea
                      id="quote2-text-en"
                      defaultValue="Creativity is seeing what others don't see."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote2-text-ar">Quote Text (Arabic)</Label>
                    <Textarea
                      id="quote2-text-ar"
                      defaultValue="الإبداع هو رؤية ما لا يراه الآخرون."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote2-author">Author</Label>
                    <Input
                      id="quote2-author"
                      defaultValue="Anonymous"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="destructive" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Remove Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button>Save All Quotes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAbout;

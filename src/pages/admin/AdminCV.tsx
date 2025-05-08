
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { FileText, Upload, Download, Eye, Trash2, Plus, Save } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

const AdminCV: React.FC = () => {
  const [activeTab, setActiveTab] = useState("resume");
  const [cvFormat, setCvFormat] = useState("modern");
  const [headlineText, setHeadlineText] = useState("Digital Professional with expertise in social media, graphic design, web development, and training");

  // CV Sections toggle state
  const [sections, setSections] = useState({
    summary: true,
    experience: true,
    education: true,
    skills: true,
    achievements: true,
    languages: true,
    references: false
  });

  const handleToggleSection = (section: keyof typeof sections) => {
    setSections({
      ...sections,
      [section]: !sections[section]
    });
  };

  const handleSave = () => {
    toast({
      title: "CV Settings Saved",
      description: "Your CV settings have been updated successfully.",
    });
  };

  const handleDownloadCV = () => {
    toast({
      title: "Downloading CV",
      description: "Your CV is being prepared for download.",
    });
  };

  return (
    <AdminLayout title="CV/Resume Management">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ScrollReveal>
          <TabsList className="mb-6">
            <TabsTrigger value="resume">Resume/CV</TabsTrigger>
            <TabsTrigger value="export">Export Options</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
        </ScrollReveal>

        {/* Resume/CV Tab */}
        <TabsContent value="resume">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update the general information displayed on your CV</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="headline">Professional Headline</Label>
                      <Input 
                        id="headline" 
                        value={headlineText}
                        onChange={(e) => setHeadlineText(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        A short phrase describing your professional identity
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        rows={4} 
                        defaultValue="Digital professional with 10+ years of experience in social media management, graphic design, web development, and training. Skilled in creating engaging digital content, managing online presence, and training teams on digital tools."
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Sections & Order</CardTitle>
                    <CardDescription>
                      Choose which sections to display on your CV and their order
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(sections).map(([key, enabled]) => (
                        <div key={key} className="flex items-center justify-between p-2 border rounded hover:bg-secondary/50">
                          <div className="flex gap-3 items-center">
                            <div className="cursor-move text-muted-foreground">
                              ⋮⋮
                            </div>
                            <span className="capitalize">{key}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id={`section-${key}`} 
                              checked={enabled}
                              onChange={() => handleToggleSection(key as keyof typeof sections)}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={`section-${key}`}>Show</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
            
            <div className="md:col-span-1 space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Preview & Download</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <div className="border rounded-md p-4 h-64 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button className="w-full" onClick={handleDownloadCV}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>Format Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cv-format">CV Format</Label>
                      <select
                        id="cv-format"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={cvFormat}
                        onChange={(e) => setCvFormat(e.target.value)}
                      >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="creative">Creative</option>
                        <option value="minimalist">Minimalist</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cv-language">Primary Language</Label>
                      <select
                        id="cv-language"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save CV Settings
            </Button>
          </div>
        </TabsContent>
        
        {/* Export Options Tab */}
        <TabsContent value="export">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Download your CV in different formats or share it online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <h3 className="font-medium">PDF Format</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      High-quality PDF suitable for printing and online applications
                    </p>
                    <Button>Download PDF</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <h3 className="font-medium">Word Document</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Editable DOCX format for Microsoft Word
                    </p>
                    <Button variant="outline">Download DOCX</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <h3 className="font-medium">Plain Text</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Simple text format for ATS (Applicant Tracking Systems)
                    </p>
                    <Button variant="outline">Download TXT</Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Sharing Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Public URL</h4>
                      <div className="flex gap-2">
                        <Input 
                          value="https://ahjbu.com/cv/public/ahmedjamal" 
                          readOnly
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Share this link to allow others to view your CV online
                      </p>
                      <div className="flex items-center mt-4 space-x-2">
                        <input 
                          type="checkbox" 
                          id="enable-public-url" 
                          defaultChecked={true}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="enable-public-url">Enable public URL</Label>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Email CV</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="recipient-email">Recipient Email</Label>
                          <Input 
                            id="recipient-email" 
                            type="email" 
                            placeholder="Enter recipient's email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-message">Message</Label>
                          <Textarea 
                            id="email-message" 
                            placeholder="Add a personal message"
                            rows={3}
                          />
                        </div>
                        <Button>Send Email</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>CV Templates</CardTitle>
                <CardDescription>
                  Choose a template that best represents your professional style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {["Modern", "Classic", "Creative", "Minimalist", "Professional", "Executive"].map((template, index) => (
                    <div 
                      key={template} 
                      className={`border rounded-lg overflow-hidden hover:border-primary transition-colors ${index === 0 ? 'ring-2 ring-primary' : ''}`}
                    >
                      <div className="h-48 bg-secondary flex items-center justify-center">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{template}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {index === 0 ? 'Current template' : `A ${template.toLowerCase()} style CV layout`}
                        </p>
                        <div className="mt-4">
                          <Button variant={index === 0 ? "secondary" : "outline"} className="w-full">
                            {index === 0 ? 'Selected' : 'Use This Template'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminCV;

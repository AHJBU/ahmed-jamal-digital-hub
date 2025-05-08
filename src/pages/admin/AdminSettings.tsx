
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Save, AlertTriangle, Upload, Palette, Bell, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

const colorPresets = [
  { 
    name: "Default Blue", 
    primary: "#0284c7", 
    secondary: "#f1f5f9", 
    accent: "#4f46e5" 
  },
  { 
    name: "Forest Green", 
    primary: "#059669", 
    secondary: "#ecfdf5", 
    accent: "#d97706" 
  },
  { 
    name: "Professional Gray", 
    primary: "#334155", 
    secondary: "#f8fafc", 
    accent: "#0ea5e9" 
  },
  { 
    name: "Vibrant Purple", 
    primary: "#7c3aed", 
    secondary: "#f5f3ff", 
    accent: "#ec4899" 
  },
];

const AdminSettings: React.FC = () => {
  const { user, toggleTwoFactor } = useAuth();
  const { settings, updateSettings, saveSettings } = useSiteSettings();
  
  // Contact settings
  const [contactEmail, setContactEmail] = useState('contact@ahmedjamal.com');
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  
  // Integration settings
  const [zapierWebhook, setZapierWebhook] = useState('');
  const [makeWebhook, setMakeWebhook] = useState('');
  const [plyrEnabled, setPlyrEnabled] = useState(false);
  const [openAiApiKey, setOpenAiApiKey] = useState('');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');
  
  // Theme settings
  const [selectedPreset, setSelectedPreset] = useState('default');
  const [primaryColor, setPrimaryColor] = useState('#0284c7');
  const [secondaryColor, setSecondaryColor] = useState('#f1f5f9');
  const [accentColor, setAccentColor] = useState('#4f46e5');
  
  const handleToggleTwoFactor = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    // In a production app, this would trigger setup of 2FA if enabling
  };
  
  const handleSaveContactSettings = () => {
    // In a real application, save to database
    toast({
      title: "Contact Settings Saved",
      description: `Contact form emails will be sent to: ${contactEmail}`,
    });
  };
  
  const handleSaveSecuritySettings = () => {
    toggleTwoFactor(twoFactorEnabled);
    
    toast({
      title: "Security Settings Saved",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been enabled." 
        : "Two-factor authentication has been disabled.",
    });
  };

  const handleSaveSiteSettings = () => {
    saveSettings();
    document.title = settings.siteName;
  };

  const handleApplyColorPreset = (preset: typeof colorPresets[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
    
    toast({
      title: "Color Theme Applied",
      description: `The ${preset.name} theme has been applied.`,
    });
    
    // In a real app, this would update CSS variables or a theme system
  };

  const handleLogoSuccess = (url: string) => {
    updateSettings({ logoUrl: url });
    toast({
      title: "Logo Uploaded",
      description: "Your logo has been uploaded successfully.",
    });
  };

  const handleFaviconSuccess = (url: string) => {
    updateSettings({ favicon: url });
    toast({
      title: "Favicon Uploaded",
      description: "Your favicon has been uploaded successfully.",
    });
  };

  const handleSaveIntegrationSettings = () => {
    toast({
      title: "Integration Settings Saved",
      description: "Your integration settings have been saved successfully.",
    });
  };

  const handleTestZapierWebhook = () => {
    if (!zapierWebhook) {
      toast({
        title: "Error",
        description: "Please enter a Zapier webhook URL first.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, send a test ping to the webhook
    toast({
      title: "Test Webhook Sent",
      description: "A test request has been sent to your Zapier webhook.",
    });
  };

  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="site">
        <ScrollReveal>
          <TabsList className="mb-6">
            <TabsTrigger value="site">Site Settings</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="email">Email Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
        </ScrollReveal>
        
        {/* Site Settings */}
        <TabsContent value="site">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Configure basic website settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={settings.siteName}
                      onChange={(e) => updateSettings({ siteName: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This will appear in browser tabs and in search results
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="siteAuthor">Site Author</Label>
                    <Input 
                      id="siteAuthor" 
                      value={settings.siteAuthor}
                      onChange={(e) => updateSettings({ siteAuthor: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    value={settings.siteDescription}
                    onChange={(e) => updateSettings({ siteDescription: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Brief description of your site for SEO purposes (appears in search results)
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label>Site Logo</Label>
                    <div className="mt-2">
                      <EnhancedFileUpload
                        endpoint="/api/uploads/site"
                        onSuccess={handleLogoSuccess}
                        accept="image/*"
                        maxSize={2}
                        label="Upload Logo"
                        category="site"
                        allowDescription={false}
                      />
                    </div>
                    {settings.logoUrl && (
                      <div className="mt-2 p-2 border rounded">
                        <img 
                          src={settings.logoUrl} 
                          alt="Site Logo" 
                          className="h-12 object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Favicon</Label>
                    <div className="mt-2">
                      <EnhancedFileUpload
                        endpoint="/api/uploads/site"
                        onSuccess={handleFaviconSuccess}
                        accept="image/*"
                        maxSize={1}
                        label="Upload Favicon"
                        category="favicon"
                        allowDescription={false}
                      />
                    </div>
                    {settings.favicon && settings.favicon !== '/favicon.ico' && (
                      <div className="mt-2 p-2 border rounded">
                        <img 
                          src={settings.favicon} 
                          alt="Favicon" 
                          className="h-8 object-contain"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended size: 32x32 pixels (PNG format)
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="siteLanguage">Default Language</Label>
                    <select
                      id="siteLanguage"
                      value={settings.siteLanguage}
                      onChange={(e) => updateSettings({ siteLanguage: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteTheme">Default Theme</Label>
                    <select
                      id="siteTheme"
                      value={settings.siteTheme}
                      onChange={(e) => updateSettings({ siteTheme: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System (User's Preference)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="maintenance"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSettings({ maintenanceMode: checked })}
                  />
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    updateSettings({
                      siteName: 'Ahmed Jamal - Portfolio & Blog',
                      siteDescription: 'Personal portfolio and blog showcasing my work and thoughts.',
                      siteAuthor: 'Ahmed Jamal',
                      maintenanceMode: false,
                      favicon: '/favicon.ico',
                      siteLanguage: 'en',
                      siteTheme: 'light',
                      logoUrl: '',
                    });
                    toast({
                      title: "Settings Reset",
                      description: "Your site settings have been reset to defaults.",
                    });
                  }}
                >
                  Reset to Defaults
                </Button>
                <Button onClick={handleSaveSiteSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Site Settings
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>
        
        {/* Contact Settings */}
        <TabsContent value="contact">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Settings</CardTitle>
                <CardDescription>
                  Configure where contact form submissions are sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Form Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    All contact form submissions will be sent to this email address.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="recaptcha" defaultChecked />
                  <Label htmlFor="recaptcha">Enable reCAPTCHA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="autoresponder" defaultChecked />
                  <Label htmlFor="autoresponder">Send Confirmation Email to Submitter</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveContactSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Contact Settings
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure authentication and security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important Security Notice</AlertTitle>
                  <AlertDescription>
                    Two-factor authentication adds an extra layer of security to your account. Once enabled, 
                    you'll need both your password and a verification code to log in.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                      Require a verification code in addition to your password when logging in.
                    </p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggleTwoFactor}
                  />
                </div>
                
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" min="5" max="120" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Time before an inactive session is automatically logged out.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="failedAttempts" defaultChecked />
                  <Label htmlFor="failedAttempts">Limit Failed Login Attempts</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSecuritySettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>
        
        {/* Email Notification Settings */}
        <TabsContent value="email">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Email Notification Settings</CardTitle>
                <CardDescription>
                  Configure when and how you receive email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="notifyContact">Contact Form Submissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when someone submits the contact form
                    </p>
                  </div>
                  <Switch id="notifyContact" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="notifyComments">New Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when someone comments on your blog posts
                    </p>
                  </div>
                  <Switch id="notifyComments" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="notifyLogin">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when there's a login from a new device or location
                    </p>
                  </div>
                  <Switch id="notifyLogin" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Colors
                </CardTitle>
                <CardDescription>
                  Customize the appearance of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Themes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {colorPresets.map((preset) => (
                      <div 
                        key={preset.name}
                        className="border rounded-md p-4 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleApplyColorPreset(preset)}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <div 
                            className="h-6 w-6 rounded-full border" 
                            style={{ backgroundColor: preset.primary }}
                          ></div>
                          <div 
                            className="h-6 w-6 rounded-full border ml-1" 
                            style={{ backgroundColor: preset.secondary }}
                          ></div>
                          <div 
                            className="h-6 w-6 rounded-full border ml-1" 
                            style={{ backgroundColor: preset.accent }}
                          ></div>
                        </div>
                        <p className="text-sm text-center">{preset.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Custom Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input 
                          type="color" 
                          id="primaryColor" 
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text" 
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Main brand color used for buttons and accents
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input 
                          type="color" 
                          id="secondaryColor" 
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text" 
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Used for backgrounds and secondary elements
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input 
                          type="color" 
                          id="accentColor" 
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text" 
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Used for highlights and interactive elements
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md mt-4">
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <div className="p-4 rounded" style={{ backgroundColor: secondaryColor }}>
                    <div 
                      className="rounded p-3 text-white mb-2" 
                      style={{ backgroundColor: primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div 
                      className="rounded p-3 text-white" 
                      style={{ backgroundColor: accentColor }}
                    >
                      Accent Element
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => {
                    setPrimaryColor('#0284c7');
                    setSecondaryColor('#f1f5f9');
                    setAccentColor('#4f46e5');
                  }}
                >
                  Reset Colors
                </Button>
                <Button onClick={() => {
                  // In a real app, this would update CSS variables or a theme system
                  toast({
                    title: "Custom Colors Saved",
                    description: "Your custom color theme has been applied.",
                  });
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Apply Custom Colors
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <ScrollReveal>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Automation Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect with automation tools to extend your website functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="zapierWebhook">Zapier Webhook URL</Label>
                    <Input 
                      id="zapierWebhook" 
                      value={zapierWebhook}
                      onChange={(e) => setZapierWebhook(e.target.value)}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleTestZapierWebhook}>Test Webhook</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect your website to 3000+ apps with Zapier. Use this webhook to trigger Zaps when events happen on your site.
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t">
                    <Label htmlFor="makeWebhook">Make.com (Integromat) Webhook URL</Label>
                    <Input 
                      id="makeWebhook" 
                      value={makeWebhook}
                      onChange={(e) => setMakeWebhook(e.target.value)}
                      placeholder="https://hook.eu1.make.com/..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Create advanced automation flows with Make.com to connect your site with other services.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Media Integrations</CardTitle>
                  <CardDescription>
                    Enhance your website with media and AI capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Plyr.io Video Player</h3>
                      <p className="text-sm text-muted-foreground">
                        Modern, accessible HTML5 video & audio player
                      </p>
                    </div>
                    <div>
                      <Switch 
                        checked={plyrEnabled} 
                        onCheckedChange={setPlyrEnabled} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <Input 
                      id="openai-key" 
                      type="password"
                      value={openAiApiKey}
                      onChange={(e) => setOpenAiApiKey(e.target.value)}
                      placeholder="sk-..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Required for AI blog summarizer and content generation features
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                    <Input 
                      id="elevenlabs-key" 
                      type="password"
                      value={elevenLabsApiKey}
                      onChange={(e) => setElevenLabsApiKey(e.target.value)}
                      placeholder="..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Required for Text-to-Speech features in blog posts
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveIntegrationSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Integration Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;

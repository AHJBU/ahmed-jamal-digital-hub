
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
import { Save, AlertTriangle } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

const AdminSettings: React.FC = () => {
  const { user, toggleTwoFactor } = useAuth();
  
  const [contactEmail, setContactEmail] = useState('contact@ahmedjamal.com');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  
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

  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="general">
        <ScrollReveal>
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="email">Email Notifications</TabsTrigger>
          </TabsList>
        </ScrollReveal>
        
        {/* General Settings */}
        <TabsContent value="general">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic website settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="Ahmed Jamal - Portfolio & Blog" />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input id="siteDescription" defaultValue="Personal portfolio and blog showcasing my work and thoughts." />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
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
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useSettings();
  
  const pageTitle = language === 'ar' ? 'تواصل معي' : 'Contact Me';
  const submitText = language === 'ar' ? 'إرسال الرسالة' : 'Send Message';
  const namePlaceholder = language === 'ar' ? 'الاسم الكامل' : 'Full Name';
  const emailPlaceholder = language === 'ar' ? 'البريد الإلكتروني' : 'Email Address';
  const subjectPlaceholder = language === 'ar' ? 'الموضوع' : 'Subject';
  const messagePlaceholder = language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-10">{pageTitle}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <a href="mailto:contact@ahmedjamal.com" className="text-muted-foreground hover:text-primary">
                        contact@ahmedjamal.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? 'الهاتف' : 'Phone'}
                      </p>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                        +123 456 7890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {language === 'ar' ? 'العنوان' : 'Address'}
                      </p>
                      <p className="text-muted-foreground">
                        {language === 'ar' 
                          ? 'الرياض، المملكة العربية السعودية' 
                          : 'Riyadh, Saudi Arabia'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">
                    {language === 'ar' ? 'تابعني على' : 'Follow Me On'}
                  </h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-secondary hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-secondary hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-secondary hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-secondary hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  {language === 'ar' ? 'أرسل لي رسالة' : 'Send Me a Message'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm">
                        {language === 'ar' ? 'الاسم' : 'Name'}
                      </label>
                      <Input 
                        id="name" 
                        placeholder={namePlaceholder} 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder={emailPlaceholder} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm">
                      {language === 'ar' ? 'الموضوع' : 'Subject'}
                    </label>
                    <Input 
                      id="subject" 
                      placeholder={subjectPlaceholder} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm">
                      {language === 'ar' ? 'الرسالة' : 'Message'}
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder={messagePlaceholder} 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {submitText}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

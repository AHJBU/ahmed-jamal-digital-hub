
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, RefreshCw } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

// Strong validation schema with anti-spam measures
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .regex(/^[a-zA-Z\s\u0600-\u06FF.,'-]+$/, { 
      message: "Name contains invalid characters" 
    }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(200, { message: "Subject cannot exceed 200 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(3000, { message: "Message cannot exceed 3000 characters" }),
  captcha: z
    .string()
    .min(1, { message: "Please solve the captcha" }),
  honeypot: z
    .string()
    .max(0, { message: "Spam detected" })
    .optional(),
});

const SecureContactForm: React.FC = () => {
  const { language } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simple math captcha
  const [captcha, setCaptcha] = useState(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { num1, num2, answer: num1 + num2 };
  });
  
  const regenerateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptcha({ num1, num2, answer: num1 + num2 });
    form.setValue('captcha', '');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      captcha: '',
      honeypot: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Verify captcha
    if (Number(values.captcha) !== captcha.answer) {
      form.setError('captcha', { 
        type: 'custom', 
        message: language === 'ar' ? 'الإجابة غير صحيحة' : 'Incorrect answer' 
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call
      console.log('Form submitted:', values);
      
      // Successful submission
      toast({
        title: language === 'ar' ? 'تم إرسال الرسالة' : 'Message Sent',
        description: language === 'ar' 
          ? 'سنتواصل معك قريباً' 
          : 'We will contact you shortly',
      });
      
      // Reset form
      form.reset();
      regenerateCaptcha();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: language === 'ar' ? 'فشل الإرسال' : 'Submission Failed',
        description: language === 'ar' 
          ? 'حدث خطأ، يرجى المحاولة مرة أخرى' 
          : 'An error occurred, please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitText = language === 'ar' ? 'إرسال الرسالة' : 'Send Message';
  const namePlaceholder = language === 'ar' ? 'الاسم الكامل' : 'Full Name';
  const emailPlaceholder = language === 'ar' ? 'البريد الإلكتروني' : 'Email Address';
  const subjectPlaceholder = language === 'ar' ? 'الموضوع' : 'Subject';
  const messagePlaceholder = language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'ar' ? 'الاسم' : 'Name'}</FormLabel>
                <FormControl>
                  <Input placeholder={namePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={emailPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ar' ? 'الموضوع' : 'Subject'}</FormLabel>
              <FormControl>
                <Input placeholder={subjectPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ar' ? 'الرسالة' : 'Message'}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={messagePlaceholder} 
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Honeypot field - hidden from users but bots will fill it */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem style={{ display: 'none' }}>
              <FormControl>
                <Input 
                  tabIndex={-1} 
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {/* Captcha */}
        <FormField
          control={form.control}
          name="captcha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'ar' ? 'تحقق الأمان' : 'Security Check'}
              </FormLabel>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/50 p-2 px-4 rounded flex items-center">
                  <span>{captcha.num1} + {captcha.num2} = ?</span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={regenerateCaptcha}
                  title={language === 'ar' ? 'تحديث' : 'Refresh'}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <FormControl>
                  <Input 
                    className="w-20" 
                    placeholder="?" 
                    {...field}
                    onChange={e => {
                      // Only allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      field.onChange(value);
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>
                {language === 'ar' 
                  ? 'يرجى حل المسألة الرياضية البسيطة للمساعدة في منع الرسائل الآلية'
                  : 'Please solve this simple math problem to help prevent automated messages'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default SecureContactForm;

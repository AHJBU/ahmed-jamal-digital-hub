
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  data?: {
    headline?: string;
    subheadline?: string;
    bio?: string;
    ctaText?: string;
    profileImage?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { language, translations } = useSettings();
  const t = translations.home;
  const navigate = useNavigate();

  // Use data from props if available, otherwise use translations
  const headline = data?.headline || t.headline;
  const subheadline = data?.subheadline || t.subheadline;
  const bio = data?.bio || t.bio;
  const ctaText = data?.ctaText || t.cta;
  
  // Default placeholder image if none provided
  const profileImage = data?.profileImage || '/placeholder.svg';

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`${language === 'ar' ? 'order-2' : 'order-1'} animate-fade-in`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">
              {headline}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
              {subheadline}
            </h2>
            <p className="text-lg mb-8 max-w-md">
              {bio}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/portfolio')}
              className="group"
            >
              {ctaText}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          <div className={`${language === 'ar' ? 'order-1' : 'order-2'} flex justify-center animate-fade-in`}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-blue-600 opacity-70 blur-xl"></div>
              <img 
                src={profileImage} 
                alt={headline} 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 border-background"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

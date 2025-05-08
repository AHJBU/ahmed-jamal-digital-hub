
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Types for site settings
interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteAuthor: string;
  maintenanceMode: boolean;
  favicon: string;
  siteLanguage: string;
  siteTheme: string;
  logoUrl: string;
}

// Types for profile data
interface SocialMedia {
  [key: string]: string;
}

interface ProfileData {
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  bioAr: string;
  position: string;
  positionAr: string;
  avatar: string;
  socialMedia: SocialMedia;
}

// Context interface
interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  saveSettings: () => void;
  profileData: ProfileData;
  updateProfileData: (newProfileData: Partial<ProfileData>) => void;
  saveProfileData: () => void;
}

// Default values
const defaultSettings: SiteSettings = {
  siteName: 'Ahmed Jamal - Portfolio & Blog',
  siteDescription: 'Personal portfolio and blog showcasing my work and thoughts.',
  siteAuthor: 'Ahmed Jamal',
  maintenanceMode: false,
  favicon: '/favicon.ico',
  siteLanguage: 'en',
  siteTheme: 'light',
  logoUrl: '',
};

const defaultProfileData: ProfileData = {
  name: 'Ahmed Jamal',
  nameAr: 'أحمد جمال',
  email: 'contact@ahmedjamal.com',
  phone: '+123 456 7890',
  location: 'Riyadh, Saudi Arabia',
  bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
  bioAr: 'محترف رقمي متخصص في وسائل التواصل الاجتماعي، التصميم الجرافيكي، تطوير الويب، والتدريب.',
  position: 'Digital Professional',
  positionAr: 'محترف رقمي',
  avatar: '/placeholder.svg',
  socialMedia: {},
};

// Create context
const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

// Provider component
export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    // Load from localStorage if available
    const savedSettings = localStorage.getItem('site-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Load from localStorage if available
    const savedProfile = localStorage.getItem('profile-data');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfileData;
  });

  // Update document title when settings change
  useEffect(() => {
    document.title = settings.siteName;
  }, [settings.siteName]);

  // Update settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem('site-settings', JSON.stringify(settings));
      toast({
        title: "Settings Saved",
        description: "Your site settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving site settings:", error);
      toast({
        title: "Error Saving Settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update profile data
  const updateProfileData = (newProfileData: Partial<ProfileData>) => {
    setProfileData(prev => {
      // Handle special case for socialMedia to ensure nested updates work correctly
      if (newProfileData.socialMedia) {
        return {
          ...prev,
          ...newProfileData,
          socialMedia: { ...prev.socialMedia, ...newProfileData.socialMedia }
        };
      }
      
      return { ...prev, ...newProfileData };
    });
  };

  // Save profile data to localStorage
  const saveProfileData = () => {
    try {
      localStorage.setItem('profile-data', JSON.stringify(profileData));
      toast({
        title: "Profile Saved",
        description: "Your profile data has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile data:", error);
      toast({
        title: "Error Saving Profile",
        description: "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contextValue: SiteSettingsContextType = {
    settings,
    updateSettings,
    saveSettings,
    profileData,
    updateProfileData,
    saveProfileData,
  };

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

// Custom hook for accessing the context
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

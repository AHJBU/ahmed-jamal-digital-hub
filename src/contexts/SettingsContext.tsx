
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ar' | 'en';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: Record<string, any>;
}

export const defaultTranslations = {
  en: {
    nav: {
      home: "Home",
      cv: "Resume",
      portfolio: "Portfolio",
      apps: "Applications",
      training: "Training",
      blog: "Blog",
      contact: "Contact",
      about: "About Me",
      achievements: "Achievements",
      literature: "Literature",
      press: "Press",
      resources: "Resources"
    },
    home: {
      headline: "Ahmed Jamal",
      subheadline: "Digital Professional",
      cta: "View My Work",
      bio: "Expert in social media, graphic design, web development, and training"
    },
    footer: {
      rights: "All Rights Reserved",
      madeWith: "Made with passion"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      cv: "السيرة الذاتية",
      portfolio: "الأعمال",
      apps: "التطبيقات",
      training: "التدريب",
      blog: "المدونة",
      contact: "التواصل",
      about: "عني",
      achievements: "الإنجازات",
      literature: "كتابات",
      press: "في الإعلام",
      resources: "الملفات"
    },
    home: {
      headline: "أحمد جمال",
      subheadline: "محترف رقمي",
      cta: "استعرض أعمالي",
      bio: "خبير في وسائل التواصل الاجتماعي والتصميم الجرافيكي وتطوير الويب والتدريب"
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      madeWith: "صنع بشغف"
    }
  }
};

const SettingsContext = createContext<SettingsContextType>({
  language: 'en',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  translations: defaultTranslations.en,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [translations, setTranslations] = useState(defaultTranslations.en);

  // Set the language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setTranslations(defaultTranslations[lang]);
    document.documentElement.lang = lang;
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  // Set the theme
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize settings from local storage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language || 'en';
    const savedTheme = localStorage.getItem('theme') as Theme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    handleLanguageChange(savedLanguage);
    handleThemeChange(savedTheme);
  }, []);

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
  }, [language, theme]);

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        setLanguage: handleLanguageChange, 
        theme, 
        setTheme: handleThemeChange, 
        translations 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

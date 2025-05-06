
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Literature: React.FC = () => {
  const { language, translations } = useSettings();
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock literature data
  const literatureItems = [
    {
      id: 1,
      title: language === 'ar' ? 'رحلة في عالم التصميم' : 'Journey in the World of Design',
      category: language === 'ar' ? 'مقالات' : 'Articles',
      image: '/placeholder.svg',
      excerpt: language === 'ar' 
        ? 'تأملات عميقة في فلسفة التصميم والإبداع في العصر الرقمي'
        : 'Deep reflections on design philosophy and creativity in the digital age',
      date: '2023-05-10'
    },
    {
      id: 2,
      title: language === 'ar' ? 'اقتباسات ملهمة' : 'Inspiring Quotes',
      category: language === 'ar' ? 'اقتباسات' : 'Quotes',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'مجموعة من الاقتباسات التي ألهمتني في رحلتي المهنية'
        : 'A collection of quotes that have inspired me in my professional journey',
      date: '2023-04-22'
    },
    {
      id: 3,
      title: language === 'ar' ? 'مستقبل التكنولوجيا' : 'The Future of Technology',
      category: language === 'ar' ? 'مقالات' : 'Articles',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'نظرة على الاتجاهات التكنولوجية القادمة وتأثيرها على حياتنا'
        : 'A look at upcoming technological trends and their impact on our lives',
      date: '2023-03-15'
    },
    {
      id: 4,
      title: language === 'ar' ? 'أفكار إبداعية' : 'Creative Thoughts',
      category: language === 'ar' ? 'أفكار' : 'Thoughts',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'مجموعة من الأفكار الإبداعية التي تسعى لإلهام المصممين والمطورين'
        : 'A series of creative ideas aimed at inspiring designers and developers',
      date: '2023-02-28'
    }
  ];

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All' },
    { id: 'articles', name: language === 'ar' ? 'مقالات' : 'Articles' },
    { id: 'quotes', name: language === 'ar' ? 'اقتباسات' : 'Quotes' },
    { id: 'thoughts', name: language === 'ar' ? 'أفكار' : 'Thoughts' }
  ];

  const filteredItems = activeTab === 'all' 
    ? literatureItems 
    : literatureItems.filter(item => {
        const category = item.category.toLowerCase();
        return category.includes(activeTab) || 
               (activeTab === 'articles' && category.includes('article')) ||
               (activeTab === 'quotes' && category.includes('quote')) ||
               (activeTab === 'thoughts' && category.includes('thought'));
      });

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'الكتابات والاقتباسات' : 'Literature & Quotes'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'ar' 
            ? 'مجموعة من الكتابات الشخصية والاقتباسات الملهمة'
            : 'A collection of personal writings and inspiring quotes'}
        </p>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link to={`/literature/${item.id}`} key={item.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-2">{item.excerpt}</p>
                  <p className="text-sm font-medium">
                    {new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Literature;

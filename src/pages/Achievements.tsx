
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Achievements: React.FC = () => {
  const { language, translations } = useSettings();
  
  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: language === 'ar' ? 'جائزة أفضل مصمم للعام' : 'Best Designer of the Year Award',
      category: language === 'ar' ? 'تصميم' : 'Design',
      image: '/placeholder.svg',
      summary: language === 'ar' 
        ? 'حصلت على جائزة أفضل مصمم للعام 2023 من مؤسسة التصميم العالمية'
        : 'Received the Best Designer of the Year 2023 award from Global Design Institute',
      date: '2023'
    },
    {
      id: 2,
      title: language === 'ar' ? 'شهادة تطوير الويب المتقدمة' : 'Advanced Web Development Certification',
      category: language === 'ar' ? 'تطوير' : 'Development',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'أكملت شهادة تطوير الويب المتقدمة مع التركيز على تقنيات الواجهة الأمامية الحديثة'
        : 'Completed Advanced Web Development certification focusing on modern frontend technologies',
      date: '2022'
    },
    {
      id: 3,
      title: language === 'ar' ? 'جائزة أفضل تطبيق' : 'Best App Award',
      category: language === 'ar' ? 'تطبيقات' : 'Apps',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'فاز تطبيق "المساعد الذكي" بجائزة أفضل تطبيق في معرض التكنولوجيا'
        : '"Smart Assistant" app won Best App Award at the Tech Expo',
      date: '2021'
    },
    {
      id: 4,
      title: language === 'ar' ? 'المتحدث الرئيسي' : 'Keynote Speaker',
      category: language === 'ar' ? 'تدريب' : 'Training',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'كنت المتحدث الرئيسي في مؤتمر تقنيات الويب 2023'
        : 'Was the keynote speaker at Web Technologies Conference 2023',
      date: '2023'
    }
  ];

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'الإنجازات والنجاحات' : 'Achievements & Success Stories'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'ar' 
            ? 'استعراض أبرز الإنجازات والجوائز والقصص الناجحة في مسيرتي المهنية'
            : 'Showcasing key achievements, awards, and success stories throughout my professional journey'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Link to={`/achievements/${achievement.id}`} key={achievement.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3">
                    {achievement.category}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground mb-2">{achievement.summary}</p>
                  <p className="text-sm font-medium">{achievement.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;

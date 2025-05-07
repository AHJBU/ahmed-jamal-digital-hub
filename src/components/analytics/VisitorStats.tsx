
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock analytics data
const visitorData = {
  daily: [
    { name: 'Mon', visitors: 450 },
    { name: 'Tue', visitors: 630 },
    { name: 'Wed', visitors: 850 },
    { name: 'Thu', visitors: 790 },
    { name: 'Fri', visitors: 550 },
    { name: 'Sat', visitors: 380 },
    { name: 'Sun', visitors: 420 },
  ],
  monthly: [
    { name: 'Jan', visitors: 2800 },
    { name: 'Feb', visitors: 3200 },
    { name: 'Mar', visitors: 4100 },
    { name: 'Apr', visitors: 3900 },
    { name: 'May', visitors: 4600 },
    { name: 'Jun', visitors: 5200 },
  ],
  sources: [
    { name: 'Direct', value: 35 },
    { name: 'Search', value: 28 },
    { name: 'Social', value: 22 },
    { name: 'Referral', value: 15 },
  ],
  pages: [
    { name: 'Home', views: 3250 },
    { name: 'Portfolio', views: 2430 },
    { name: 'CV', views: 1980 },
    { name: 'Blog', views: 1540 },
    { name: 'Contact', views: 890 },
  ],
  // Add more metrics as needed
};

interface VisitorStatsProps {
  className?: string;
}

const VisitorStats: React.FC<VisitorStatsProps> = ({ className }) => {
  return (
    <div className={className}>
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Visitors</CardTitle>
                <CardDescription>Visitor count for the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <AreaChart 
                  data={visitorData.daily} 
                  categories={['visitors']} 
                  index="name" 
                  colors={['blue']}
                  valueFormatter={(value: number) => `${value} visitors`} 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart 
                  data={visitorData.sources} 
                  category="value" 
                  index="name"
                  valueFormatter={(value: number) => `${value}%`}
                  colors={["indigo", "blue", "teal", "amber"]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Traffic</CardTitle>
              <CardDescription>Visitor trends over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <AreaChart 
                data={visitorData.monthly} 
                categories={['visitors']} 
                index="name"
                colors={['blue']}
                valueFormatter={(value: number) => `${value} visitors`} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most viewed pages on your site</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <BarChart 
                data={visitorData.pages} 
                categories={['views']} 
                index="name"
                colors={['blue']}
                valueFormatter={(value: number) => `${value} views`} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources Breakdown</CardTitle>
              <CardDescription>Detailed analysis of traffic sources</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <PieChart 
                data={visitorData.sources} 
                category="value" 
                index="name"
                valueFormatter={(value: number) => `${value}%`}
                colors={["indigo", "blue", "teal", "amber"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisitorStats;

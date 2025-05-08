
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import VisitorStats from '@/components/analytics/VisitorStats';
import DetailedVisitorStats from '@/components/analytics/DetailedVisitorStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6">
        <ScrollReveal>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <VisitorStats />
                </TabsContent>
                <TabsContent value="analytics">
                  <p className="text-muted-foreground py-4">Detailed analytics coming soon...</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ScrollReveal>
        
        <ScrollReveal>
          <DetailedVisitorStats />
        </ScrollReveal>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

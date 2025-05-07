
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import VisitorStats from '@/components/analytics/VisitorStats';
import { Eye, MessageSquare, Download, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock statistics
  const stats = [
    { name: 'Total Page Views', value: '12,543', icon: Eye },
    { name: 'New Messages', value: '27', icon: MessageSquare },
    { name: 'CV Downloads', value: '356', icon: Download },
    { name: 'Unique Visitors', value: '4,281', icon: Users }
  ];

  // Mock recent activities
  const activities = [
    { action: 'Updated portfolio item', target: 'Mobile App Design', time: '2 hours ago' },
    { action: 'Added new blog post', target: 'Design Trends 2025', time: '1 day ago' },
    { action: 'Received new message', target: 'John Smith', time: '3 days ago' },
    { action: 'Updated CV', target: 'Resume file', time: '1 week ago' }
  ];

  // Check if database is connected
  const isDatabaseConnected = false; // This would come from an API call in a real app

  return (
    <ProtectedRoute>
      <AdminLayout title="Dashboard">
        {/* Database Connection Alert */}
        {!isDatabaseConnected && (
          <ScrollReveal>
            <Alert className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
              <AlertTitle className="flex items-center">
                Database Connection Required
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  Action Needed
                </Badge>
              </AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Your application is currently using mock data. To use real data, please configure your database
                  connection in <code className="text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-1 rounded">src/config/database.config.ts</code>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Once connected, your analytics, blog posts, and resources will be saved to and loaded from your database.
                </p>
              </AlertDescription>
            </Alert>
          </ScrollReveal>
        )}
        
        {/* Welcome Message */}
        <ScrollReveal>
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border">
            <CardContent className="p-6">
              <h3 className="text-2xl font-medium mb-2">Welcome back, {user?.name || 'Admin'}</h3>
              <p className="text-muted-foreground">
                Last login: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">{stat.name}</p>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Analytics */}
        <ScrollReveal delay={0.3} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitorStats />
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <ScrollReveal delay={0.4}>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.target}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Quick Actions */}
          <ScrollReveal delay={0.5}>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <p className="font-medium">Add New Portfolio Item</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <p className="font-medium">Update Resume/CV</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <p className="font-medium">Write New Blog Post</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <p className="font-medium">View Messages</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;


import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  // Mock statistics
  const stats = [
    { name: 'Total Page Views', value: '12,543' },
    { name: 'Visitors This Month', value: '4,281' },
    { name: 'New Messages', value: '27' },
    { name: 'CV Downloads', value: '356' }
  ];

  // Mock recent activities
  const activities = [
    { action: 'Updated portfolio item', target: 'Mobile App Design', time: '2 hours ago' },
    { action: 'Added new blog post', target: 'Design Trends 2025', time: '1 day ago' },
    { action: 'Received new message', target: 'John Smith', time: '3 days ago' },
    { action: 'Updated CV', target: 'Resume file', time: '1 week ago' }
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{stat.name}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
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

        {/* Quick Actions */}
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

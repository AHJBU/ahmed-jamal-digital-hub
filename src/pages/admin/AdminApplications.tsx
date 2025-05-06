
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock application data
const applications = [
  {
    id: 1,
    title: 'Task Manager Pro',
    category: 'web',
    platforms: ['web', 'ios', 'android'],
    status: 'published',
    lastUpdated: '2025-04-15'
  },
  {
    id: 2,
    title: 'Design Portfolio',
    category: 'web',
    platforms: ['web'],
    status: 'published',
    lastUpdated: '2025-04-10'
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    category: 'mobile',
    platforms: ['ios', 'android'],
    status: 'published',
    lastUpdated: '2025-04-05'
  },
  {
    id: 4,
    title: 'Language Learning App',
    category: 'mobile',
    platforms: ['ios', 'android'],
    status: 'draft',
    lastUpdated: '2025-04-02'
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    category: 'web',
    platforms: ['web'],
    status: 'published',
    lastUpdated: '2025-03-28'
  }
];

const AdminApplications: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Application",
      description: `Editing application with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Application",
      description: `Deleting application with ID: ${id}`,
      variant: "destructive",
    });
  };

  return (
    <AdminLayout title="Applications">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {app.category === 'web' ? 'Web App' : 'Mobile App'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {app.platforms.map((platform, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={app.status === 'published' ? 'default' : 'outline'}
                      className={app.status === 'draft' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(app.lastUpdated)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(app.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(app.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminApplications;

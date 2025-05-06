
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Eye, Calendar, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock training data
const trainings = [
  {
    id: 1,
    title: 'Modern Web Development with React',
    category: 'webDev',
    level: 'intermediate',
    duration: '24 hours',
    registrations: 45,
    status: 'active',
    lastUpdated: '2025-04-15'
  },
  {
    id: 2,
    title: 'UX/UI Design Fundamentals',
    category: 'design',
    level: 'beginner',
    duration: '16 hours',
    registrations: 32,
    status: 'active',
    lastUpdated: '2025-04-10'
  },
  {
    id: 3,
    title: 'Mobile App Development with Flutter',
    category: 'mobileDev',
    level: 'intermediate',
    duration: '30 hours',
    registrations: 28,
    status: 'active',
    lastUpdated: '2025-04-05'
  },
  {
    id: 4,
    title: 'Social Media Marketing Strategies',
    category: 'social',
    level: 'beginner',
    duration: '12 hours',
    registrations: 50,
    status: 'draft',
    lastUpdated: '2025-04-02'
  },
  {
    id: 5,
    title: 'Advanced Backend Development with Node.js',
    category: 'webDev',
    level: 'advanced',
    duration: '20 hours',
    registrations: 18,
    status: 'completed',
    lastUpdated: '2025-03-28'
  }
];

const categoriesMap: Record<string, string> = {
  'webDev': 'Web Development',
  'mobileDev': 'Mobile Development',
  'design': 'Design',
  'social': 'Social Media',
  'other': 'Other'
};

const levelsMap: Record<string, string> = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

const AdminTraining: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'outline';
    }
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Training",
      description: `Editing training with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Training",
      description: `Deleting training with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleViewRegistrations = (id: number) => {
    toast({
      title: "View Registrations",
      description: `Viewing registrations for training with ID: ${id}`,
    });
  };

  return (
    <AdminLayout title="Training & Workshops">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search trainings..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Training
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Trainings</p>
                <p className="text-3xl font-bold">
                  {trainings.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-3xl font-bold">
                  {trainings.reduce((sum, t) => sum + t.registrations, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Training Hours</p>
                <p className="text-3xl font-bold">
                  {trainings.reduce((sum, t) => sum + parseInt(t.duration.split(' ')[0]), 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Training Courses & Workshops</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {categoriesMap[training.category] || training.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {levelsMap[training.level] || training.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell>{training.registrations}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={training.status === 'active' ? 'default' : 'outline'}
                      className={getStatusColor(training.status)}
                    >
                      {training.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewRegistrations(training.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Registrations</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(training.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(training.id)}>
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

export default AdminTraining;

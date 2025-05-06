
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Image, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: 'Best Designer of the Year Award',
    category: 'Award',
    date: '2023-06-15',
    location: 'Dubai, UAE',
    featured: true,
    imagesCount: 5
  },
  {
    id: 2,
    title: 'Advanced Web Development Certification',
    category: 'Certification',
    date: '2022-11-30',
    location: 'Online',
    featured: false,
    imagesCount: 2
  },
  {
    id: 3,
    title: 'Best App Award for "Smart Assistant"',
    category: 'Award',
    date: '2021-09-22',
    location: 'San Francisco, USA',
    featured: true,
    imagesCount: 3
  },
  {
    id: 4,
    title: 'Keynote Speaker at Web Tech Conference',
    category: 'Recognition',
    date: '2023-03-15',
    location: 'London, UK',
    featured: false,
    imagesCount: 4
  },
  {
    id: 5,
    title: 'Digital Transformation Project Success',
    category: 'Success Story',
    date: '2022-07-10',
    location: 'Riyadh, KSA',
    featured: true,
    imagesCount: 6
  }
];

const AdminAchievements: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Achievement",
      description: `Editing achievement with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Achievement",
      description: `Deleting achievement with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleManageImages = (id: number) => {
    toast({
      title: "Manage Images",
      description: `Managing images for achievement with ID: ${id}`,
    });
  };

  return (
    <AdminLayout title="Achievements & Success Stories">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search achievements..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Achievement
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Achievements</p>
                <p className="text-3xl font-bold">{achievements.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured Items</p>
                <p className="text-3xl font-bold">
                  {achievements.filter(achievement => achievement.featured).length}
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-3xl font-bold">
                  {achievements.reduce((sum, achievement) => sum + achievement.imagesCount, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Achievements & Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Images</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium">{achievement.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {achievement.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(achievement.date)}</TableCell>
                  <TableCell>{achievement.location}</TableCell>
                  <TableCell>
                    <Badge variant={achievement.featured ? 'default' : 'outline'}>
                      {achievement.featured ? 'Featured' : 'Regular'}
                    </Badge>
                  </TableCell>
                  <TableCell>{achievement.imagesCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleManageImages(achievement.id)}>
                        <Image className="h-4 w-4" />
                        <span className="sr-only">Images</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(achievement.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(achievement.id)}>
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

export default AdminAchievements;

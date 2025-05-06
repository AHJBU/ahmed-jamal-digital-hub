
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, FileDown, Upload, Eye } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock resources data
const resources = [
  {
    id: 1,
    title: 'Curriculum Vitae (CV)',
    description: 'Official and updated curriculum vitae',
    category: 'CV',
    type: 'PDF',
    size: '1.2 MB',
    downloadable: true,
    featured: true,
    downloads: 145
  },
  {
    id: 2,
    title: 'Web Design Basics - A Simple Guide',
    description: 'A comprehensive guide to web design basics for beginners',
    category: 'Design',
    type: 'PDF',
    size: '3.5 MB',
    downloadable: true,
    featured: false,
    downloads: 87
  },
  {
    id: 3,
    title: 'Project Plan Template',
    description: 'Ready-to-use template for planning digital projects',
    category: 'Templates',
    type: 'DOCX',
    size: '0.8 MB',
    downloadable: true,
    featured: false,
    downloads: 63
  },
  {
    id: 4,
    title: 'React.js Fundamentals - Slides',
    description: 'Presentation slides from React.js workshop',
    category: 'Development',
    type: 'PPTX',
    size: '5.2 MB',
    downloadable: true,
    featured: true,
    downloads: 104
  },
  {
    id: 5,
    title: 'UX Design Wireframes',
    description: 'Collection of editable UX design wireframes',
    category: 'Design',
    type: 'AI',
    size: '15.7 MB',
    downloadable: false,
    featured: false,
    downloads: 0
  }
];

const AdminResources: React.FC = () => {
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Resource",
      description: `Editing resource with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Resource",
      description: `Deleting resource with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleToggleDownloadable = (id: number, currentValue: boolean) => {
    toast({
      title: `${currentValue ? 'Disable' : 'Enable'} Downloads`,
      description: `${currentValue ? 'Disabled' : 'Enabled'} downloads for resource with ID: ${id}`,
    });
  };

  const handleToggleFeatured = (id: number, currentValue: boolean) => {
    toast({
      title: `${currentValue ? 'Unmark' : 'Mark'} as Featured`,
      description: `${currentValue ? 'Removed from' : 'Added to'} featured resources for resource with ID: ${id}`,
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Resource",
      description: `Viewing resource with ID: ${id}`,
    });
  };

  const getTotalDownloads = () => {
    return resources.reduce((sum, resource) => sum + resource.downloads, 0);
  };

  const getDownloadableCount = () => {
    return resources.filter(resource => resource.downloadable).length;
  };

  return (
    <AdminLayout title="Files & Resources">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload New Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-3xl font-bold">{resources.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads Available</p>
                <p className="text-3xl font-bold">{getDownloadableCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured Resources</p>
                <p className="text-3xl font-bold">{resources.filter(r => r.featured).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-3xl font-bold">{getTotalDownloads()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CV Resource Management */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>CV Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div>
                <p className="font-medium">Current CV File</p>
                <p className="text-sm text-muted-foreground">ahmed-jamal-cv-2023.pdf (1.2 MB)</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="cv-downloadable" defaultChecked />
                  <label htmlFor="cv-downloadable">Allow CV downloads</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="cv-featured" defaultChecked />
                  <label htmlFor="cv-featured">Show as featured resource</label>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last updated: May 1, 2023 • 145 downloads</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview CV
              </Button>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload New CV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Downloadable</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileDown className="h-4 w-4 text-muted-foreground" />
                      {resource.title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {resource.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.size}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={resource.downloadable}
                      onCheckedChange={() => handleToggleDownloadable(resource.id, resource.downloadable)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={resource.featured}
                      onCheckedChange={() => handleToggleFeatured(resource.id, resource.featured)}
                    />
                  </TableCell>
                  <TableCell>{resource.downloads}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(resource.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(resource.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(resource.id)}>
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

export default AdminResources;

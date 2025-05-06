
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Image } from 'lucide-react';

const AdminProfile: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Jamal',
    nameAr: 'أحمد جمال',
    email: 'contact@ahmedjamal.com',
    phone: '+123 456 7890',
    location: 'Riyadh, Saudi Arabia',
    bio: 'Digital professional with expertise in social media, graphic design, web development, and training.',
    bioAr: 'محترف رقمي متخصص في وسائل التواصل الاجتماعي، التصميم الجرافيكي، تطوير الويب، والتدريب.',
    position: 'Digital Professional',
    positionAr: 'محترف رقمي',
    avatar: '/placeholder.svg'
  });

  const profileForm = useForm({
    defaultValues: profileData
  });

  const handleSubmit = (data: typeof profileData) => {
    setProfileData(data);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  return (
    <AdminLayout title="Profile Management">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl">Personal Profile</CardTitle>
              <CardDescription>
                Manage your personal information and public profile
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    profileForm.reset(profileData);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={profileForm.handleSubmit(handleSubmit)}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General Info</TabsTrigger>
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="avatar">Profile Photo</TabsTrigger>
              </TabsList>
              
              {isEditing ? (
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleSubmit)} className="space-y-6">
                    <TabsContent value="general" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name (English)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name in English" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="nameAr"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name (Arabic)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name in Arabic" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position (English)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your professional title in English" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="positionAr"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position (Arabic)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your professional title in Arabic" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Your location (city, country)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bio" className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biography (English)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write a short bio about yourself in English" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="bioAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biography (Arabic)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write a short bio about yourself in Arabic" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="social" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {['LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'GitHub', 'Behance'].map((platform) => (
                          <div key={platform}>
                            <Label htmlFor={platform.toLowerCase()}>{platform}</Label>
                            <Input 
                              id={platform.toLowerCase()} 
                              placeholder={`Your ${platform} profile URL`} 
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="avatar" className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileData.avatar} alt="Profile" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex flex-col gap-2">
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Image className="h-4 w-4" /> Upload new image
                          </Button>
                          <Button type="button" variant="outline" className="text-destructive">
                            Remove image
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              ) : (
                <>
                  <TabsContent value="general">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Name (English)</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <p>{profileData.name}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Name (Arabic)</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <p>{profileData.nameAr}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <p>{profileData.email}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <p>{profileData.phone}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Position (English)</Label>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <p>{profileData.position}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Position (Arabic)</Label>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <p>{profileData.positionAr}</p>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-muted-foreground">Location</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <p>{profileData.location}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bio">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Biography (English)</Label>
                        <p className="text-sm">{profileData.bio}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Biography (Arabic)</Label>
                        <p className="text-sm">{profileData.bioAr}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social">
                    <div className="grid md:grid-cols-2 gap-6">
                      {['LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'GitHub', 'Behance'].map((platform) => (
                        <div key={platform} className="space-y-2">
                          <Label className="text-muted-foreground">{platform}</Label>
                          <p className="text-sm">Not connected</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="avatar">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar} alt="Profile" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="text-sm">Current profile photo</p>
                      </div>
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Educational Qualifications</CardTitle>
            <CardDescription>Manage your degrees, certificates and educational background</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Add and manage your educational qualifications</p>
              <Button className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Add Qualification
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Sample education item */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Bachelor of Computer Science</h3>
                    <p className="text-sm text-muted-foreground">University of Technology, 2016-2020</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
              
              {/* Sample education item */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Master's in Digital Media</h3>
                    <p className="text-sm text-muted-foreground">Creative Arts Institute, 2020-2022</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Manage your professional work experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Add and manage your work history</p>
              <Button className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Add Experience
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Sample work experience */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Senior Web Developer</h3>
                    <p className="text-sm text-muted-foreground">Tech Solutions Inc., 2022-Present</p>
                    <p className="text-sm mt-2">Led the frontend development team in creating responsive web applications using React and TypeScript. Implemented modern UI/UX practices and improved site performance by 40%.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
              
              {/* Sample work experience */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">UI/UX Designer</h3>
                    <p className="text-sm text-muted-foreground">Creative Studio, 2019-2022</p>
                    <p className="text-sm mt-2">Designed user interfaces for web and mobile applications. Conducted user research and usability testing to improve product designs. Created design systems for consistency across products.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Manage your professional skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Add and manage your technical and soft skills</p>
              <Button className="flex items-center gap-2">
                <Award className="h-4 w-4" /> Add Skill
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Web Development</Label>
                      <span className="text-sm">95%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Graphic Design</Label>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>UI/UX Design</Label>
                      <span className="text-sm">90%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Communication</Label>
                      <span className="text-sm">90%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Leadership</Label>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Problem Solving</Label>
                      <span className="text-sm">95%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;


import React, { useState, useEffect } from 'react';
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
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Image, Plus, Pencil, Trash, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';

// Education form type
interface EducationFormData {
  id?: number;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

// Work experience form type
interface WorkExperienceFormData {
  id?: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

// Skill form type
interface SkillFormData {
  id?: number;
  name: string;
  percentage: number;
  category: 'technical' | 'soft';
}

const AdminProfile: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfileData, saveProfileData } = useSiteSettings();
  
  // Dialogs state
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isWorkDialogOpen, setIsWorkDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<EducationFormData | null>(null);
  const [currentWork, setCurrentWork] = useState<WorkExperienceFormData | null>(null);
  const [currentSkill, setCurrentSkill] = useState<SkillFormData | null>(null);
  
  // Education, work, and skills state
  const [education, setEducation] = useState<EducationFormData[]>([
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2016-2020",
      description: "Computer Science and Information Systems"
    },
    {
      id: 2,
      degree: "Master's in Digital Media",
      institution: "Creative Arts Institute",
      period: "2020-2022",
      description: "Digital Media and Content Creation"
    }
  ]);

  const [workExperience, setWorkExperience] = useState<WorkExperienceFormData[]>([
    {
      id: 1,
      title: "Senior Web Developer",
      company: "Tech Solutions Inc.",
      period: "2022-Present",
      description: "Led the frontend development team in creating responsive web applications using React and TypeScript. Implemented modern UI/UX practices and improved site performance by 40%."
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Studio",
      period: "2019-2022",
      description: "Designed user interfaces for web and mobile applications. Conducted user research and usability testing to improve product designs. Created design systems for consistency across products."
    }
  ]);

  const [skills, setSkills] = useState<SkillFormData[]>([
    { id: 1, name: "Web Development", percentage: 95, category: "technical" },
    { id: 2, name: "Graphic Design", percentage: 85, category: "technical" },
    { id: 3, name: "UI/UX Design", percentage: 90, category: "technical" },
    { id: 4, name: "Communication", percentage: 90, category: "soft" },
    { id: 5, name: "Leadership", percentage: 85, category: "soft" },
    { id: 6, name: "Problem Solving", percentage: 95, category: "soft" }
  ]);

  // Setup form with profile data
  const profileForm = useForm({
    defaultValues: profileData
  });

  useEffect(() => {
    profileForm.reset(profileData);
  }, [profileData]);

  // Education form
  const educationForm = useForm<EducationFormData>({
    defaultValues: {
      degree: "",
      institution: "",
      period: "",
      description: ""
    }
  });

  // Work experience form
  const workForm = useForm<WorkExperienceFormData>({
    defaultValues: {
      title: "",
      company: "",
      period: "",
      description: ""
    }
  });

  // Skill form
  const skillForm = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      percentage: 80,
      category: "technical"
    }
  });

  // Handle profile form submission
  const handleSubmit = (data: typeof profileData) => {
    updateProfileData(data);
    saveProfileData();
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  // Handle avatar upload
  const handleAvatarUpload = (url: string) => {
    updateProfileData({ ...profileData, avatar: url });
    saveProfileData();
    toast({
      title: "Profile Photo Updated",
      description: "Your profile photo has been updated successfully."
    });
  };

  // Education handlers
  const openAddEducationDialog = () => {
    setCurrentEducation(null);
    educationForm.reset({
      degree: "",
      institution: "",
      period: "",
      description: ""
    });
    setIsEducationDialogOpen(true);
  };

  const openEditEducationDialog = (edu: EducationFormData) => {
    setCurrentEducation(edu);
    educationForm.reset(edu);
    setIsEducationDialogOpen(true);
  };

  const handleSaveEducation = (data: EducationFormData) => {
    if (currentEducation) {
      // Update existing education
      setEducation(education.map(e => e.id === currentEducation.id ? { ...data, id: currentEducation.id } : e));
    } else {
      // Add new education
      const newId = Math.max(0, ...education.map(e => e.id || 0)) + 1;
      setEducation([...education, { ...data, id: newId }]);
    }
    setIsEducationDialogOpen(false);
    toast({
      title: currentEducation ? "Education Updated" : "Education Added",
      description: `Education qualification has been ${currentEducation ? "updated" : "added"} successfully.`
    });
  };

  const handleDeleteEducation = (id: number) => {
    setEducation(education.filter(e => e.id !== id));
    toast({
      title: "Education Removed",
      description: "Education qualification has been removed successfully.",
      variant: "destructive"
    });
  };

  // Work experience handlers
  const openAddWorkDialog = () => {
    setCurrentWork(null);
    workForm.reset({
      title: "",
      company: "",
      period: "",
      description: ""
    });
    setIsWorkDialogOpen(true);
  };

  const openEditWorkDialog = (work: WorkExperienceFormData) => {
    setCurrentWork(work);
    workForm.reset(work);
    setIsWorkDialogOpen(true);
  };

  const handleSaveWork = (data: WorkExperienceFormData) => {
    if (currentWork) {
      // Update existing work
      setWorkExperience(workExperience.map(w => w.id === currentWork.id ? { ...data, id: currentWork.id } : w));
    } else {
      // Add new work
      const newId = Math.max(0, ...workExperience.map(w => w.id || 0)) + 1;
      setWorkExperience([...workExperience, { ...data, id: newId }]);
    }
    setIsWorkDialogOpen(false);
    toast({
      title: currentWork ? "Work Experience Updated" : "Work Experience Added",
      description: `Work experience has been ${currentWork ? "updated" : "added"} successfully.`
    });
  };

  const handleDeleteWork = (id: number) => {
    setWorkExperience(workExperience.filter(w => w.id !== id));
    toast({
      title: "Work Experience Removed",
      description: "Work experience has been removed successfully.",
      variant: "destructive"
    });
  };

  // Skill handlers
  const openAddSkillDialog = () => {
    setCurrentSkill(null);
    skillForm.reset({
      name: "",
      percentage: 80,
      category: "technical"
    });
    setIsSkillDialogOpen(true);
  };

  const openEditSkillDialog = (skill: SkillFormData) => {
    setCurrentSkill(skill);
    skillForm.reset(skill);
    setIsSkillDialogOpen(true);
  };

  const handleSaveSkill = (data: SkillFormData) => {
    if (currentSkill) {
      // Update existing skill
      setSkills(skills.map(s => s.id === currentSkill.id ? { ...data, id: currentSkill.id } : s));
    } else {
      // Add new skill
      const newId = Math.max(0, ...skills.map(s => s.id || 0)) + 1;
      setSkills([...skills, { ...data, id: newId }]);
    }
    setIsSkillDialogOpen(false);
    toast({
      title: currentSkill ? "Skill Updated" : "Skill Added",
      description: `Skill has been ${currentSkill ? "updated" : "added"} successfully.`
    });
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    toast({
      title: "Skill Removed",
      description: "Skill has been removed successfully.",
      variant: "destructive"
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
                          <FormField
                            key={platform}
                            control={profileForm.control}
                            name={`socialMedia.${platform.toLowerCase()}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{platform}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={`Your ${platform} profile URL`}
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="avatar" className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileData.avatar} alt="Profile" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2">
                          <EnhancedFileUpload
                            endpoint="/api/uploads/avatars"
                            onSuccess={handleAvatarUpload}
                            accept="image/*"
                            maxSize={2}
                            label="Upload New Image"
                            category="avatars"
                            allowDescription={false}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="text-destructive w-full"
                            onClick={() => {
                              updateProfileData({ ...profileData, avatar: '/placeholder.svg' });
                              saveProfileData();
                              toast({
                                title: "Profile Photo Removed",
                                description: "Your profile photo has been removed."
                              });
                            }}
                          >
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
                          <p className="text-sm">
                            {profileData.socialMedia && profileData.socialMedia[platform.toLowerCase()] 
                              ? profileData.socialMedia[platform.toLowerCase()]
                              : "Not connected"}
                          </p>
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Educational Qualifications</CardTitle>
              <CardDescription>Manage your degrees, certificates and educational background</CardDescription>
            </div>
            <Button className="flex items-center gap-2" onClick={openAddEducationDialog}>
              <Plus className="h-4 w-4" /> Add Qualification
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}, {edu.period}</p>
                      {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditEducationDialog(edu)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => handleDeleteEducation(edu.id!)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Manage your professional work experience</CardDescription>
            </div>
            <Button className="flex items-center gap-2" onClick={openAddWorkDialog}>
              <Plus className="h-4 w-4" /> Add Experience
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workExperience.map(work => (
                <div key={work.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{work.title}</h3>
                      <p className="text-sm text-muted-foreground">{work.company}, {work.period}</p>
                      <p className="text-sm mt-2">{work.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditWorkDialog(work)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => handleDeleteWork(work.id!)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Manage your professional skills</CardDescription>
            </div>
            <Button className="flex items-center gap-2" onClick={openAddSkillDialog}>
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills
                    .filter(skill => skill.category === 'technical')
                    .map(skill => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between">
                          <Label>{skill.name}</Label>
                          <span className="text-sm">{skill.percentage}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditSkillDialog(skill)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDeleteSkill(skill.id!)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills
                    .filter(skill => skill.category === 'soft')
                    .map(skill => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between">
                          <Label>{skill.name}</Label>
                          <span className="text-sm">{skill.percentage}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditSkillDialog(skill)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDeleteSkill(skill.id!)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Dialog */}
      <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentEducation ? 'Edit Education' : 'Add Education'}</DialogTitle>
            <DialogDescription>
              {currentEducation ? 'Update your education details' : 'Add a new education qualification'}
            </DialogDescription>
          </DialogHeader>
          <Form {...educationForm}>
            <form onSubmit={educationForm.handleSubmit(handleSaveEducation)} className="space-y-4">
              <FormField
                control={educationForm.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree/Certificate</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science, Certificate in..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationForm.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution/University</FormLabel>
                    <FormControl>
                      <Input placeholder="University name or institution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationForm.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period</FormLabel>
                    <FormControl>
                      <Input placeholder="2010-2014" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details about your studies..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEducationDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Work Experience Dialog */}
      <Dialog open={isWorkDialogOpen} onOpenChange={setIsWorkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentWork ? 'Edit Work Experience' : 'Add Work Experience'}</DialogTitle>
            <DialogDescription>
              {currentWork ? 'Update your work experience details' : 'Add a new work experience'}
            </DialogDescription>
          </DialogHeader>
          <Form {...workForm}>
            <form onSubmit={workForm.handleSubmit(handleSaveWork)} className="space-y-4">
              <FormField
                control={workForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Developer, UX Designer..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={workForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={workForm.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period</FormLabel>
                    <FormControl>
                      <Input placeholder="2018-Present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={workForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Details about your responsibilities and achievements..." 
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsWorkDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Skill Dialog */}
      <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
            <DialogDescription>
              {currentSkill ? 'Update your skill details' : 'Add a new skill'}
            </DialogDescription>
          </DialogHeader>
          <Form {...skillForm}>
            <form onSubmit={skillForm.handleSubmit(handleSaveSkill)} className="space-y-4">
              <FormField
                control={skillForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="React, Communication..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={skillForm.control}
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="85"
                        min={0}
                        max={100}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={skillForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="technical">Technical Skill</option>
                        <option value="soft">Soft Skill</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsSkillDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProfile;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";

// Public Pages
import Index from "./pages/Index";
import CV from "./pages/CV";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Training from "./pages/Training";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Achievements from "./pages/Achievements";
import AchievementDetails from "./pages/AchievementDetails";
import Literature from "./pages/Literature";
import LiteratureItem from "./pages/LiteratureItem";
import About from "./pages/About";
import Press from "./pages/Press";
import Resources from "./pages/Resources";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminTraining from "./pages/admin/AdminTraining";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminLiterature from "./pages/admin/AdminLiterature";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminPress from "./pages/admin/AdminPress";
import AdminResources from "./pages/admin/AdminResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
            <Route path="/training" element={<Training />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/achievements/:id" element={<AchievementDetails />} />
            <Route path="/literature" element={<Literature />} />
            <Route path="/literature/:id" element={<LiteratureItem />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/resources" element={<Resources />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/training" element={<AdminTraining />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/achievements" element={<AdminAchievements />} />
            <Route path="/admin/literature" element={<AdminLiterature />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/press" element={<AdminPress />} />
            <Route path="/admin/resources" element={<AdminResources />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;

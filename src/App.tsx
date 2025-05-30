
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";

// Public Pages
import Index from "./pages/Index";
import CV from "./pages/CV";
import Portfolio from "./pages/Portfolio";
import PortfolioDetails from "./pages/PortfolioDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Training from "./pages/Training";
import TrainingDetails from "./pages/TrainingDetails";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Achievements from "./pages/Achievements";
import AchievementDetails from "./pages/AchievementDetails";
import Literature from "./pages/Literature";
import LiteratureItem from "./pages/LiteratureItem";
import About from "./pages/About";
import Press from "./pages/Press";
import PressDetails from "./pages/PressDetails";
import Resources from "./pages/Resources";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminTwoFactor from "./pages/admin/AdminTwoFactor";
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
import AdminBackup from "./pages/admin/AdminBackup";
import AdminSettings from "./pages/admin/AdminSettings";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SiteSettingsProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/:id" element={<ApplicationDetails />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training/:id" element={<TrainingDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/achievements/:id" element={<AchievementDetails />} />
                <Route path="/literature" element={<Literature />} />
                <Route path="/literature/:id" element={<LiteratureItem />} />
                <Route path="/about" element={<About />} />
                <Route path="/press" element={<Press />} />
                <Route path="/press/:id" element={<PressDetails />} />
                <Route path="/resources" element={<Resources />} />

                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/two-factor" element={<AdminTwoFactor />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
                <Route path="/admin/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
                <Route path="/admin/training" element={<ProtectedRoute><AdminTraining /></ProtectedRoute>} />
                <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
                <Route path="/admin/achievements" element={<ProtectedRoute><AdminAchievements /></ProtectedRoute>} />
                <Route path="/admin/literature" element={<ProtectedRoute><AdminLiterature /></ProtectedRoute>} />
                <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
                <Route path="/admin/press" element={<ProtectedRoute><AdminPress /></ProtectedRoute>} />
                <Route path="/admin/resources" element={<ProtectedRoute><AdminResources /></ProtectedRoute>} />
                <Route path="/admin/backup" element={<ProtectedRoute><AdminBackup /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SiteSettingsProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;

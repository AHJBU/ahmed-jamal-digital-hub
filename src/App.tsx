
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout and shared components
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Public pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Portfolio from '@/pages/Portfolio';
import PortfolioDetails from '@/pages/PortfolioDetails';
import CV from '@/pages/CV';
import Applications from '@/pages/Applications';
import ApplicationDetails from '@/pages/ApplicationDetails';
import Training from '@/pages/Training';
import TrainingDetails from '@/pages/TrainingDetails';
import Achievements from '@/pages/Achievements';
import AchievementDetails from '@/pages/AchievementDetails';
import Press from '@/pages/Press';
import PressDetails from '@/pages/PressDetails';
import Literature from '@/pages/Literature';
import LiteratureItem from '@/pages/LiteratureItem';
import Resources from '@/pages/Resources';
import NotFound from '@/pages/NotFound';

// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminTwoFactor from '@/pages/admin/AdminTwoFactor';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProfile from '@/pages/admin/AdminProfile';
import AdminBlog from '@/pages/admin/AdminBlog';
import AdminBlogEditor from '@/pages/admin/AdminBlogEditor';
import AdminPortfolio from '@/pages/admin/AdminPortfolio';
import AdminCV from '@/pages/admin/AdminCV';
import AdminApplications from '@/pages/admin/AdminApplications';
import AdminTraining from '@/pages/admin/AdminTraining';
import AdminAchievements from '@/pages/admin/AdminAchievements';
import AdminPress from '@/pages/admin/AdminPress';
import AdminLiterature from '@/pages/admin/AdminLiterature';
import AdminResources from '@/pages/admin/AdminResources';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminBackup from '@/pages/admin/AdminBackup';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminAbout from '@/pages/admin/AdminAbout';

// Providers
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteSettingsProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:id" element={<BlogPost />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="portfolio/:id" element={<PortfolioDetails />} />
                  <Route path="cv" element={<CV />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="applications/:id" element={<ApplicationDetails />} />
                  <Route path="training" element={<Training />} />
                  <Route path="training/:id" element={<TrainingDetails />} />
                  <Route path="achievements" element={<Achievements />} />
                  <Route path="achievements/:id" element={<AchievementDetails />} />
                  <Route path="press" element={<Press />} />
                  <Route path="press/:id" element={<PressDetails />} />
                  <Route path="literature" element={<Literature />} />
                  <Route path="literature/:id" element={<LiteratureItem />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/two-factor" element={<AdminTwoFactor />} />

                {/* Admin Protected Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="blog/new" element={<AdminBlogEditor />} />
                  <Route path="blog/edit/:id" element={<AdminBlogEditor />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="cv" element={<AdminCV />} />
                  <Route path="applications" element={<AdminApplications />} />
                  <Route path="training" element={<AdminTraining />} />
                  <Route path="achievements" element={<AdminAchievements />} />
                  <Route path="press" element={<AdminPress />} />
                  <Route path="literature" element={<AdminLiterature />} />
                  <Route path="resources" element={<AdminResources />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="backup" element={<AdminBackup />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="about" element={<AdminAbout />} />
                </Route>
              </Routes>
              <Toaster />
            </Router>
          </ThemeProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Define auth types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  hasTwoFactor: boolean;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  needsTwoFactor: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [needsTwoFactor, setNeedsTwoFactor] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // In a real application, we would verify the token with the backend
          setUser(JSON.parse(storedUser));
          
          // If on admin route but not logged in, redirect to login
          if (location.pathname.startsWith('/admin') && !user) {
            navigate('/admin/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, location, user]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login for demonstration - would be replaced with actual API call
      if (email === 'admin@example.com' && password === 'password') {
        // Simulate 2FA check
        const userWithTwoFactor = {
          id: '1',
          name: 'Ahmed Jamal',
          email: 'admin@example.com',
          role: 'admin',
          hasTwoFactor: true,
          lastLogin: new Date().toISOString(),
        };
        
        if (userWithTwoFactor.hasTwoFactor) {
          setNeedsTwoFactor(true);
          localStorage.setItem('pendingUser', JSON.stringify(userWithTwoFactor));
          setIsLoading(false);
          return true;
        } else {
          // No 2FA needed, complete login
          setUser(userWithTwoFactor);
          localStorage.setItem('user', JSON.stringify(userWithTwoFactor));
          localStorage.setItem('token', 'mock-token-123456');
          setIsLoading(false);
          return true;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password",
      });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify 2FA code
  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock 2FA verification - would be replaced with actual API call
      // For demo purpose, any 6-digit code will work
      if (code.length === 6 && /^\d+$/.test(code)) {
        const pendingUser = localStorage.getItem('pendingUser');
        if (pendingUser) {
          const parsedUser = JSON.parse(pendingUser);
          setUser(parsedUser);
          localStorage.setItem('user', pendingUser);
          localStorage.setItem('token', 'mock-token-123456');
          localStorage.removeItem('pendingUser');
          setNeedsTwoFactor(false);
          
          toast({
            title: "Authentication Successful",
            description: "You have successfully logged in",
          });
          return true;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Invalid verification code",
      });
      return false;
    } catch (error) {
      console.error('2FA verification error:', error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An unexpected error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    verifyTwoFactor,
    needsTwoFactor,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

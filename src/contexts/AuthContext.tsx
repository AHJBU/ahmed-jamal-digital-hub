
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  needsTwoFactor: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verify2FA: (code: string) => Promise<boolean>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  toggleTwoFactor: (enabled: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [needsTwoFactor, setNeedsTwoFactor] = useState<boolean>(false);
  const navigate = useNavigate();

  // For demo purposes, these would normally be environment variables or securely stored
  const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
  const DEFAULT_ADMIN_USERNAME = 'admin';
  const DEFAULT_ADMIN_PASSWORD = 'ASDqwe123#';

  useEffect(() => {
    // Check for stored authentication
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('auth_token');
        const pendingTwoFactor = localStorage.getItem('auth_pending_2fa') === 'true';
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(!pendingTwoFactor);
          setNeedsTwoFactor(pendingTwoFactor);
          
          if (pendingTwoFactor) {
            navigate('/admin/two-factor');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear potentially corrupt storage
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_pending_2fa');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This is a mock authentication for demo purposes
      // In a real app, this would be an API call to your backend
      
      // Check if the credentials match the default admin
      if ((email === DEFAULT_ADMIN_EMAIL || email === DEFAULT_ADMIN_USERNAME) && 
          password === DEFAULT_ADMIN_PASSWORD) {
        
        const mockUser: UserData = {
          id: '1',
          name: 'Admin User',
          email: DEFAULT_ADMIN_EMAIL,
          role: 'admin',
          twoFactorEnabled: false // 2FA disabled by default
        };
        
        // Store auth data
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', 'mock_jwt_token');
        
        setUser(mockUser);
        
        // Check if 2FA is enabled
        if (mockUser.twoFactorEnabled) {
          setNeedsTwoFactor(true);
          setIsAuthenticated(false);
          localStorage.setItem('auth_pending_2fa', 'true');
          navigate('/admin/two-factor');
        } else {
          setIsAuthenticated(true);
          setNeedsTwoFactor(false);
          localStorage.removeItem('auth_pending_2fa');
          navigate('/admin');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    return verifyTwoFactor(code);
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock 2FA verification
      // In a real app, this would verify the code against a backend
      
      // For demo purposes, any 6-digit code is accepted
      if (/^\d{6}$/.test(code)) {
        // Successfully verified
        setIsAuthenticated(true);
        setNeedsTwoFactor(false);
        localStorage.removeItem('auth_pending_2fa');
        navigate('/admin');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('2FA verification error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setNeedsTwoFactor(false);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_pending_2fa');
    navigate('/admin/login');
  };

  const updateUser = (userData: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const toggleTwoFactor = (enabled: boolean) => {
    if (user) {
      const updatedUser = { ...user, twoFactorEnabled: enabled };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    needsTwoFactor,
    login,
    verify2FA,
    verifyTwoFactor,
    logout,
    updateUser,
    toggleTwoFactor
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

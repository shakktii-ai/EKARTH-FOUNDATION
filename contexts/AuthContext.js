import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (token) {
      // In a real app, verify the token with your backend
      setUser({ email: 'admin@example.com' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In a real app, verify credentials with your backend
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = { email };
      localStorage.setItem('adminToken', 'dummy-token');
      setUser(user);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && router.pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || (!isAuthenticated && router.pathname !== '/admin/login')) {
    return <div>Loading...</div>;
  }

  return children;
};

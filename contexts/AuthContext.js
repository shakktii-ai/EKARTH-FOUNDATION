import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (token) {
      setUser({ email: 'Ekath@gmail.com' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const isEmailValid = cleanEmail === 'ekath@gmail.com' || cleanEmail === 'ekarth@gmail.com' || cleanEmail === 'admin@example.com';
    const isPasswordValid = password === 'Ekath@123' || password === 'admin123';

    if (isEmailValid && isPasswordValid) {
      const user = { email: email.trim() };
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
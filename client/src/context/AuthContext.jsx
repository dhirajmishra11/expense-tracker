import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Set base URL for all axios requests
axios.defaults.baseURL = 'https://expense-tracker-backend-mg8o.onrender.com';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);

  // 🟢 Login function
  const login = useCallback(async (email, password) => {
    try {
      setError(null);

      // ✅ Input validation
      if (!email || !password) {
        toast.error('Email and password are required');
        return false;
      }
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
        toast.error('Please enter a valid email');
        return false;
      }

      if (trimmedPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      console.log('🔐 Logging in with:', trimmedEmail, trimmedPassword);

      const response = await axios.post('/api/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Welcome back!');
      return true;
    } catch (err) {
      console.error('❌ Login error:', err.response);
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    }
  }, []);

  // 🟢 Register function
  const register = useCallback(async (email, password) => {
    try {
      setError(null);

      // ✅ Input validation
      if (!email || !password) {
        toast.error('Email and password are required');
        return false;
      }
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
        toast.error('Please enter a valid email');
        return false;
      }

      if (trimmedPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      console.log('📝 Registering with:', trimmedEmail, trimmedPassword);

      const response = await axios.post('/api/auth/register', {
        email: trimmedEmail,
        password: trimmedPassword
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Account created successfully!');
      return true;
    } catch (err) {
      console.error('❌ Registration error:', err.response);
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    }
  }, []);

  // 🔴 Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  }, []);

  // Automatically attach token if available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{
      token,
      error,
      isAuthenticated: !!token,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

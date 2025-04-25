import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { useAuth } from './context/AuthContext';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ExpenseProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: '#dcfce7',
                  color: '#166534',
                  border: '1px solid #bbf7d0'
                },
              },
              error: {
                style: {
                  background: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fecaca'
                },
              },
              duration: 3000,
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/learn-more" element={<Navigate to="/#features" replace />} />
          </Routes>
        </ExpenseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
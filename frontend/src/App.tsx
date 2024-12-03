import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Blog from './pages/Blog';
import Login from './pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/components/Dashboard';
import ProjectsList from './admin/components/ProjectsList';
import BlogManager from './admin/components/BlogManager';
import ContactsList from './admin/components/ContactsList';
import QuotesList from './admin/components/QuotesList';
import StatsOverview from './admin/components/StatsOverview';

// Création du thème Material-UI personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A148C',
      light: '#7B1FA2',
      dark: '#311B92',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFF176',
      dark: '#FFB300',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  console.log('User authenticated, rendering protected content');
  return <>{children}</>;
};

// Page d'accueil
const Home = () => (
  <div>
    <Hero />
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Routes publiques avec Navbar et Footer */}
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path="services" element={<Services />} />
                      <Route path="portfolio" element={<Portfolio />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="devis" element={<Quote />} />
                      <Route path="blog" element={<Blog />} />
                      <Route path="login" element={<Login />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* Routes admin avec AdminLayout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="projects" element={<ProjectsList />} />
                      <Route path="blog" element={<BlogManager />} />
                      <Route path="contacts" element={<ContactsList />} />
                      <Route path="quotes" element={<QuotesList />} />
                      <Route path="stats" element={<StatsOverview />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

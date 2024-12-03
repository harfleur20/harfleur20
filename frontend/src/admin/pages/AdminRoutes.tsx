import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../components/Dashboard';
import QuotesList from '../components/QuotesList';
import ContactsList from '../components/ContactsList';
import ProjectsList from '../components/ProjectsList';
import BlogManager from '../components/BlogManager';
import StatsOverview from '../components/StatsOverview';

const AdminRoutes: React.FC = () => {
  // Add authentication check here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quotes" element={<QuotesList />} />
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/blog" element={<BlogManager />} />
        <Route path="/stats" element={<StatsOverview />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;

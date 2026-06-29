import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AdminDashboardContent from './components/AdminDashboardContent';

const adminUser = {
  name: 'Admin Office',
  id: 'ADM2020001',
  department: 'University Administration',
  avatarInitials: 'AO',
  avatarColor: '#F5A623',
};

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin" user={adminUser}>
      <AdminDashboardContent />
    </DashboardLayout>
  );
}
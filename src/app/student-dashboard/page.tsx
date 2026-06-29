import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StudentDashboardContent from './components/StudentDashboardContent';

const studentUser = {
  name: 'Kim Ji-won',
  id: 'DEU2022CS001',
  department: 'Computer Science & Engineering',
  avatarInitials: 'KJ',
  avatarColor: '#1B3A6B',
};

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student" user={studentUser}>
      <StudentDashboardContent />
    </DashboardLayout>
  );
}
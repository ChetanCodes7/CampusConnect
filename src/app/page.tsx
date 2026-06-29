import React from 'react';
import { redirect } from 'next/navigation';

// Entry point — redirect to login
export default function RootPage() {
  redirect('/sign-up-login-screen');
}
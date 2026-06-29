'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
  UsersIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


type RoleType = 'student' | 'faculty' | 'admin';

interface LoginFormData {
  studentId: string;
  password: string;
  rememberMe: boolean;
}

interface DemoCredential {
  role: RoleType;
  id: string;
  password: string;
  name: string;
  redirect: string;
}

const demoCredentials: DemoCredential[] = [
  { role: 'student', id: 'DEU2022CS001', password: 'student@deu2025', name: 'Kim Ji-won', redirect: '/student-dashboard' },
  { role: 'faculty', id: 'FAC2019CS042', password: 'faculty@deu2025', name: 'Prof. Kim Tae-hyun', redirect: '/student-dashboard' },
  { role: 'admin', id: 'ADM2020001', password: 'admin@deu2025', name: 'Admin Office', redirect: '/admin-dashboard' },
];

const roleConfig: Record<RoleType, { label: string; icon: React.ElementType; color: string; placeholder: string }> = {
  student: { label: 'Student', icon: AcademicCapIcon, color: 'text-primary', placeholder: 'e.g. DEU2022CS001' },
  faculty: { label: 'Faculty', icon: UsersIcon, color: 'text-success', placeholder: 'e.g. FAC2019CS042' },
  admin: { label: 'Administrator', icon: ShieldCheckIcon, color: 'text-accent-foreground', placeholder: 'e.g. ADM2020001' },
};

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<RoleType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Backend integration point: POST /api/auth/login { role, studentId, password }
    await new Promise((r) => setTimeout(r, 1200));

    const cred = demoCredentials.find(
      (c) => c.role === selectedRole && c.id === data.studentId && c.password === data.password
    );

    if (cred) {
      toast.success(`Welcome back, ${cred.name}!`, { description: 'Redirecting to your dashboard...' });
      await new Promise((r) => setTimeout(r, 500));
      router.push(cred.redirect);
    } else {
      toast.error('Invalid credentials — use the demo accounts below to sign in');
    }
    setIsLoading(false);
  };

  const fillCredentials = (cred: DemoCredential) => {
    setSelectedRole(cred.role);
    setValue('studentId', cred.id);
    setValue('password', cred.password);
    toast.info(`Filled credentials for ${cred.name}`);
  };

  const roles: RoleType[] = ['student', 'faculty', 'admin'];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign in to access your campus portal</p>
      </div>

      {/* Role Selector */}
      <div className="mb-5">
        <label className="label-text">Sign in as</label>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => {
            const config = roleConfig[role];
            const Icon = config.icon;
            return (
              <button
                key={`role-${role}`}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all duration-150 ${
                  selectedRole === role
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted'
                }`}
              >
                <Icon className={`w-5 h-5 ${selectedRole === role ? 'text-primary' : 'text-muted-foreground'}`} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Student ID */}
        <div>
          <label className="label-text" htmlFor="login-id">
            {selectedRole === 'student' ? 'Student ID' : selectedRole === 'faculty' ? 'Faculty ID' : 'Admin ID'}
          </label>
          <input
            id="login-id"
            type="text"
            className="input-field"
            placeholder={roleConfig[selectedRole].placeholder}
            autoComplete="username"
            {...register('studentId', {
              required: 'ID is required',
              minLength: { value: 6, message: 'ID must be at least 6 characters' },
            })}
          />
          {errors.studentId && (
            <p className="error-text">{errors.studentId.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label-text mb-0" htmlFor="login-password">Password</label>
            <button type="button" className="text-xs text-primary hover:underline font-medium">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="input-field pr-10"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer">
            Keep me signed in for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </>
          ) : (
            'Sign In to Portal'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">Demo Credentials</span>
        </div>
      </div>

      {/* Demo Credentials Box */}
      <div className="bg-muted/60 rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
          <ClipboardDocumentCheckIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Click any role to autofill credentials</span>
        </div>
        <div className="divide-y divide-border">
          {demoCredentials.map((cred) => {
            const config = roleConfig[cred.role];
            const Icon = config.icon;
            return (
              <button
                key={`demo-${cred.role}`}
                type="button"
                onClick={() => fillCredentials(cred)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left group"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  cred.role === 'student' ? 'bg-primary/10' : cred.role === 'faculty' ? 'bg-success/10' : 'bg-accent/15'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    cred.role === 'student' ? 'text-primary' : cred.role === 'faculty' ? 'text-success' : 'text-accent-foreground'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{config.label} — {cred.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono truncate">{cred.id}</p>
                </div>
                <span className="text-[11px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Use →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Switch to Register */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        New to CampusConnect?{' '}
        <button onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline">
          Create account
        </button>
      </p>
    </div>
  );
}
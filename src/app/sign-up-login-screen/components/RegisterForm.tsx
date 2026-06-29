'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  AcademicCapIcon,
  UsersIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


type RoleType = 'student' | 'faculty' | 'admin';

interface RegisterFormData {
  role: RoleType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  studentId: string;
  department: string;
  year: string;
  program: string;
  agreeTerms: boolean;
  verificationCode: string;
}

const departments = [
  'Computer Science & Engineering',
  'IT Convergence Engineering',
  'ICT Engineering',
  'Business Administration',
  'Nursing & Healthcare Sciences',
  'Mechanical Engineering',
  'Tourism Management',
  'Art & Design',
  'Humanities & Social Sciences',
  'Components & Materials Engineering',
];

const programs = ['Bachelor\'s', 'Master\'s', 'PhD', 'Exchange Student'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<RoleType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: { role: 'student' },
  });

  const password = watch('password');

  const stepLabels = ['Role', 'Personal Info', 'Academic Info', 'Verification'];

  const nextStep = async () => {
    let valid = false;
    if (step === 1) valid = true;
    if (step === 2) valid = await trigger(['firstName', 'lastName', 'email', 'password', 'confirmPassword']);
    if (step === 3) valid = await trigger(['studentId', 'department']);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    // Backend integration point: POST /api/auth/register
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsComplete(true);
    toast.success('Account created successfully! Welcome to CampusConnect.');
  };

  if (isComplete) {
    return (
      <div className="text-center animate-scale-in py-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-9 h-9 text-success" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Registration Complete!</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Your account has been created. A verification email has been sent to your DEU email address.
        </p>
        <button onClick={onSwitchToLogin} className="btn-primary w-full py-3">
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground text-sm mt-1">Join the Dong-eui University campus network</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 mb-6">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isDone = step > stepNum;
          const isActive = step === stepNum;
          return (
            <React.Fragment key={`step-${stepNum}`}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    isDone
                      ? 'bg-success text-white'
                      : isActive
                      ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? <CheckCircleIcon className="w-4 h-4" /> : stepNum}
                </div>
                <span className={`text-[10px] mt-0.5 font-medium hidden sm:block ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${step > stepNum ? 'bg-success' : 'bg-border'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="space-y-3 animate-slide-up">
          <p className="text-sm font-medium text-foreground mb-3">Select your role at Dong-eui University</p>
          {(['student', 'faculty', 'admin'] as RoleType[]).map((role) => {
            const icons: Record<RoleType, React.ElementType> = {
              student: AcademicCapIcon,
              faculty: UsersIcon,
              admin: ShieldCheckIcon,
            };
            const descriptions: Record<RoleType, string> = {
              student: 'Access academics, library, clubs, placements & more',
              faculty: 'Manage classes, attendance, marks & assignments',
              admin: 'Oversee campus operations and system administration',
            };
            const Icon = icons[role];
            return (
              <button
                key={`reg-role-${role}`}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                  selectedRole === role
                    ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/30 hover:bg-muted'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedRole === role ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${selectedRole === role ? 'text-primary' : 'text-foreground'}`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{descriptions[role]}</p>
                </div>
                {selectedRole === role && (
                  <CheckCircleIcon className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Personal Info */}
      {step === 2 && (
        <div className="space-y-4 animate-slide-up">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-text" htmlFor="reg-firstname">First Name</label>
              <input
                id="reg-firstname"
                type="text"
                className="input-field"
                placeholder="Ji-won"
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="label-text" htmlFor="reg-lastname">Last Name</label>
              <input
                id="reg-lastname"
                type="text"
                className="input-field"
                placeholder="Kim"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="label-text" htmlFor="reg-email">University Email</label>
            <input
              id="reg-email"
              type="email"
              className="input-field"
              placeholder="2022cs001@deu.ac.kr"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
            />
            <p className="helper-text">Use your official @deu.ac.kr email address</p>
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label-text" htmlFor="reg-phone">Phone Number</label>
            <input
              id="reg-phone"
              type="tel"
              className="input-field"
              placeholder="010-XXXX-XXXX"
              autoComplete="tel"
              {...register('phone')}
            />
          </div>

          <div>
            <label className="label-text" htmlFor="reg-password">Password</label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <div>
            <label className="label-text" htmlFor="reg-confirm">Confirm Password</label>
            <div className="relative">
              <input
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="Repeat your password"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === password || 'Passwords do not match',
                })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showConfirm ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Academic Info */}
      {step === 3 && (
        <div className="space-y-4 animate-slide-up">
          <div>
            <label className="label-text" htmlFor="reg-student-id">
              {selectedRole === 'student' ? 'Student ID' : selectedRole === 'faculty' ? 'Faculty ID' : 'Admin ID'}
            </label>
            <input
              id="reg-student-id"
              type="text"
              className="input-field"
              placeholder={selectedRole === 'student' ? 'DEU2025XXXX' : selectedRole === 'faculty' ? 'FAC2025XXXX' : 'ADM2025XXX'}
              {...register('studentId', { required: 'ID is required' })}
            />
            <p className="helper-text">Provided by the university registrar office</p>
            {errors.studentId && <p className="error-text">{errors.studentId.message}</p>}
          </div>

          <div>
            <label className="label-text" htmlFor="reg-dept">Department / College</label>
            <select
              id="reg-dept"
              className="input-field"
              {...register('department', { required: 'Department is required' })}
            >
              <option value="">Select your department</option>
              {departments.map((dept) => (
                <option key={`dept-${dept.replace(/\s+/g, '-').toLowerCase()}`} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="error-text">{errors.department.message}</p>}
          </div>

          {selectedRole === 'student' && (
            <>
              <div>
                <label className="label-text" htmlFor="reg-year">Academic Year</label>
                <select id="reg-year" className="input-field" {...register('year')}>
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={`year-${y.replace(/\s+/g, '-').toLowerCase()}`} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text" htmlFor="reg-program">Program Type</label>
                <select id="reg-program" className="input-field" {...register('program')}>
                  <option value="">Select program</option>
                  {programs.map((p) => (
                    <option key={`prog-${p.replace(/\s+/g, '-').toLowerCase()}`} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex items-start gap-2 pt-1">
            <input
              id="reg-terms"
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-border text-primary cursor-pointer flex-shrink-0"
              {...register('agreeTerms', { required: 'You must agree to the terms' })}
            />
            <label htmlFor="reg-terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
              I agree to the{' '}
              <span className="text-primary font-medium">Terms of Service</span> and{' '}
              <span className="text-primary font-medium">Privacy Policy</span> of CampusConnect and Dong-eui University
            </label>
          </div>
          {errors.agreeTerms && <p className="error-text">{errors.agreeTerms.message}</p>}
        </div>
      )}

      {/* Step 4: Verification */}
      {step === 4 && (
        <div className="space-y-4 animate-slide-up">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-1">Verification Email Sent</p>
            <p className="text-xs text-muted-foreground">
              A 6-digit verification code has been sent to your university email address. Enter it below to complete registration.
            </p>
          </div>

          <div>
            <label className="label-text" htmlFor="reg-verify">Verification Code</label>
            <input
              id="reg-verify"
              type="text"
              className="input-field text-center text-2xl font-bold tracking-[0.5em] font-tabular"
              placeholder="000000"
              maxLength={6}
              {...register('verificationCode', {
                required: 'Verification code is required',
                minLength: { value: 6, message: 'Enter the 6-digit code' },
              })}
            />
            <p className="helper-text text-center">Use code 123456 for demo purposes</p>
            {errors.verificationCode && <p className="error-text justify-center">{errors.verificationCode.message}</p>}
          </div>

          <button type="button" className="text-sm text-primary font-medium hover:underline w-full text-center">
            Resend verification code
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="btn-outline flex items-center gap-1.5 flex-1"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back
          </button>
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-primary flex items-center justify-center gap-1.5 flex-1"
          >
            Continue
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="btn-primary flex items-center justify-center gap-2 flex-1 py-3"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        )}
      </div>

      {/* Switch to Login */}
      <p className="text-center text-sm text-muted-foreground mt-5">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}
'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AppLogo from '@/components/ui/AppLogo';
import {
  AcademicCapIcon,
  UsersIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const campusStats = [
  { id: 'stat-students', value: '16,000+', label: '재학생 Students' },
  { id: 'stat-faculty', value: '1,600+', label: '교직원 Faculty & Staff' },
  { id: 'stat-colleges', value: '8', label: '단과대학 Colleges' },
  { id: 'stat-programs', value: '153', label: '학과 Programs' },
];

const features = [
  { id: 'feat-academic', icon: AcademicCapIcon, label: 'Academic Portal' },
  { id: 'feat-library', icon: BuildingLibraryIcon, label: 'Smart Library' },
  { id: 'feat-clubs', icon: UsersIcon, label: 'Clubs & Events' },
  { id: 'feat-placement', icon: BriefcaseIcon, label: 'Placement Hub' },
  { id: 'feat-chat', icon: ChatBubbleLeftRightIcon, label: 'Campus Chat' },
  { id: 'feat-ai', icon: SparklesIcon, label: 'AI Tools' },
];

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] gradient-primary flex-col justify-between p-10 xl:p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AppLogo size={40} />
            <div>
              <span className="font-bold text-white text-xl block leading-tight">CampusConnect</span>
              <span className="text-white/60 text-xs">Dong-eui University</span>
            </div>
          </div>
          <div className="mt-8 mb-6">
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-3">동의대학교 · Busan, Korea</p>
            <h2 className="text-white text-3xl xl:text-4xl font-bold leading-tight">
              One Platform.<br />
              <span className="text-accent">Every Campus</span><br />
              Need.
            </h2>
            <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-sm">
              Your complete digital campus ecosystem — academics, library, clubs, placements, and more, unified in one intelligent platform.
            </p>
          </div>

          {/* Motto */}
          <div className="flex items-center gap-2 mb-8">
            <GlobeAltIcon className="w-4 h-4 text-accent" />
            <span className="text-white/60 text-xs font-medium">東義知天 · Truth · Justice · Creativity</span>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-2 gap-2">
            {features?.map((f) => {
              const Icon = f?.icon;
              return (
                <div key={f?.id} className="flex items-center gap-2 bg-white/8 rounded-lg px-3 py-2 border border-white/10">
                  <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-white/80 text-xs font-medium">{f?.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {campusStats?.map((stat) => (
              <div key={stat?.id} className="bg-white/8 rounded-xl p-4 border border-white/10">
                <p className="text-white font-bold text-2xl font-tabular">{stat?.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{stat?.label}</p>
              </div>
            ))}
          </div>

          {/* Accreditation */}
          <div className="flex items-center gap-2 bg-white/8 rounded-lg px-4 py-3 border border-white/10">
            <CheckBadgeIcon className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">#1 Employment Rate</p>
              <p className="text-white/50 text-[11px]">Busan/Ulsan/Gyungnam Region · 3 Consecutive Years</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Panel — Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <div>
              <span className="font-bold text-primary text-lg block leading-tight">CampusConnect</span>
              <span className="text-muted-foreground text-xs">Dong-eui University</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'login' ?'bg-card text-primary shadow-card' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'register' ?'bg-card text-primary shadow-card' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
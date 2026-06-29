'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  HomeIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  MapPinIcon,
  TrophyIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  badgeVariant?: 'danger' | 'warning' | 'success';
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const studentNavGroups: NavGroup[] = [
  {
    id: 'academic',
    label: 'Academic',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/student-dashboard', icon: HomeIcon },
      { id: 'attendance', label: 'Attendance', href: '/student-dashboard', icon: ClipboardDocumentListIcon, badge: 1, badgeVariant: 'warning' },
      { id: 'results', label: 'Results & CGPA', href: '/student-dashboard', icon: AcademicCapIcon },
      { id: 'assignments', label: 'Assignments', href: '/student-dashboard', icon: DocumentTextIcon, badge: 3, badgeVariant: 'danger' },
      { id: 'timetable', label: 'Timetable', href: '/student-dashboard', icon: CalendarDaysIcon },
    ],
  },
  {
    id: 'campus-life',
    label: 'Campus Life',
    items: [
      { id: 'library', label: 'Library', href: '/student-dashboard', icon: BookOpenIcon },
      { id: 'clubs', label: 'Clubs & Events', href: '/student-dashboard', icon: UserGroupIcon },
      { id: 'marketplace', label: 'Marketplace', href: '/student-dashboard', icon: ShoppingBagIcon },
      { id: 'lostfound', label: 'Lost & Found', href: '/student-dashboard', icon: MapPinIcon },
    ],
  },
  {
    id: 'career',
    label: 'Career',
    items: [
      { id: 'resume', label: 'Resume Builder', href: '/student-dashboard', icon: DocumentChartBarIcon },
      { id: 'placements', label: 'Jobs & Placements', href: '/student-dashboard', icon: BriefcaseIcon, badge: 2, badgeVariant: 'success' },
      { id: 'competitions', label: 'Competitions', href: '/student-dashboard', icon: TrophyIcon },
    ],
  },
  {
    id: 'social',
    label: 'Social',
    items: [
      { id: 'messages', label: 'Messages', href: '/student-dashboard', icon: ChatBubbleLeftRightIcon, badge: 7, badgeVariant: 'danger' },
      { id: 'friends', label: 'Friends', href: '/student-dashboard', icon: UsersIcon },
      { id: 'notifications', label: 'Notifications', href: '/student-dashboard', icon: BellIcon, badge: 12, badgeVariant: 'danger' },
    ],
  },
];

const adminNavGroups: NavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/admin-dashboard', icon: Squares2X2Icon },
      { id: 'analytics', label: 'Analytics', href: '/admin-dashboard', icon: PresentationChartLineIcon },
    ],
  },
  {
    id: 'people',
    label: 'People',
    items: [
      { id: 'students', label: 'Students', href: '/admin-dashboard', icon: AcademicCapIcon },
      { id: 'faculty', label: 'Faculty', href: '/admin-dashboard', icon: UsersIcon },
      { id: 'departments', label: 'Departments', href: '/admin-dashboard', icon: BuildingOfficeIcon },
    ],
  },
  {
    id: 'academic-admin',
    label: 'Academic',
    items: [
      { id: 'courses', label: 'Courses', href: '/admin-dashboard', icon: BookOpenIcon },
      { id: 'library-admin', label: 'Library', href: '/admin-dashboard', icon: BuildingLibraryIcon },
      { id: 'attendance-admin', label: 'Attendance', href: '/admin-dashboard', icon: ClipboardDocumentListIcon },
    ],
  },
  {
    id: 'campus-admin',
    label: 'Campus',
    items: [
      { id: 'clubs-admin', label: 'Clubs', href: '/admin-dashboard', icon: UserGroupIcon },
      { id: 'events-admin', label: 'Events', href: '/admin-dashboard', icon: CalendarDaysIcon },
      { id: 'placements-admin', label: 'Placements', href: '/admin-dashboard', icon: BriefcaseIcon },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'reports', label: 'Reports', href: '/admin-dashboard', icon: ChartBarIcon },
      { id: 'notifications-admin', label: 'Notifications', href: '/admin-dashboard', icon: BellIcon, badge: 4, badgeVariant: 'warning' },
      { id: 'settings-admin', label: 'Settings', href: '/admin-dashboard', icon: Cog6ToothIcon },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'faculty' | 'admin';
  user: {
    name: string;
    id: string;
    department: string;
    avatarInitials: string;
    avatarColor: string;
  };
}

export default function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navGroups = role === 'admin' ? adminNavGroups : studentNavGroups;

  const badgeColors: Record<string, string> = {
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    success: 'bg-success text-white',
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center px-2' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="min-w-0">
            <span className="font-bold text-primary text-sm block leading-tight">CampusConnect</span>
            <span className="text-xs text-muted-foreground truncate block">Dong-eui University</span>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center px-2' : ''}`}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.avatarInitials}
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.id}</p>
          </div>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-border flex-shrink-0">
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Quick search..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 text-foreground placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
      )}

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.id} className="mb-4">
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href && item.id === 'dashboard';
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`sidebar-item mb-0.5 ${isActive ? 'sidebar-item-active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${badgeColors[item.badgeVariant || 'danger']}`}>
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full ${badgeColors[item.badgeVariant || 'danger']}`} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className={`px-2 py-3 border-t border-border flex-shrink-0 space-y-0.5`}>
        <button className={`sidebar-item w-full ${collapsed ? 'justify-center px-2' : ''}`} title={collapsed ? 'Settings' : undefined}>
          <Cog6ToothIcon style={{ width: 18, height: 18 }} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <Link href="/sign-up-login-screen" className={`sidebar-item w-full text-danger hover:bg-danger/8 hover:text-danger ${collapsed ? 'justify-center px-2' : ''}`} title={collapsed ? 'Sign Out' : undefined}>
          <ArrowLeftOnRectangleIcon style={{ width: 18, height: 18 }} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-card hover:bg-muted transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRightIcon className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeftIcon className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          relative flex-shrink-0 bg-card border-r border-border shadow-sidebar
          sidebar-transition overflow-hidden
          hidden lg:flex lg:flex-col
          ${collapsed ? 'lg:w-[68px]' : 'lg:w-[260px]'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[260px] bg-card border-r border-border shadow-sidebar
          flex flex-col lg:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-14 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">
                {role === 'admin' ? 'Admin Portal' : role === 'faculty' ? 'Faculty Portal' : 'Student Portal'}
              </h1>
              <p className="text-xs text-muted-foreground">Dong-eui University · Spring 2025</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Global Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 text-sm text-muted-foreground border border-transparent hover:border-border transition-colors cursor-pointer">
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="text-xs">Search campus...</span>
              <kbd className="text-[10px] bg-card border border-border rounded px-1 py-0.5 font-mono">⌘K</kbd>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.avatarInitials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
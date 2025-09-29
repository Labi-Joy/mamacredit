'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  AlertCircle,
  ShoppingBag,
  User,
  Settings,
  Bell,
  Crown,
  LogOut,
  Menu,
  X,
  Wallet,
  TrendingUp,
  Heart,
  Shield
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and quick actions'
    },
    {
      name: 'My Circles',
      href: '/circles',
      icon: Users,
      description: 'Savings circles and sisterhood'
    },
    {
      name: 'Emergency Support',
      href: '/emergency',
      icon: AlertCircle,
      description: 'Community help system'
    },
    {
      name: "Mama's Marketplace",
      href: '/marketplace',
      icon: ShoppingBag,
      description: 'Buy and sell with sisters'
    },
    {
      name: 'My Wallet',
      href: '/wallet',
      icon: Wallet,
      description: 'Digital money management'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Personal settings and badges'
    }
  ];

  const isActivePath = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  // Mock user data
  const user = {
    name: "Amina Ibrahim",
    avatar: "/placeholder-avatar.jpg",
    totalSaved: 250000,
    mamaTokens: 2500,
    activeCircles: 2,
    badges: ["Circle Leader", "Faithful Gardener"]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-burgundy-800">MamaCredit</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-neutral-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-orange-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-burgundy-800">MamaCredit</h1>
                <p className="text-xs text-neutral-600">Your sisterhood savings</p>
              </div>
            </div>
            
            {/* User Profile Card */}
            <div className="bg-gradient-to-r from-burgundy-600 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-red-200 text-sm">Circle Queen 👑</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold">{formatCurrency(user.totalSaved)}</div>
                  <div className="text-xs text-red-200">Total Saved</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold">{user.activeCircles}</div>
                  <div className="text-xs text-red-200">Active Circles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-6 py-4 flex-1">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center p-3 rounded-xl transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg'
                        : 'text-neutral-700 hover:bg-orange-50 hover:text-burgundy-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-burgundy-600'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${isActive ? 'text-red-100' : 'text-neutral-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="px-6 py-4 border-t border-orange-100">
            <h4 className="font-semibold text-burgundy-800 mb-3">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="text-sm text-neutral-600">MAMA Tokens</span>
                </div>
                <span className="font-semibold text-burgundy-800">{user.mamaTokens}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-neutral-600">Sisters Helped</span>
                </div>
                <span className="font-semibold text-burgundy-800">7</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm text-neutral-600">Success Rate</span>
                </div>
                <span className="font-semibold text-emerald-600">100%</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="px-6 py-4 border-t border-orange-100">
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center p-2 text-neutral-600 hover:text-burgundy-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 mr-3" />
                <span className="text-sm">Settings</span>
              </Link>
              
              <button className="flex items-center p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                <LogOut className="w-4 h-4 mr-3" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-30">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-burgundy-800">
                    {pathname === '/dashboard' && 'Dashboard'}
                    {pathname.startsWith('/circles') && 'Savings Circles'}
                    {pathname.startsWith('/emergency') && 'Emergency Support'}
                    {pathname.startsWith('/marketplace') && "Mama's Marketplace"}
                    {pathname.startsWith('/wallet') && 'My Wallet'}
                    {pathname.startsWith('/profile') && 'My Profile'}
                  </h2>
                  <p className="text-neutral-600">
                    {pathname === '/dashboard' && 'Welcome back, beautiful sister!'}
                    {pathname.startsWith('/circles') && 'Your sisterhood savings communities'}
                    {pathname.startsWith('/emergency') && 'Community support when you need it most'}
                    {pathname.startsWith('/marketplace') && 'Shop with your sisters'}
                    {pathname.startsWith('/wallet') && 'Manage your digital money'}
                    {pathname.startsWith('/profile') && 'Your achievements and settings'}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5 text-neutral-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>

                  <Link href="/profile" className="flex items-center space-x-3 p-2 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="hidden xl:block">
                      <div className="font-semibold text-burgundy-800 text-sm">{user.name}</div>
                      <div className="text-xs text-neutral-600">Circle Leader</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 z-40">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-orange-100 text-burgundy-800'
                    : 'text-neutral-600 hover:text-burgundy-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
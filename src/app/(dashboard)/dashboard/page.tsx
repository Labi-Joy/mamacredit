'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Heart, 
  AlertCircle, 
  Crown, 
  Coins,
  Calendar,
  ChevronRight,
  Star,
  Gift,
  Shield,
  Clock,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter
} from 'lucide-react';

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const timer = setInterval(updateTime, 1000);
    
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
    
    return () => clearInterval(timer);
  }, []);

  // Mock data for demo
  const userData = {
    name: "Amina Ibrahim",
    avatar: "/placeholder-avatar.jpg",
    totalSaved: 250000, // ₦250,000
    mamaTokens: 2500,
    circles: 2,
    emergencyLoansGiven: 3,
    badges: ["Faithful Gardener", "Sister Supporter", "Circle Leader"]
  };

  const userCircles = [
    {
      id: "circle_1",
      name: "Lagos Mama Circle #1",
      members: 6,
      maxMembers: 8,
      monthlyContribution: 50000,
      totalSaved: 300000,
      nextPayout: "Fatima Adeola",
      payoutDate: "2025-10-15",
      status: "active",
      progress: 75
    },
    {
      id: "circle_2", 
      name: "Market Women United",
      members: 5,
      maxMembers: 6,
      monthlyContribution: 25000,
      totalSaved: 125000,
      nextPayout: "You",
      payoutDate: "2025-11-01",
      status: "active",
      progress: 83
    }
  ];

  const recentActivity = [
    {
      type: "contribution",
      title: "Monthly contribution made",
      description: "Lagos Mama Circle #1 • ₦50,000",
      time: "2 hours ago",
      icon: <Coins className="w-5 h-5 text-emerald-500" />
    },
    {
      type: "emergency_approved",
      title: "Emergency loan approved",
      description: "Helped Sister Grace with school fees",
      time: "1 day ago", 
      icon: <Heart className="w-5 h-5 text-red-500" />
    },
    {
      type: "payout",
      title: "Sister received payout",
      description: "Fatima got her harvest blessing • ₦300,000",
      time: "3 days ago",
      icon: <Gift className="w-5 h-5 text-orange-500" />
    }
  ];

  const emergencyRequests = [
    {
      id: "loan_1",
      borrower: "Grace Okafor",
      amount: 75000,
      reason: "Children's school fees",
      urgency: "high",
      votes: { for: 4, against: 0, total: 6 },
      timeLeft: "18 hours",
      circle: "Lagos Mama Circle #1"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getGreetingProverb = () => {
    const proverbs = [
      "Every step forward is a victory, Queen!",
      "Your light shines bright in this sisterhood",
      "The village is proud of your growth",
      "When sisters unite, mountains move"
    ];
    return proverbs[Math.floor(Math.random() * proverbs.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-burgundy-800">MamaCredit</h1>
                <p className="text-xs text-neutral-600">Your sisterhood savings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-neutral-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-neutral-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="mama-card p-6 bg-gradient-to-r from-burgundy-600 to-red-600 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  {greeting}, {userData.name}! 👑
                </h2>
                <p className="text-red-100 text-lg">
                  {getGreetingProverb()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  {formatCurrency(userData.totalSaved)}
                </div>
                <div className="text-red-200 text-sm">Total Saved</div>
                <div className="flex items-center mt-2 text-red-200">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm">{userData.mamaTokens} MAMA tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">{userData.circles}</div>
            <div className="text-sm text-neutral-600">Active Circles</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">₦125K</div>
            <div className="text-sm text-neutral-600">This Month</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">{userData.emergencyLoansGiven}</div>
            <div className="text-sm text-neutral-600">Sisters Helped</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">{userData.badges.length}</div>
            <div className="text-sm text-neutral-600">Badges Earned</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Circles */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Circles */}
            <div className="mama-card p-6">
              <div className="flex justify-end items-center mb-6">
                <Link href="/circles/create" className="mama-button-primary text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Circle
                </Link>
              </div>
              
              <div className="space-y-4">
                {userCircles.map((circle) => (
                  <Link 
                    key={circle.id} 
                    href={`/circles/${circle.id}`}
                    className="block p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:border-orange-200 transition-all hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-burgundy-800">{circle.name}</h4>
                        <p className="text-sm text-neutral-600">
                          {circle.members}/{circle.maxMembers} sisters • {formatCurrency(circle.monthlyContribution)}/month
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-burgundy-800">
                          {formatCurrency(circle.totalSaved)}
                        </div>
                        <div className="text-xs text-neutral-600">Total Saved</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Next payout:</span>
                        <span className="font-semibold text-burgundy-800">{circle.nextPayout}</span>
                      </div>
                      <div className="w-full bg-orange-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${circle.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-600">
                        <span>Progress: {circle.progress}%</span>
                        <span>Due: {new Date(circle.payoutDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {userCircles.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-neutral-600 mb-2">No circles yet</h4>
                  <p className="text-neutral-500 mb-4">Join your first sisterhood circle and start saving!</p>
                  <Link href="/circles/create" className="mama-button-primary">
                    Create Your First Circle
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="mama-card p-6">
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-burgundy-800 text-sm">{activity.title}</h5>
                      <p className="text-sm text-neutral-600">{activity.description}</p>
                      <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/activity" 
                className="block text-center mt-4 text-burgundy-600 font-medium hover:text-burgundy-800 transition-colors"
              >
                View All Activity
              </Link>
            </div>
          </div>

          {/* Right Column - Emergency & Quick Actions */}
          <div className="space-y-6">
            {/* Emergency Requests */}
            {emergencyRequests.length > 0 && (
              <div className="mama-card p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                </div>
                
                {emergencyRequests.map((request) => (
                  <div key={request.id} className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-burgundy-800">{request.borrower}</h4>
                          <p className="text-sm text-neutral-600">{request.circle}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(request.amount)}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            request.urgency === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {request.urgency} urgency
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-neutral-700 mb-3">"{request.reason}"</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">Community Vote:</span>
                          <span className="font-semibold text-emerald-600">
                            {request.votes.for}/{request.votes.total} approved
                          </span>
                        </div>
                        
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full"
                            style={{ width: `${(request.votes.for / request.votes.total) * 100}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {request.timeLeft} left
                          </span>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full hover:bg-emerald-600 transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-neutral-300 text-neutral-700 text-xs rounded-full hover:bg-neutral-400 transition-colors">
                              Discuss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link 
                  href="/emergency" 
                  className="block text-center mt-4 text-burgundy-600 font-medium hover:text-burgundy-800 transition-colors"
                >
                  View All Requests
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mama-card p-6">
              
              <div className="space-y-3">
                <Link 
                  href="/circles/create" 
                  className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-burgundy-800 text-sm">Create Circle</div>
                    <div className="text-xs text-neutral-600">Start a new sisterhood</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-burgundy-600 transition-colors" />
                </Link>
                
                <Link 
                  href="/circles" 
                  className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-burgundy-800 text-sm">Join Circle</div>
                    <div className="text-xs text-neutral-600">Find your sisterhood</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-burgundy-600 transition-colors" />
                </Link>
                
                <Link 
                  href="/emergency/request" 
                  className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-burgundy-800 text-sm">Emergency Help</div>
                    <div className="text-xs text-neutral-600">Request sister support</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-burgundy-600 transition-colors" />
                </Link>
                
                <Link 
                  href="/marketplace" 
                  className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-burgundy-800 text-sm">Mama's Market</div>
                    <div className="text-xs text-neutral-600">Buy from sisters</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-burgundy-600 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mama-card p-6">
              
              <div className="grid grid-cols-2 gap-3">
                {userData.badges.map((badge, index) => (
                  <div key={index} className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-burgundy-800">{badge}</div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/profile" 
                className="block text-center mt-4 text-burgundy-600 font-medium hover:text-burgundy-800 transition-colors"
              >
                View All Achievements
              </Link>
            </div>

            {/* Inspirational Quote */}
            <div className="mama-card p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <blockquote className="text-sm font-medium italic mb-3 leading-relaxed">
                  "Little by little, a bird builds its nest. Your consistent saving today builds your family's tomorrow."
                </blockquote>
                <div className="text-xs opacity-80">— African Proverb</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Recent Transactions */}
        <div className="mt-8">
          <div className="mama-card p-6">
            <div className="flex justify-end items-center mb-6">
              <Link href="/transactions" className="text-burgundy-600 font-medium hover:text-burgundy-800 transition-colors">
                View All
              </Link>
            </div>
            
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold text-emerald-700">Contribution</div>
                    <div className="text-xs text-neutral-600">2 hours ago</div>
                  </div>
                  <div className="text-lg font-bold text-burgundy-800">{formatCurrency(50000)}</div>
                  <div className="text-sm text-neutral-600">Lagos Mama Circle #1</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold text-blue-700">MAMA Tokens</div>
                    <div className="text-xs text-neutral-600">2 hours ago</div>
                  </div>
                  <div className="text-lg font-bold text-burgundy-800">+500 MAMA</div>
                  <div className="text-sm text-neutral-600">Contribution reward</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold text-purple-700">Emergency Vote</div>
                    <div className="text-xs text-neutral-600">1 day ago</div>
                  </div>
                  <div className="text-lg font-bold text-burgundy-800">Approved</div>
                  <div className="text-sm text-neutral-600">Helped Sister Grace</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
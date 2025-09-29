'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Settings,
  Crown,
  Star,
  Heart,
  Users,
  TrendingUp,
  Award,
  Camera,
  Edit3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Coins,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Gift,
  Sparkles,
  Download,
  Share,
  Trophy,
  Target,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);

  // Mock user data
  const userData = {
    personalInfo: {
      name: "Amina Ibrahim",
      email: "amina.ibrahim@email.com",
      phone: "+234 903 123 4567",
      location: "Lagos, Nigeria",
      joinedDate: "2024-08-15",
      birthDate: "1987-03-20",
      occupation: "Market Trader",
      emergencyContact: "Fatima Adeola (+234 901 987 6543)",
      profileImage: "/placeholder-avatar.jpg"
    },
    stats: {
      totalSaved: 450000,
      mamaTokens: 2500,
      circlesJoined: 3,
      activeCircles: 2,
      completedCircles: 1,
      emergencyLoansGiven: 7,
      emergencyLoansReceived: 2,
      transactionCount: 45,
      successRate: 100,
      trustScore: 98,
      monthsActive: 8,
      referralCount: 12
    },
    achievements: [
      {
        id: 'badge_1',
        name: 'Circle Founder',
        description: 'Created and successfully completed your first savings circle',
        icon: '=Q',
        rarity: 'rare',
        earnedDate: '2024-12-01',
        mamaTokens: 500,
        category: 'leadership',
        progress: 100
      },
      {
        id: 'badge_2',
        name: 'Faithful Gardener',
        description: 'Made contributions for 6 consecutive months',
        icon: '<1',
        rarity: 'common',
        earnedDate: '2024-11-15',
        mamaTokens: 300,
        category: 'consistency',
        progress: 100
      },
      {
        id: 'badge_3',
        name: 'Sister Supporter',
        description: 'Voted to support 10 emergency loan requests',
        icon: '>',
        rarity: 'common',
        earnedDate: '2024-10-30',
        mamaTokens: 200,
        category: 'community',
        progress: 100
      },
      {
        id: 'badge_4',
        name: 'Community Builder',
        description: 'Invited 10+ sisters to join MamaCredit',
        icon: '<�',
        rarity: 'uncommon',
        earnedDate: '2024-09-20',
        mamaTokens: 400,
        category: 'growth',
        progress: 100
      },
      {
        id: 'badge_5',
        name: 'Harvest Queen',
        description: 'Successfully received 3 circle payouts',
        icon: '<>',
        rarity: 'uncommon',
        earnedDate: '2024-08-25',
        mamaTokens: 350,
        category: 'achievement',
        progress: 100
      },
      {
        id: 'badge_6',
        name: 'Trust Builder',
        description: 'Maintain 95%+ trust score for 6 months',
        icon: '=�',
        rarity: 'rare',
        earnedDate: null,
        mamaTokens: 600,
        category: 'trust',
        progress: 87
      }
    ],
    circles: [
      {
        id: 'circle_1',
        name: 'Lagos Market Queens',
        role: 'Member',
        status: 'active',
        joinedDate: '2024-08-20',
        contribution: 50000,
        totalSaved: 300000,
        members: 6,
        trustLevel: 'High'
      },
      {
        id: 'circle_2',
        name: 'Young Professionals United',
        role: 'Founder',
        status: 'active',
        joinedDate: '2024-09-01',
        contribution: 25000,
        totalSaved: 150000,
        members: 6,
        trustLevel: 'High'
      },
      {
        id: 'circle_3',
        name: 'Sisters of Success',
        role: 'Member',
        status: 'completed',
        joinedDate: '2024-08-15',
        contribution: 75000,
        totalSaved: 450000,
        members: 6,
        trustLevel: 'High'
      }
    ],
    recentActivity: [
      {
        type: 'contribution',
        description: 'Monthly contribution to Lagos Market Queens',
        amount: 50000,
        date: '2024-12-02',
        status: 'completed'
      },
      {
        type: 'achievement',
        description: 'Earned Circle Founder badge',
        amount: 500,
        date: '2024-12-01',
        status: 'completed'
      },
      {
        type: 'emergency_support',
        description: 'Supported Sister Grace\'s emergency request',
        amount: 0,
        date: '2024-11-28',
        status: 'completed'
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      case 'uncommon': return 'from-blue-400 to-indigo-500';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-100 text-yellow-700';
      case 'rare': return 'bg-purple-100 text-purple-700';
      case 'uncommon': return 'bg-blue-100 text-blue-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leadership': return <Crown className="w-4 h-4" />;
      case 'consistency': return <Target className="w-4 h-4" />;
      case 'community': return <Heart className="w-4 h-4" />;
      case 'growth': return <TrendingUp className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'trust': return <Shield className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  return (
    <div className="p-6 pb-20 lg:pb-6">
      {/* Profile Header */}
      <div className="mama-card p-8 mb-8 bg-gradient-to-r from-burgundy-600 to-red-600 text-white">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
              {userData.personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-bold">{userData.personalInfo.name}</h1>
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-red-200 text-lg mb-4">{userData.personalInfo.occupation} " Circle Queen</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">{formatCurrency(userData.stats.totalSaved)}</div>
                <div className="text-xs text-red-200">Total Saved</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">{userData.stats.mamaTokens}</div>
                <div className="text-xs text-red-200">MAMA Tokens</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">{userData.stats.activeCircles}</div>
                <div className="text-xs text-red-200">Active Circles</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">{userData.stats.successRate}%</div>
                <div className="text-xs text-red-200">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex flex-col gap-3">
            <button className="mama-button-secondary bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
            <button className="mama-button-secondary bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="mama-card p-4 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-burgundy-800">{userData.stats.trustScore}%</div>
          <div className="text-xs text-neutral-600">Trust Score</div>
        </div>

        <div className="mama-card p-4 text-center">
          <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-burgundy-800">{userData.stats.circlesJoined}</div>
          <div className="text-xs text-neutral-600">Circles Joined</div>
        </div>

        <div className="mama-card p-4 text-center">
          <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-burgundy-800">{userData.stats.emergencyLoansGiven}</div>
          <div className="text-xs text-neutral-600">Sisters Helped</div>
        </div>

        <div className="mama-card p-4 text-center">
          <Activity className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-burgundy-800">{userData.stats.monthsActive}</div>
          <div className="text-xs text-neutral-600">Months Active</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mama-card p-6 mb-8">
        <div className="flex border-b border-neutral-200 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
            { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
            { id: 'circles', label: 'My Circles', icon: <Users className="w-4 h-4" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-burgundy-800 border-b-2 border-burgundy-600'
                  : 'text-neutral-600 hover:text-burgundy-600'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-burgundy-800">Personal Information</h3>
                <button
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  {showPersonalInfo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Email</div>
                      <div className="font-medium">{showPersonalInfo ? userData.personalInfo.email : '""""""""""""""'}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Phone className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Phone</div>
                      <div className="font-medium">{showPersonalInfo ? userData.personalInfo.phone : '""""""""""""""'}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Location</div>
                      <div className="font-medium">{userData.personalInfo.location}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Joined</div>
                      <div className="font-medium">{formatDate(userData.personalInfo.joinedDate)}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <User className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Occupation</div>
                      <div className="font-medium">{userData.personalInfo.occupation}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Shield className="w-5 h-5 text-neutral-500 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-600">Emergency Contact</div>
                      <div className="font-medium text-sm">{showPersonalInfo ? userData.personalInfo.emergencyContact : '""""""""""""""'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-burgundy-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        {activity.type === 'contribution' && <Coins className="w-4 h-4 text-orange-600" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4 text-orange-600" />}
                        {activity.type === 'emergency_support' && <Heart className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div>
                        <div className="font-medium text-burgundy-800">{activity.description}</div>
                        <div className="text-sm text-neutral-600">{formatDate(activity.date)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount > 0 && (
                        <div className="font-bold text-emerald-600">
                          {activity.type === 'achievement' ? `+${activity.amount} MAMA` : formatCurrency(activity.amount)}
                        </div>
                      )}
                      <div className="text-xs text-emerald-600 capitalize">{activity.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-burgundy-800 mb-2">Your Badge Collection</h3>
              <p className="text-neutral-600">Celebrating your journey as a MamaCredit sister</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.achievements.map((achievement) => (
                <div key={achievement.id} className="mama-card p-6 hover:scale-105 transition-transform relative overflow-hidden">
                  {achievement.progress === 100 && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}

                  <div className={`w-16 h-16 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                    {achievement.icon}
                  </div>

                  <h4 className="font-semibold text-burgundy-800 text-center mb-2">{achievement.name}</h4>
                  <p className="text-sm text-neutral-600 text-center mb-3">{achievement.description}</p>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={`px-2 py-1 rounded-full capitalize ${getRarityBg(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                    <div className="flex items-center text-neutral-600">
                      {getCategoryIcon(achievement.category)}
                      <span className="ml-1 capitalize">{achievement.category}</span>
                    </div>
                  </div>

                  {achievement.progress < 100 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-neutral-600">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-sm font-semibold text-emerald-600 mb-1">
                        +{achievement.mamaTokens} MAMA
                      </div>
                      <div className="text-xs text-neutral-500">
                        Earned: {achievement.earnedDate ? formatDate(achievement.earnedDate) : 'In Progress'}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Circles Tab */}
        {activeTab === 'circles' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-burgundy-800 mb-2">My Savings Circles</h3>
              <p className="text-neutral-600">Your sisterhood savings communities</p>
            </div>

            <div className="space-y-4">
              {userData.circles.map((circle) => (
                <div key={circle.id} className="mama-card p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-burgundy-800 text-lg">{circle.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <span className="flex items-center">
                          <Crown className="w-3 h-3 mr-1" />
                          {circle.role}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Joined {formatDate(circle.joinedDate)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          circle.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {circle.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-burgundy-800">{formatCurrency(circle.totalSaved)}</div>
                      <div className="text-sm text-neutral-600">Total Saved</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <div className="font-bold text-burgundy-800">{formatCurrency(circle.contribution)}</div>
                      <div className="text-xs text-neutral-600">My Contribution</div>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <div className="font-bold text-burgundy-800">{circle.members}</div>
                      <div className="text-xs text-neutral-600">Members</div>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <div className="font-bold text-emerald-600">{circle.trustLevel}</div>
                      <div className="text-xs text-neutral-600">Trust Level</div>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <Link
                        href={`/circles/${circle.id}`}
                        className="inline-flex items-center text-burgundy-600 hover:text-burgundy-800 font-medium text-sm"
                      >
                        View Details
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-burgundy-800 mb-2">Account Settings</h3>
              <p className="text-neutral-600">Manage your preferences and security</p>
            </div>

            <div className="space-y-6">
              {/* Notification Settings */}
              <div className="mama-card p-6">
                <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Circle Updates</div>
                      <div className="text-sm text-neutral-600">Get notified about your circle activities</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Emergency Requests</div>
                      <div className="text-sm text-neutral-600">Sister emergency loan notifications</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketplace Deals</div>
                      <div className="text-sm text-neutral-600">New products and special offers</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="mama-card p-6">
                <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Privacy & Security
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-neutral-600">Show your profile to other sisters</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-neutral-600">Add extra security to your account</div>
                    </div>
                    <button className="mama-button-secondary text-sm">Enable</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Data Export</div>
                      <div className="text-sm text-neutral-600">Download your MamaCredit data</div>
                    </div>
                    <button className="mama-button-secondary text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="mama-card p-6">
                <h4 className="font-semibold text-burgundy-800 mb-4">Account Actions</h4>
                <div className="space-y-4">
                  <button className="w-full mama-button-secondary text-left">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Personal Information
                  </button>
                  <button className="w-full mama-button-secondary text-left">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                  <button className="w-full bg-red-50 text-red-600 border-red-200 hover:bg-red-100 px-4 py-3 rounded-xl font-medium transition-colors flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* African Proverb Footer */}
      <div className="mama-card p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white text-center">
        <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-80" />
        <blockquote className="text-lg font-medium italic mb-3 leading-relaxed">
          "A woman who is well-respected by her community carries wealth beyond gold."
        </blockquote>
        <div className="text-sm opacity-80"> West African Proverb</div>
      </div>
    </div>
  );
}
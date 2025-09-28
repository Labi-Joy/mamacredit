'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Users,
  Calendar,
  Coins,
  MapPin,
  Crown,
  Star,
  TrendingUp,
  Shield,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  AlertCircle,
  CheckCircle,
  Gift,
  Plus,
  Settings,
  UserPlus,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';

export default function CircleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Mock circle data - in real app, fetch by ID
  const circle = {
    id: params.id,
    name: "Lagos Market Queens",
    description: "Empowering market women in Lagos Island to build generational wealth through sisterhood and collective savings. We support each other through life's ups and downs.",
    location: "Lagos Island, Lagos",
    monthlyContribution: 50000,
    totalSaved: 450000,
    currentRound: 3,
    maxMembers: 8,
    members: [
      {
        id: 1,
        name: "Amina Ibrahim",
        role: "Circle Leader",
        avatar: "/placeholder-avatar-1.jpg",
        joinedDate: "2025-01-15",
        contributionsMade: 9,
        badges: ["Faithful Gardener", "Circle Leader"],
        phone: "+234 801 234 5678",
        isCurrentUser: true
      },
      {
        id: 2,
        name: "Fatima Adeola",
        role: "Member",
        avatar: "/placeholder-avatar-2.jpg",
        joinedDate: "2025-01-20",
        contributionsMade: 8,
        badges: ["Sister Supporter"],
        phone: "+234 802 345 6789",
        isCurrentUser: false
      },
      {
        id: 3,
        name: "Grace Okafor",
        role: "Member",
        avatar: "/placeholder-avatar-3.jpg",
        joinedDate: "2025-02-01",
        contributionsMade: 7,
        badges: ["Caring Heart"],
        phone: "+234 803 456 7890",
        isCurrentUser: false
      },
      {
        id: 4,
        name: "Zainab Mohammed",
        role: "Member",
        avatar: "/placeholder-avatar-4.jpg",
        joinedDate: "2025-02-10",
        contributionsMade: 6,
        badges: ["Community Builder"],
        phone: "+234 804 567 8901",
        isCurrentUser: false
      },
      {
        id: 5,
        name: "Blessing Eze",
        role: "Member",
        avatar: "/placeholder-avatar-5.jpg",
        joinedDate: "2025-02-15",
        contributionsMade: 6,
        badges: ["New Sister"],
        phone: "+234 805 678 9012",
        isCurrentUser: false
      },
      {
        id: 6,
        name: "Khadija Adamu",
        role: "Member",
        avatar: "/placeholder-avatar-6.jpg",
        joinedDate: "2025-02-20",
        contributionsMade: 5,
        badges: ["Rising Star"],
        phone: "+234 806 789 0123",
        isCurrentUser: false
      }
    ],
    payoutSchedule: [
      { round: 1, recipient: "Amina Ibrahim", amount: 400000, date: "2025-02-01", status: "completed" },
      { round: 2, recipient: "Fatima Adeola", amount: 400000, date: "2025-03-01", status: "completed" },
      { round: 3, recipient: "Grace Okafor", amount: 450000, date: "2025-04-01", status: "current" },
      { round: 4, recipient: "Zainab Mohammed", amount: 450000, date: "2025-05-01", status: "upcoming" },
      { round: 5, recipient: "Blessing Eze", amount: 450000, date: "2025-06-01", status: "upcoming" },
      { round: 6, recipient: "Khadija Adamu", amount: 450000, date: "2025-07-01", status: "upcoming" }
    ],
    recentActivity: [
      {
        id: 1,
        type: "contribution",
        user: "Khadija Adamu",
        action: "made monthly contribution",
        amount: 50000,
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        type: "payout",
        user: "Grace Okafor",
        action: "received monthly payout",
        amount: 450000,
        timestamp: "3 days ago"
      },
      {
        id: 3,
        type: "emergency_request",
        user: "Blessing Eze",
        action: "requested emergency loan",
        amount: 75000,
        timestamp: "1 week ago",
        status: "approved"
      }
    ],
    meetingDetails: {
      schedule: "1st Monday of every month",
      time: "6:00 PM",
      location: "Virtual (WhatsApp Group)",
      nextMeeting: "2025-05-05"
    },
    rules: [
      "Monthly contributions must be made by the 5th of each month",
      "Emergency loans require majority vote approval",
      "Maximum emergency loan: 50% of circle funds",
      "Missed contributions incur ₦5,000 late fee after 7 days",
      "All members must attend monthly meetings or send proxy"
    ],
    requirements: [
      "Lagos Island resident or trader",
      "Stable monthly income of ₦100,000+",
      "2+ years in business/trading",
      "WhatsApp access for group communication",
      "Reference from existing circle member"
    ],
    status: "recruiting", // recruiting, full, active
    emergencyLoan: {
      enabled: true,
      maxPercentage: 50,
      votingPeriod: 24
    },
    successRate: 98,
    avgMemberAge: 35,
    createdDate: "2025-01-15"
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contribution': return <Coins className="w-4 h-4 text-emerald-500" />;
      case 'payout': return <Gift className="w-4 h-4 text-orange-500" />;
      case 'emergency_request': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Heart className="w-4 h-4 text-purple-500" />;
    }
  };

  const isUserMember = circle.members.some(member => member.isCurrentUser);
  const canJoin = circle.status === 'recruiting' && circle.members.length < circle.maxMembers && !isUserMember;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/circles" className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </Link>
              <div>
                <h1 className="font-bold text-lg text-burgundy-800">{circle.name}</h1>
                <p className="text-xs text-neutral-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {circle.location}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-neutral-600" />
              </button>
              {isUserMember && (
                <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-neutral-600" />
                </button>
              )}
              {canJoin && (
                <button 
                  onClick={() => setShowJoinModal(true)}
                  className="mama-button-primary"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Circle
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Circle Hero */}
        <div className="mama-card p-8 mb-8 bg-gradient-to-r from-burgundy-600 to-red-600 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{circle.name}</h2>
                  <div className="flex items-center text-red-200">
                    <Star className="w-4 h-4 mr-1" />
                    <span>{circle.successRate}% Success Rate</span>
                  </div>
                </div>
              </div>
              
              <p className="text-red-100 mb-6 leading-relaxed">
                {circle.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(circle.totalSaved)}</div>
                  <div className="text-red-200 text-sm">Total Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{circle.members.length}/{circle.maxMembers}</div>
                  <div className="text-red-200 text-sm">Sisters</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold mb-3">Current Cycle Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Round {circle.currentRound} of {circle.maxMembers}</span>
                    <span>Next: {circle.payoutSchedule.find(p => p.status === 'upcoming')?.recipient}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-300 to-yellow-300 h-2 rounded-full"
                      style={{ width: `${(circle.currentRound / circle.maxMembers) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-red-200">
                    Progress: {Math.round((circle.currentRound / circle.maxMembers) * 100)}% complete
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{formatCurrency(circle.monthlyContribution)}</div>
                  <div className="text-xs text-red-200">Monthly</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{circle.meetingDetails.schedule.split(' ')[0]} {circle.meetingDetails.schedule.split(' ')[1]}</div>
                  <div className="text-xs text-red-200">Meeting Day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mama-card p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: <Heart className="w-4 h-4" /> },
              { id: 'members', label: 'Sisters', icon: <Users className="w-4 h-4" /> },
              { id: 'payments', label: 'Payments', icon: <Coins className="w-4 h-4" /> },
              { id: 'activity', label: 'Activity', icon: <TrendingUp className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                    : 'text-burgundy-600 hover:bg-orange-50'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="mama-card p-6">
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Circle Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-burgundy-800 mb-3">Meeting Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-neutral-500 mr-2" />
                          <span>{circle.meetingDetails.schedule}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-neutral-500 mr-2" />
                          <span>{circle.meetingDetails.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-neutral-500 mr-2" />
                          <span>{circle.meetingDetails.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="text-sm font-semibold text-green-800">Next Meeting</div>
                        <div className="text-sm text-green-600">{new Date(circle.meetingDetails.nextMeeting).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-burgundy-800 mb-3">Circle Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Success Rate:</span>
                          <span className="font-semibold text-emerald-600">{circle.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Average Age:</span>
                          <span className="font-semibold text-burgundy-800">{circle.avgMemberAge} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Created:</span>
                          <span className="font-semibold text-burgundy-800">{new Date(circle.createdDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Emergency Support:</span>
                          <span className="font-semibold text-emerald-600">
                            {circle.emergencyLoan.enabled ? 'Available' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mama-card p-6">
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Circle Rules</h3>
                  <div className="space-y-3">
                    {circle.rules.map((rule, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700 text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mama-card p-6">
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Membership Requirements</h3>
                  <div className="space-y-3">
                    {circle.requirements.map((req, index) => (
                      <div key={index} className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="mama-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-burgundy-800">Circle Sisters</h3>
                  <div className="text-sm text-neutral-600">
                    {circle.members.length} of {circle.maxMembers} members
                  </div>
                </div>
                
                <div className="space-y-4">
                  {circle.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-burgundy-800">{member.name}</h4>
                            {member.role === 'Circle Leader' && (
                              <Crown className="w-4 h-4 text-orange-500" />
                            )}
                            {member.isCurrentUser && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">You</span>
                            )}
                          </div>
                          <div className="text-sm text-neutral-600">{member.role}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {member.badges.map((badge, index) => (
                              <span key={index} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-semibold text-burgundy-800">
                          {member.contributionsMade} contributions
                        </div>
                        <div className="text-xs text-neutral-600">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </div>
                        {isUserMember && (
                          <div className="flex gap-1 mt-2">
                            <button className="p-1 hover:bg-orange-200 rounded">
                              <Phone className="w-3 h-3 text-neutral-600" />
                            </button>
                            <button className="p-1 hover:bg-orange-200 rounded">
                              <MessageCircle className="w-3 h-3 text-neutral-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {circle.members.length < circle.maxMembers && (
                    <div className="p-4 border-2 border-dashed border-orange-200 rounded-xl text-center">
                      <Plus className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <div className="text-sm text-neutral-600">
                        {circle.maxMembers - circle.members.length} spot{circle.maxMembers - circle.members.length !== 1 ? 's' : ''} available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="mama-card p-6">
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Payout Schedule</h3>
                  <div className="space-y-3">
                    {circle.payoutSchedule.map((payout) => (
                      <div key={payout.round} className={`flex items-center justify-between p-4 rounded-xl ${
                        payout.status === 'completed' ? 'bg-green-50 border border-green-200' :
                        payout.status === 'current' ? 'bg-orange-50 border border-orange-200' :
                        'bg-neutral-50 border border-neutral-200'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            payout.status === 'completed' ? 'bg-green-500 text-white' :
                            payout.status === 'current' ? 'bg-orange-500 text-white' :
                            'bg-neutral-300 text-neutral-600'
                          }`}>
                            {payout.round}
                          </div>
                          <div>
                            <div className="font-semibold text-burgundy-800">{payout.recipient}</div>
                            <div className="text-sm text-neutral-600">
                              {new Date(payout.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-burgundy-800">
                            {formatCurrency(payout.amount)}
                          </div>
                          <div className={`text-xs capitalize ${
                            payout.status === 'completed' ? 'text-green-600' :
                            payout.status === 'current' ? 'text-orange-600' :
                            'text-neutral-600'
                          }`}>
                            {payout.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isUserMember && (
                  <div className="mama-card p-6">
                    <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button className="mama-button-primary w-full">
                        <Coins className="w-4 h-4 mr-2" />
                        Make Contribution
                      </button>
                      <button className="mama-button-secondary w-full">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Request Emergency Loan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="mama-card p-6">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {circle.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-orange-50 rounded-lg transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-burgundy-800 text-sm">{activity.user}</span>
                          <span className="text-sm text-neutral-600">{activity.action}</span>
                        </div>
                        {activity.amount && (
                          <div className="text-lg font-bold text-burgundy-800 mt-1">
                            {formatCurrency(activity.amount)}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-neutral-500">{activity.timestamp}</span>
                          {activity.status && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              activity.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="mama-card p-6">
              <h3 className="font-semibold text-burgundy-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monthly Target:</span>
                  <span className="font-semibold text-burgundy-800">{formatCurrency(circle.monthlyContribution * circle.members.length)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Per Member:</span>
                  <span className="font-semibold text-burgundy-800">{formatCurrency(circle.monthlyContribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Current Pot:</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(circle.totalSaved)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Next Payout:</span>
                  <span className="font-semibold text-orange-600">{formatCurrency(circle.monthlyContribution * circle.members.length)}</span>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            {circle.emergencyLoan.enabled && (
              <div className="mama-card p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                <h3 className="font-semibold text-burgundy-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-500" />
                  Emergency Support
                </h3>
                <p className="text-sm text-neutral-700 mb-4">
                  Sisters can request emergency loans up to {circle.emergencyLoan.maxPercentage}% of circle funds.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Max Amount:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency((circle.totalSaved * circle.emergencyLoan.maxPercentage) / 100)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Voting Period:</span>
                    <span className="font-semibold text-burgundy-800">{circle.emergencyLoan.votingPeriod} hours</span>
                  </div>
                </div>
                {isUserMember && (
                  <button className="w-full mt-4 mama-button-secondary text-sm">
                    Request Emergency Help
                  </button>
                )}
              </div>
            )}

            {/* Motivational Quote */}
            <div className="mama-card p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <blockquote className="text-sm font-medium italic mb-3 leading-relaxed">
                  "When spider webs unite, they can tie up a lion. Together, your small contributions create great abundance."
                </blockquote>
                <div className="text-xs opacity-80">— African Proverb</div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-burgundy-800 mb-4">Join {circle.name}</h3>
              <p className="text-neutral-700 mb-6">
                You're about to request to join this sisterhood circle. The circle leader will review your application based on the membership requirements.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-burgundy-800 mb-2">Monthly Commitment</h4>
                  <div className="text-2xl font-bold text-burgundy-800">{formatCurrency(circle.monthlyContribution)}</div>
                  <div className="text-sm text-neutral-600">Due by 5th of each month</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-burgundy-800 mb-2">Your Estimated Payout</h4>
                  <div className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(circle.monthlyContribution * (circle.members.length + 1))}
                  </div>
                  <div className="text-sm text-neutral-600">When it's your turn</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowJoinModal(false)}
                  className="mama-button-secondary flex-1"
                >
                  Cancel
                </button>
                <button className="mama-button-primary flex-1">
                  Send Join Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
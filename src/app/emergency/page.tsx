'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Plus,
  AlertCircle,
  Clock,
  Users,
  Heart,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  Phone,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Crown,
  ThumbsUp,
  ThumbsDown,
  Hospital,
  GraduationCap,
  Home,
  Briefcase
} from 'lucide-react';

export default function EmergencyPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeRemaining, setTimeRemaining] = useState<{[key: string]: number}>({});

  // Mock emergency requests data
  const emergencyRequests = [
    {
      id: "loan_1",
      borrower: {
        name: "Grace Okafor",
        avatar: "/placeholder-avatar-3.jpg",
        isCurrentUser: false
      },
      circle: {
        id: "circle_1",
        name: "Lagos Market Queens",
        totalMembers: 6
      },
      amount: 75000,
      reason: "My daughter needs urgent surgery for appendicitis",
      description: "The hospital is asking for ₦75,000 deposit before they can start the surgery. We don't have medical insurance and I've already spent our savings on initial tests. My daughter is in pain and the doctors say we can't wait much longer. I promise to repay within 30 days from my market earnings.",
      type: "medical",
      urgency: "high",
      requestDate: "2025-04-01T10:00:00Z",
      votingDeadline: "2025-04-02T10:00:00Z",
      votes: {
        for: 4,
        against: 0,
        abstain: 0,
        total: 6,
        hasVoted: false,
        userVote: null
      },
      status: "voting", // voting, approved, rejected, repaid, overdue
      repaymentPlan: "30_days",
      documents: [
        { type: "medical_bill", name: "hospital_bill.pdf" },
        { type: "photo", name: "prescription.jpg" }
      ],
      comments: [
        {
          id: 1,
          author: "Amina Ibrahim",
          message: "Praying for your daughter, sister. You have my full support! 🙏",
          timestamp: "2 hours ago",
          vote: "for"
        },
        {
          id: 2,
          author: "Fatima Adeola", 
          message: "I went through something similar last year. The sisters helped me and I was able to repay on time. Supporting you! ❤️",
          timestamp: "1 hour ago",
          vote: "for"
        }
      ]
    },
    {
      id: "loan_2",
      borrower: {
        name: "Khadija Adamu",
        avatar: "/placeholder-avatar-6.jpg",
        isCurrentUser: false
      },
      circle: {
        id: "circle_2",
        name: "Young Professionals United",
        totalMembers: 4
      },
      amount: 45000,
      reason: "Need funds to restock my business after theft",
      description: "Thieves broke into my shop last week and stole most of my inventory. I need to restock quickly to keep my customers and pay my rent. The insurance will take weeks to process. I can repay within 15 days from sales.",
      type: "business",
      urgency: "medium",
      requestDate: "2025-03-30T14:00:00Z",
      votingDeadline: "2025-03-31T14:00:00Z",
      votes: {
        for: 3,
        against: 0,
        abstain: 1,
        total: 4,
        hasVoted: true,
        userVote: "for"
      },
      status: "approved",
      repaymentPlan: "15_days",
      documents: [
        { type: "police_report", name: "theft_report.pdf" },
        { type: "photo", name: "shop_damage.jpg" }
      ],
      comments: [
        {
          id: 1,
          author: "You",
          message: "So sorry this happened to you! Business theft is devastating. You have my vote.",
          timestamp: "1 day ago",
          vote: "for"
        }
      ]
    },
    {
      id: "loan_3",
      borrower: {
        name: "Blessing Eze",
        avatar: "/placeholder-avatar-5.jpg",
        isCurrentUser: true
      },
      circle: {
        id: "circle_1",
        name: "Lagos Market Queens",
        totalMembers: 6
      },
      amount: 30000,
      reason: "Son's school fees for final exams",
      description: "My son is in SS3 and needs to pay for his final examinations. Without these fees, he cannot take the exams and will have to repeat the year. I've been saving but came up short this month due to slow business.",
      type: "education",
      urgency: "medium",
      requestDate: "2025-03-25T09:00:00Z",
      votingDeadline: "2025-03-26T09:00:00Z",
      votes: {
        for: 5,
        against: 1,
        abstain: 0,
        total: 6,
        hasVoted: false,
        userVote: null
      },
      status: "repaid",
      repaymentPlan: "30_days",
      repaidDate: "2025-04-20T00:00:00Z",
      documents: [
        { type: "school_bill", name: "exam_fees.pdf" }
      ],
      comments: []
    },
    {
      id: "loan_4",
      borrower: {
        name: "Zainab Mohammed",
        avatar: "/placeholder-avatar-4.jpg",
        isCurrentUser: false
      },
      circle: {
        id: "circle_1",
        name: "Lagos Market Queens",
        totalMembers: 6
      },
      amount: 60000,
      reason: "Rent payment due to late customer payments",
      description: "My biggest customer hasn't paid me for 3 months and now my rent is due. The landlord has given me final notice. I have contracts that will pay next month but I need help now to avoid eviction.",
      type: "housing",
      urgency: "high",
      requestDate: "2025-04-02T08:00:00Z",
      votingDeadline: "2025-04-03T08:00:00Z",
      votes: {
        for: 2,
        against: 0,
        abstain: 0,
        total: 6,
        hasVoted: false,
        userVote: null
      },
      status: "voting",
      repaymentPlan: "30_days",
      documents: [
        { type: "rental_notice", name: "eviction_notice.pdf" },
        { type: "contract", name: "pending_contracts.pdf" }
      ],
      comments: [
        {
          id: 1,
          author: "Amina Ibrahim",
          message: "Housing is so important. I know Zainab is reliable - she always contributes on time.",
          timestamp: "30 minutes ago",
          vote: "for"
        }
      ]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Requests', count: emergencyRequests.length },
    { value: 'voting', label: 'Needs Your Vote', count: emergencyRequests.filter(r => r.status === 'voting' && !r.votes.hasVoted).length },
    { value: 'high_urgency', label: 'High Urgency', count: emergencyRequests.filter(r => r.urgency === 'high').length },
    { value: 'my_requests', label: 'My Requests', count: emergencyRequests.filter(r => r.borrower.isCurrentUser).length }
  ];

  // Calculate time remaining for active votes
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const newTimeRemaining: {[key: string]: number} = {};
      
      emergencyRequests.forEach(request => {
        if (request.status === 'voting') {
          const deadline = new Date(request.votingDeadline).getTime();
          const remaining = Math.max(0, deadline - now);
          newTimeRemaining[request.id] = remaining;
        }
      });
      
      setTimeRemaining(newTimeRemaining);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      voting: { color: 'bg-orange-100 text-orange-700', label: 'Voting Open' },
      approved: { color: 'bg-green-100 text-green-700', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-700', label: 'Not Approved' },
      repaid: { color: 'bg-blue-100 text-blue-700', label: 'Repaid' },
      overdue: { color: 'bg-red-100 text-red-700', label: 'Overdue' }
    };
    
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`mama-badge ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'low': return <Shield className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical': return <Hospital className="w-4 h-4 text-red-500" />;
      case 'education': return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'housing': return <Home className="w-4 h-4 text-green-500" />;
      case 'business': return <Briefcase className="w-4 h-4 text-purple-500" />;
      default: return <Heart className="w-4 h-4 text-pink-500" />;
    }
  };

  const filteredRequests = emergencyRequests.filter(request => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'voting') return request.status === 'voting' && !request.votes.hasVoted;
    if (selectedFilter === 'high_urgency') return request.urgency === 'high';
    if (selectedFilter === 'my_requests') return request.borrower.isCurrentUser;
    return true;
  });

  const handleVote = (requestId: string, vote: 'for' | 'against') => {
    // Here you would integrate with the Hedera service
    console.log(`Voting ${vote} on request ${requestId}`);
    
    // Update local state for demo
    // In real app, this would trigger a re-fetch
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </Link>
              <div>
                <h1 className="font-bold text-lg text-burgundy-800">Emergency Support</h1>
                <p className="text-xs text-neutral-600">Sister helping sister 💜</p>
              </div>
            </div>
            
            <Link href="/emergency/request" className="mama-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Request Help
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">
              {emergencyRequests.filter(r => r.status === 'voting').length}
            </div>
            <div className="text-sm text-neutral-600">Active Requests</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">
              {emergencyRequests.filter(r => r.status === 'approved' || r.status === 'repaid').length}
            </div>
            <div className="text-sm text-neutral-600">Approved</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">97%</div>
            <div className="text-sm text-neutral-600">Success Rate</div>
          </div>
          
          <div className="mama-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-burgundy-800">₦2.1M</div>
            <div className="text-sm text-neutral-600">Total Helped</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mama-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFilter === option.value
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                        : 'text-burgundy-600 hover:bg-orange-50'
                    }`}
                  >
                    {option.label}
                    {option.count > 0 && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedFilter === option.value
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-100 text-burgundy-700'
                      }`}>
                        {option.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Requests List */}
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="mama-card p-6 hover:shadow-mama-medium transition-all">
              
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {request.borrower.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-burgundy-800">{request.borrower.name}</h3>
                      {request.borrower.isCurrentUser && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">You</span>
                      )}
                    </div>
                    <div className="text-sm text-neutral-600 mb-2">{request.circle.name}</div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(request.status)}
                      <div className="flex items-center text-sm text-neutral-600">
                        {getTypeIcon(request.type)}
                        <span className="ml-1 capitalize">{request.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        {getUrgencyIcon(request.urgency)}
                        <span className="ml-1 capitalize">{request.urgency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-burgundy-800 mb-1">
                    {formatCurrency(request.amount)}
                  </div>
                  {request.status === 'voting' && timeRemaining[request.id] && (
                    <div className="text-sm text-red-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTimeRemaining(timeRemaining[request.id])} left
                    </div>
                  )}
                </div>
              </div>

              {/* Request Details */}
              <div className="mb-4">
                <h4 className="font-semibold text-burgundy-800 mb-2">"{request.reason}"</h4>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {request.description.length > 200 
                    ? `${request.description.substring(0, 200)}...` 
                    : request.description
                  }
                </p>
              </div>

              {/* Voting Progress */}
              {request.status === 'voting' && (
                <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-semibold text-burgundy-800">Community Vote</h5>
                    <div className="text-sm text-neutral-600">
                      {request.votes.for + request.votes.against} of {request.votes.total} sisters voted
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{request.votes.for}</div>
                      <div className="text-xs text-neutral-600">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{request.votes.against}</div>
                      <div className="text-xs text-neutral-600">Against</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-600">{request.votes.abstain}</div>
                      <div className="text-xs text-neutral-600">Abstain</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full"
                      style={{ width: `${(request.votes.for / request.votes.total) * 100}%` }}
                    />
                  </div>
                  
                  <div className="text-center text-sm">
                    <span className="text-neutral-600">Needs </span>
                    <span className="font-semibold text-burgundy-800">
                      {Math.ceil(request.votes.total / 2)} votes
                    </span>
                    <span className="text-neutral-600"> to approve</span>
                  </div>
                </div>
              )}

              {/* Recent Comments Preview */}
              {request.comments.length > 0 && (
                <div className="mb-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h5 className="font-semibold text-burgundy-800 mb-3 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Sister Support ({request.comments.length})
                  </h5>
                  <div className="space-y-2">
                    {request.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-semibold text-burgundy-800">{comment.author}:</span>
                        <span className="text-neutral-700 ml-2">{comment.message}</span>
                        <div className="text-xs text-neutral-500 mt-1">{comment.timestamp}</div>
                      </div>
                    ))}
                    {request.comments.length > 2 && (
                      <div className="text-xs text-burgundy-600">
                        +{request.comments.length - 2} more comments
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-orange-100">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <Link 
                    href={`/emergency/${request.id}`}
                    className="flex items-center text-burgundy-600 hover:text-burgundy-800 font-medium text-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Link>
                  
                  {request.comments.length > 0 && (
                    <div className="flex items-center text-neutral-600 text-sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {request.comments.length} comment{request.comments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  
                  {request.documents.length > 0 && (
                    <div className="flex items-center text-neutral-600 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {request.documents.length} document{request.documents.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                {request.status === 'voting' && !request.votes.hasVoted && !request.borrower.isCurrentUser && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleVote(request.id, 'against')}
                      className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Against
                    </button>
                    <button
                      onClick={() => handleVote(request.id, 'for')}
                      className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Support
                    </button>
                  </div>
                )}
                
                {request.votes.hasVoted && (
                  <div className="flex items-center text-emerald-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    You voted {request.votes.userVote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">No emergency requests</h3>
            <p className="text-neutral-500 mb-6">
              {selectedFilter === 'all' 
                ? 'Your community is doing well! No sisters need emergency support right now.'
                : 'No requests match your current filter. Try adjusting your selection.'
              }
            </p>
            <Link href="/emergency/request" className="mama-button-primary">
              Request Support
            </Link>
          </div>
        )}

        {/* Call to Action */}
        <div className="mama-card p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center mt-8">
          <Crown className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-3">Emergency Grace in Action</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            "When the hen gathers her chicks under her wings" - Your sisterhood is a safety net. 
            In 24 hours or less, your community can provide the support you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/emergency/request" className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Request Emergency Help
            </Link>
            <Link href="/circles" className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Join More Circles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
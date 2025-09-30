'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Shield,
  Crown,
  Heart,
  ChevronRight,
  Coins,
  TrendingUp,
  Calendar,
  ArrowLeft,
  SlidersHorizontal
} from 'lucide-react';

export default function CirclesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for available circles
  const allCircles = [
    {
      id: "circle_1",
      name: "Lagos Market Queens",
      description: "Empowering market women in Lagos Island to build generational wealth through sisterhood.",
      members: 6,
      maxMembers: 8,
      monthlyContribution: 50000,
      totalSaved: 300000,
      location: "Lagos Island, Lagos",
      tags: ["market-women", "experienced", "high-saving"],
      createdBy: "Amina Ibrahim",
      createdAt: "2025-01-15",
      successRate: 98,
      avgAge: 35,
      meetingDay: "1st Monday",
      status: "recruiting",
      urgencyLevel: "medium",
      requirements: ["2+ years market experience", "Monthly income ₦100k+"],
      achievements: ["Faithful Gardener", "Community Builder"]
    },
    {
      id: "circle_2",
      name: "Young Professionals United", 
      description: "Tech-savvy women in their 20s and 30s saving for homes, businesses, and dreams.",
      members: 4,
      maxMembers: 6,
      monthlyContribution: 75000,
      totalSaved: 300000,
      location: "Victoria Island, Lagos",
      tags: ["young-professionals", "tech", "high-contribution"],
      createdBy: "Fatima Adeola",
      createdAt: "2025-02-01",
      successRate: 100,
      avgAge: 28,
      meetingDay: "Last Friday",
      status: "recruiting",
      urgencyLevel: "low",
      requirements: ["Age 23-35", "Professional career", "Digital literacy"],
      achievements: ["Tech Pioneer", "Future Builder"]
    },
    {
      id: "circle_3",
      name: "Mama Entrepreneurs Hub",
      description: "Mothers running small businesses, supporting each other's growth and children's education.",
      members: 8,
      maxMembers: 8,
      monthlyContribution: 30000,
      totalSaved: 240000,
      location: "Ikeja, Lagos",
      tags: ["entrepreneurs", "mothers", "full"],
      createdBy: "Grace Okafor",
      createdAt: "2024-11-20",
      successRate: 96,
      avgAge: 38,
      meetingDay: "2nd Saturday",
      status: "full",
      urgencyLevel: "low",
      requirements: ["Own a business", "Have children", "Community involvement"],
      achievements: ["Business Builder", "Caring Mother"]
    },
    {
      id: "circle_4",
      name: "Abuja Sisters Circle",
      description: "Government workers and civil servants building emergency funds and retirement savings.",
      members: 3,
      maxMembers: 10,
      monthlyContribution: 40000,
      totalSaved: 120000,
      location: "Central Area, Abuja",
      tags: ["civil-servants", "new", "large-group"],
      createdBy: "Zainab Mohammed",
      createdAt: "2025-02-20",
      successRate: 100,
      avgAge: 32,
      meetingDay: "Mid-month",
      status: "recruiting",
      urgencyLevel: "high",
      requirements: ["Government employee", "Stable income", "Abuja resident"],
      achievements: ["New Leader"]
    },
    {
      id: "circle_5",
      name: "University Area Traders",
      description: "Women trading around university campuses, saving for shop expansions and children's university fees.",
      members: 5,
      maxMembers: 7,
      monthlyContribution: 25000,
      totalSaved: 125000,
      location: "Nsukka, Enugu",
      tags: ["traders", "education-focused", "medium-saving"],
      createdBy: "Blessing Eze",
      createdAt: "2025-01-10",
      successRate: 94,
      avgAge: 41,
      meetingDay: "3rd Wednesday",
      status: "recruiting",
      urgencyLevel: "medium",
      requirements: ["Trade near university", "Children in school", "Regular income"],
      achievements: ["Education Supporter", "Trade Expert"]
    }
  ];

  // Filter circles based on search and filters
  const filteredCircles = allCircles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'recruiting' && circle.status === 'recruiting') ||
                         (selectedFilter === 'new' && circle.tags.includes('new')) ||
                         (selectedFilter === 'high-contribution' && circle.monthlyContribution >= 50000) ||
                         (selectedFilter === 'my-location' && circle.location.includes('Lagos'));
    
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Circles', count: allCircles.length },
    { value: 'recruiting', label: 'Open for Joining', count: allCircles.filter(c => c.status === 'recruiting').length },
    { value: 'new', label: 'Newly Created', count: allCircles.filter(c => c.tags.includes('new')).length },
    { value: 'high-contribution', label: 'High Savers (₦50k+)', count: allCircles.filter(c => c.monthlyContribution >= 50000).length },
    { value: 'my-location', label: 'Near Me (Lagos)', count: allCircles.filter(c => c.location.includes('Lagos')).length }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string, urgencyLevel: string) => {
    if (status === 'full') {
      return <span className="mama-badge mama-badge-warning">Circle Full</span>;
    }
    if (status === 'recruiting') {
      const urgencyColors = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-orange-100 text-orange-700', 
        low: 'bg-green-100 text-green-700'
      };
      return (
        <span className={`mama-badge ${urgencyColors[urgencyLevel as keyof typeof urgencyColors]}`}>
          {urgencyLevel === 'high' ? 'Urgent - Few Spots!' : 
           urgencyLevel === 'medium' ? 'Accepting Members' : 'Open to Join'}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="mama-card p-8 mb-8 bg-gradient-to-r from-burgundy-600 to-red-600 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Find Your <span className="text-orange-300">Sisterhood</span> Circle
            </h2>
            <p className="text-xl text-red-100 mb-6">
              Join verified women in your community who are building financial freedom together. 
              Every circle is a family, every sister is a treasure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-red-200">
                <Shield className="w-5 h-5 mr-2" />
                <span>Verified Sisters Only</span>
              </div>
              <div className="flex items-center text-red-200">
                <Crown className="w-5 h-5 mr-2" />
                <span>Proven Success Rates</span>
              </div>
              <div className="flex items-center text-red-200">
                <Heart className="w-5 h-5 mr-2" />
                <span>Community Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mama-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                className="mama-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mama-button-secondary flex items-center"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-orange-100">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedFilter === option.value
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                        : 'bg-orange-50 hover:bg-orange-100 text-burgundy-800'
                    }`}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className={`text-xs ${selectedFilter === option.value ? 'text-red-100' : 'text-neutral-600'}`}>
                      {option.count} circles
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-neutral-600">
              {searchTerm && `Showing results for "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Circles Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredCircles.map((circle) => (
            <div key={circle.id} className="mama-card p-6 hover:scale-[1.02] transition-transform">
              {/* Circle Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-burgundy-800">{circle.name}</h4>
                    {getStatusBadge(circle.status, circle.urgencyLevel)}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {circle.location}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Meets: {circle.meetingDay}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-burgundy-800">
                    {formatCurrency(circle.monthlyContribution)}
                  </div>
                  <div className="text-sm text-neutral-600">per month</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                {circle.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-burgundy-800">
                    {circle.members}/{circle.maxMembers}
                  </div>
                  <div className="text-xs text-neutral-600">Members</div>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-burgundy-800">
                    {circle.successRate}%
                  </div>
                  <div className="text-xs text-neutral-600">Success</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Coins className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-burgundy-800">
                    {formatCurrency(circle.totalSaved)}
                  </div>
                  <div className="text-xs text-neutral-600">Total Saved</div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h5 className="font-semibold text-burgundy-800 text-sm mb-2">Requirements:</h5>
                <div className="space-y-1">
                  {circle.requirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {circle.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-xs font-medium text-burgundy-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Circle Leader */}
              <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mr-3"></div>
                  <div>
                    <div className="text-sm font-semibold text-burgundy-800">{circle.createdBy}</div>
                    <div className="text-xs text-neutral-600">Circle Leader</div>
                  </div>
                </div>
                
                <Link 
                  href={`/circles/${circle.id}`} 
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    circle.status === 'full'
                      ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600'
                  }`}
                >
                  {circle.status === 'full' ? 'Circle Full' : 'View Details'}
                  {circle.status !== 'full' && <ChevronRight className="w-4 h-4 ml-1" />}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredCircles.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 mb-6">
              {searchTerm 
                ? `No circles match "${searchTerm}". Try different keywords or create your own circle.`
                : 'No circles match your current filters. Try adjusting your search criteria.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                className="mama-button-secondary"
              >
                Clear Filters
              </button>
              <Link href="/circles/create" className="mama-button-primary">
                Create Your Own Circle
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mama-card p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
          <Crown className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Create a circle tailored to your community, savings goals, and sisterhood vision. 
            Be the leader your community needs.
          </p>
          <Link href="/circles/create" className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors inline-flex items-center">
            Start Your Circle
            <Plus className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
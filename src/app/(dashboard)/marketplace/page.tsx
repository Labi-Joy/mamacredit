'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search,
  Filter,
  Plus,
  Star,
  Heart,
  ShoppingCart,
  User,
  MapPin,
  Clock,
  Crown,
  TrendingUp,
  Gift,
  Sparkles,
  Eye,
  MessageCircle,
  Shield,
  Award,
  Package,
  Scissors,
  Utensils,
  Shirt,
  Baby,
  Home,
  Briefcase
} from 'lucide-react';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Mock marketplace data
  const categories = [
    { id: 'all', name: 'All Products', icon: <Package className="w-5 h-5" />, count: 42 },
    { id: 'beauty', name: 'Beauty & Hair', icon: <Scissors className="w-5 h-5" />, count: 12 },
    { id: 'food', name: 'Food & Snacks', icon: <Utensils className="w-5 h-5" />, count: 8 },
    { id: 'fashion', name: 'Fashion & Clothing', icon: <Shirt className="w-5 h-5" />, count: 15 },
    { id: 'baby', name: 'Baby & Kids', icon: <Baby className="w-5 h-5" />, count: 5 },
    { id: 'home', name: 'Home & Living', icon: <Home className="w-5 h-5" />, count: 7 },
    { id: 'services', name: 'Services', icon: <Briefcase className="w-5 h-5" />, count: 6 }
  ];

  const products = [
    {
      id: 'prod_1',
      title: 'Premium Shea Butter Hair Cream',
      description: 'Handmade with organic shea butter from Northern Nigeria. Perfect for natural hair care and moisturizing.',
      price: 3500,
      originalPrice: 4500,
      seller: {
        name: 'Amina Ibrahim',
        avatar: '/placeholder-seller-1.jpg',
        rating: 4.9,
        totalReviews: 127,
        badges: ['Circle Leader', 'Verified Seller'],
        circle: 'Lagos Market Queens',
        isVerified: true
      },
      images: ['/images/illustrations/haircare.png'],
      category: 'beauty',
      tags: ['organic', 'handmade', 'natural'],
      inStock: true,
      stockCount: 15,
      sold: 89,
      featured: true,
      discount: 22,
      location: 'Lagos Island, Lagos',
      createdAt: '2025-04-01T00:00:00Z',
      likes: 24,
      views: 156,
      reviews: [
        {
          id: 1,
          buyer: 'Fatima A.',
          rating: 5,
          comment: 'Amazing quality! My hair has never been softer. Sister Amina makes the best products! 💜',
          date: '2025-03-28'
        }
      ]
    },
    {
      id: 'prod_2',
      title: 'Ankara Print Face Masks (Pack of 5)',
      description: 'Beautiful handcrafted face masks with authentic Ankara prints. Washable and reusable with comfortable ear loops.',
      price: 2800,
      originalPrice: null,
      seller: {
        name: 'Grace Okafor',
        avatar: '/placeholder-seller-2.jpg',
        rating: 4.8,
        totalReviews: 93,
        badges: ['Caring Heart', 'Fast Delivery'],
        circle: 'Lagos Market Queens',
        isVerified: true
      },
      images: ['/images/illustrations/clothes1.png'],
      category: 'fashion',
      tags: ['ankara', 'handmade', 'pack'],
      inStock: true,
      stockCount: 8,
      sold: 45,
      featured: false,
      discount: 0,
      location: 'Ikeja, Lagos',
      createdAt: '2025-03-30T00:00:00Z',
      likes: 18,
      views: 89,
      reviews: []
    },
    {
      id: 'prod_3',
      title: 'Homemade Chin Chin (Large Pack)',
      description: 'Crispy, sweet, and perfectly seasoned chin chin made with love in my kitchen. Perfect for sharing with family!',
      price: 1500,
      originalPrice: null,
      seller: {
        name: 'Blessing Eze',
        avatar: '/placeholder-seller-3.jpg',
        rating: 4.7,
        totalReviews: 156,
        badges: ['Top Rated', 'Fresh Products'],
        circle: 'Young Professionals United',
        isVerified: true
      },
      images: ['/images/illustrations/spices.png'],
      category: 'food',
      tags: ['homemade', 'snacks', 'fresh'],
      inStock: true,
      stockCount: 5,
      sold: 234,
      featured: true,
      discount: 0,
      location: 'Nsukka, Enugu',
      createdAt: '2025-04-02T00:00:00Z',
      likes: 31,
      views: 203,
      reviews: [
        {
          id: 1,
          buyer: 'Khadija M.',
          rating: 5,
          comment: "Best chin chin I've ever tasted! Ordering again next week 😍",
          date: '2025-04-01'
        }
      ]
    },
    {
      id: 'prod_4',
      title: 'Baby Changing Service (1 Hour)',
      description: 'Professional baby care service for busy mamas. I will come to your location and take care of your little one.',
      price: 5000,
      originalPrice: null,
      seller: {
        name: 'Zainab Mohammed',
        avatar: '/placeholder-seller-4.jpg',
        rating: 5.0,
        totalReviews: 67,
        badges: ['Trusted Caregiver', 'Background Checked'],
        circle: 'Abuja Sisters Circle',
        isVerified: true
      },
      images: ['/images/illustrations/babyclothes.png'],
      category: 'services',
      tags: ['childcare', 'professional', 'trusted'],
      inStock: true,
      stockCount: 3,
      sold: 12,
      featured: false,
      discount: 0,
      location: 'Central Area, Abuja',
      createdAt: '2025-03-29T00:00:00Z',
      likes: 8,
      views: 45,
      reviews: []
    },
    {
      id: 'prod_5',
      title: 'Handwoven Basket Set (3 Pieces)',
      description: 'Beautiful traditional handwoven baskets perfect for home organization. Made by skilled artisans in my community.',
      price: 12000,
      originalPrice: 15000,
      seller: {
        name: 'Fatima Adeola',
        avatar: '/placeholder-seller-5.jpg',
        rating: 4.9,
        totalReviews: 41,
        badges: ['Artisan', 'Eco-Friendly'],
        circle: 'Young Professionals United',
        isVerified: true
      },
      images: ['/images/illustrations/baskets_pottery.png'],
      category: 'home',
      tags: ['handwoven', 'traditional', 'set'],
      inStock: true,
      stockCount: 6,
      sold: 18,
      featured: true,
      discount: 20,
      location: 'Victoria Island, Lagos',
      createdAt: '2025-03-27T00:00:00Z',
      likes: 15,
      views: 78,
      reviews: []
    },
    {
      id: 'prod_6',
      title: 'Kids School Uniform Tailoring',
      description: 'Custom school uniform tailoring for children. High quality fabrics and perfect fitting guaranteed.',
      price: 8500,
      originalPrice: null,
      seller: {
        name: 'Khadija Adamu',
        avatar: '/placeholder-seller-6.jpg',
        rating: 4.8,
        totalReviews: 89,
        badges: ['Expert Tailor', 'Quick Turnaround'],
        circle: 'Lagos Market Queens',
        isVerified: true
      },
      images: ['/images/illustrations/homedecor.png'],
      category: 'services',
      tags: ['tailoring', 'school', 'custom'],
      inStock: true,
      stockCount: 10,
      sold: 56,
      featured: false,
      discount: 0,
      location: 'Surulere, Lagos',
      createdAt: '2025-03-31T00:00:00Z',
      likes: 12,
      views: 67,
      reviews: []
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.seller.rating - a.seller.rating;
      case 'popular':
        return b.sold - a.sold;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Pagination to prevent overflow
  const PRODUCTS_PER_PAGE = 12;
  const displayedProducts = sortedProducts.slice(0, PRODUCTS_PER_PAGE);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="container-responsive pb-20 lg:pb-6 min-h-screen">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mama-card p-4 sm:p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div>
            <h1 className="text-responsive-xl font-bold mb-3 sm:mb-4">
              Mama's <span className="text-yellow-300">Marketplace</span> 🛒
            </h1>
            <p className="text-purple-100 text-responsive-base mb-4 sm:mb-6 leading-relaxed">
              "Many hands make light work" - Shop with your sisters, support their businesses,
              and build wealth together. Every purchase strengthens our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center text-purple-200">
                <Shield className="w-5 h-5 mr-2" />
                <span>Sister-Verified Sellers</span>
              </div>
              <div className="flex items-center text-purple-200">
                <Crown className="w-5 h-5 mr-2" />
                <span>Community-Backed Quality</span>
              </div>
              <div className="flex items-center text-purple-200">
                <Gift className="w-5 h-5 mr-2" />
                <span>Support Local Sisters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid-responsive-4 mb-6 sm:mb-8">
        <div className="mama-card p-3 sm:p-4 text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-base sm:text-lg font-bold text-burgundy-800">{products.length}</div>
          <div className="text-xs sm:text-sm text-neutral-600">Products</div>
        </div>

        <div className="mama-card p-3 sm:p-4 text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-base sm:text-lg font-bold text-burgundy-800">24</div>
          <div className="text-xs sm:text-sm text-neutral-600">Sister Sellers</div>
        </div>

        <div className="mama-card p-3 sm:p-4 text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-base sm:text-lg font-bold text-burgundy-800">₦2.3M</div>
          <div className="text-xs sm:text-sm text-neutral-600">Sister Sales</div>
        </div>

        <div className="mama-card p-3 sm:p-4 text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-base sm:text-lg font-bold text-burgundy-800">4.8</div>
          <div className="text-xs sm:text-sm text-neutral-600">Avg Rating</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mama-card p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products, sellers..."
              className="mama-input pl-10 sm:pl-12 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mama-input flex-1 sm:max-w-xs text-sm sm:text-base"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>

            {/* Sell Button */}
            <Link href="/marketplace/sell" className="mama-button-primary whitespace-nowrap justify-center sm:justify-start">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sell Products</span>
              <span className="sm:hidden">Sell</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 sm:mb-8">
        <div className="flex overflow-x-auto pb-4 gap-2 sm:gap-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                  : 'bg-white text-burgundy-600 hover:bg-orange-50 border border-orange-100'
              }`}
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5">{category.icon}</span>
              <span className="ml-1 sm:ml-2 hidden sm:inline">{category.name}</span>
              <span className="ml-1 sm:ml-2 sm:hidden">{category.name.split(' ')[0]}</span>
              <span className={`ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-orange-100 text-burgundy-700'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      {selectedCategory === 'all' && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-burgundy-800 mb-3 sm:mb-4 flex items-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Featured Products
          </h2>
          <div className="grid-responsive-3">
            {products.filter(p => p.featured).slice(0, 3).map((product) => (
              <Link 
                key={product.id} 
                href={`/marketplace/product/${product.id}`}
                className="mama-card p-0 overflow-hidden hover:scale-[1.02] transition-transform group"
              >
                <div className="relative h-40 md:h-48 bg-gradient-to-br from-orange-200 to-red-200 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                    <Heart className="w-4 h-4 text-neutral-600 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-600">{product.sold} sold</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span className="text-neutral-600">{product.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-burgundy-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {product.originalPrice && (
                        <span className="text-neutral-500 line-through text-sm mr-2">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl font-bold text-burgundy-800">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mr-2"></div>
                      <span className="text-sm text-neutral-600">{product.seller.name}</span>
                    </div>
                    <div className="flex items-center text-xs text-neutral-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {product.location.split(',')[0]}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Products Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-burgundy-800">
            <span className="hidden sm:inline">{selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}</span>
            <span className="sm:hidden">{selectedCategory === 'all' ? 'All' : categories.find(c => c.id === selectedCategory)?.name.split(' ')[0]}</span>
            <span className="text-neutral-600 ml-2 text-sm sm:text-base">({sortedProducts.length})</span>
          </h2>
        </div>
        
        <div className="grid-responsive-3">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/marketplace/product/${product.id}`}
              className="mama-card p-0 overflow-hidden hover:scale-[1.02] transition-transform group"
            >
              <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-orange-200 to-red-200 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                    -{product.discount}%
                  </div>
                )}
                <button className="absolute top-2 right-2 bg-white/90 p-1.5 sm:p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600 group-hover:text-red-500 transition-colors" />
                </button>

                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-600">{product.sold} sold</span>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 text-neutral-500 mr-1" />
                        <span className="text-neutral-600">{product.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-2 overflow-x-auto scrollbar-hide">
                  {product.seller.badges.slice(0, 1).map((badge, index) => (
                    <span key={index} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                      {badge}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-sm sm:text-base text-burgundy-800 mb-1 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                  {product.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
                  <div className="flex items-center flex-wrap gap-1">
                    {product.originalPrice && (
                      <span className="text-neutral-500 line-through text-xs sm:text-sm">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-base sm:text-lg font-bold text-burgundy-800">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">{product.seller.rating}</span>
                    <span className="text-xs text-neutral-500 ml-1 hidden sm:inline">({product.seller.totalReviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-neutral-600 truncate">{product.seller.name}</span>
                  </div>
                  <div className="flex items-center text-xs text-neutral-500 ml-2 hidden sm:flex">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(product.createdAt)}
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-orange-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-neutral-500 min-w-0 flex-1 mr-2">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{product.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center text-neutral-500 whitespace-nowrap">
                      <span className={`w-2 h-2 rounded-full mr-1 ${
                        product.inStock ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {product.inStock ? `${product.stockCount}` : 'Out'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Products Button */}
        {sortedProducts.length > PRODUCTS_PER_PAGE && (
          <div className="text-center mt-8">
            <div className="mama-card p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <p className="text-neutral-600 mb-4">
                Showing {displayedProducts.length} of {sortedProducts.length} products
              </p>
              <Link
                href="/marketplace/all"
                className="mama-button-primary inline-flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View All Products
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-600 mb-2">No products found</h3>
          <p className="text-neutral-500 mb-6">
            {searchTerm 
              ? `No products match "${searchTerm}". Try different keywords.`
              : `No products in this category yet. Be the first to list something!`
            }
          </p>
          <Link href="/marketplace/sell" className="mama-button-primary">
            List Your First Product
          </Link>
        </div>
      )}

      {/* Call to Action */}
      <div className="mama-card p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
        <Crown className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-3">Start Your Sister Business</h3>
        <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
          Turn your skills into income! List your products or services and sell to your trusted 
          circle sisters. Every sale builds wealth and strengthens our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace/sell" className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            Start Selling Today
          </Link>
          <Link href="/circles" className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
            Join More Circles
          </Link>
        </div>
      </div>
    </div>
  );
}
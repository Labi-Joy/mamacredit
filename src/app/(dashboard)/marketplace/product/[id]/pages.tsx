'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Clock,
  Shield,
  MessageCircle,
  Phone,
  Share2,
  CheckCircle,
  Crown,
  Award,
  TrendingUp,
  Package,
  Truck,
  AlertCircle,
  Eye,
  ThumbsUp
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: params.id,
    title: 'Premium Shea Butter Hair Cream',
    description: 'Handmade with 100% organic shea butter sourced directly from Northern Nigeria. This luxurious hair cream is perfect for natural hair care, providing deep moisturization and promoting healthy hair growth. Made with love in small batches to ensure quality.\n\nOur shea butter is ethically sourced from women cooperatives in Kaduna, supporting local communities while bringing you the finest quality product. Each jar contains pure, unrefined shea butter mixed with natural oils and vitamin E for maximum nourishment.\n\nPerfect for:\n- Deep conditioning treatments\n- Daily moisture and styling\n- Scalp health and growth\n- All natural hair types\n- Chemical-free hair care',
    price: 3500,
    originalPrice: 4500,
    discount: 22,
    images: [
      '/placeholder-product-1.jpg',
      '/placeholder-product-1b.jpg',
      '/placeholder-product-1c.jpg'
    ],
    seller: {
      id: 'seller_1',
      name: 'Amina Ibrahim',
      avatar: '/placeholder-seller-1.jpg',
      rating: 4.9,
      totalReviews: 127,
      totalSales: 456,
      responseTime: '< 1 hour',
      badges: ['Circle Leader', 'Verified Seller', 'Top Rated'],
      circle: 'Lagos Market Queens',
      memberSince: '2024-06-15',
      isVerified: true,
      bio: 'Natural hair care specialist with 8+ years experience. I make all products by hand using traditional methods passed down from my grandmother. Every sister deserves beautiful, healthy hair! 💜'
    },
    category: 'beauty',
    tags: ['organic', 'handmade', 'natural', 'hair care'],
    inStock: true,
    stockCount: 15,
    sold: 89,
    featured: true,
    location: 'Lagos Island, Lagos',
    createdAt: '2025-04-01T00:00:00Z',
    likes: 24,
    views: 156,
    specifications: {
      size: '250ml',
      weight: '300g',
      ingredients: 'Organic Shea Butter, Coconut Oil, Jojoba Oil, Vitamin E, Natural Fragrance',
      shelfLife: '12 months',
      storage: 'Store in cool, dry place'
    },
    delivery: {
      options: ['pickup', 'delivery', 'shipping'],
      processingTime: '1-2 days',
      deliveryFee: 1500,
      freeDeliveryThreshold: 10000
    },
    reviews: [
      {
        id: 1,
        buyer: {
          name: 'Fatima A.',
          avatar: '/placeholder-buyer-1.jpg',
          verified: true
        },
        rating: 5,
        comment: 'Amazing quality! My hair has never been softer. Sister Amina makes the best products! I\'ve been using this for 3 months now and the difference is incredible. Highly recommend to all my sisters! 💜',
        date: '2025-03-28',
        helpful: 12,
        images: ['/placeholder-review-1.jpg']
      },
      {
        id: 2,
        buyer: {
          name: 'Grace O.',
          avatar: '/placeholder-buyer-2.jpg',
          verified: true
        },
        rating: 5,
        comment: 'Best shea butter I\'ve used! The texture is perfect and it smells divine. Sister Amina is also so responsive and helpful with usage tips.',
        date: '2025-03-25',
        helpful: 8,
        images: []
      },
      {
        id: 3,
        buyer: {
          name: 'Zainab M.',
          avatar: '/placeholder-buyer-3.jpg',
          verified: true
        },
        rating: 4,
        comment: 'Great product! Only reason for 4 stars is I wish the jar was bigger 😊 But quality is definitely 5 stars.',
        date: '2025-03-20',
        helpful: 5,
        images: []
      }
    ],
    relatedProducts: [
      {
        id: 'prod_2',
        title: 'Ankara Print Face Masks',
        price: 2800,
        image: '/placeholder-product-2.jpg',
        seller: 'Grace Okafor',
        rating: 4.8
      },
      {
        id: 'prod_3',
        title: 'Homemade Chin Chin',
        price: 1500,
        image: '/placeholder-product-3.jpg',
        seller: 'Blessing Eze',
        rating: 4.7
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

  const handleAddToCart = () => {
    console.log('Adding to cart:', { productId: product.id, quantity });
    // Integration with cart system
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { productId: product.id, quantity });
    // Direct checkout
    router.push(`/checkout?product=${product.id}&qty=${quantity}`);
  };

  const handleContactSeller = () => {
    setShowContactModal(true);
  };

  return (
    <div className="p-6 pb-20 lg:pb-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-6">
        <Link href="/marketplace" className="hover:text-burgundy-600">Marketplace</Link>
        <span>/</span>
        <Link href={`/marketplace?category=${product.category}`} className="hover:text-burgundy-600 capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-burgundy-800">{product.title}</span>
      </div>

      {/* Back Button */}
      <Link 
        href="/marketplace"
        className="inline-flex items-center text-burgundy-600 hover:text-burgundy-800 mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Marketplace
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="mama-card p-6">
            {/* Main Image */}
            <div className="relative mb-4 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl overflow-hidden">
              <div className="aspect-square relative">
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
                {/* Image would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-24 h-24 text-orange-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-orange-400 scale-105'
                      : 'border-transparent hover:border-orange-200'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-orange-400 opacity-50" />
                  </div>
                </button>
              ))}
            </div>

            {/* Product Details */}
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-burgundy-800 mb-4">Product Description</h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Specifications</h3>
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-sm text-neutral-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="font-semibold text-burgundy-800">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-burgundy-800">Sister Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-bold text-burgundy-800 mr-1">{product.seller.rating}</span>
                    <span className="text-neutral-600">({product.seller.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-burgundy-800">{review.buyer.name}</span>
                              {review.buyer.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="text-sm text-neutral-600">{formatDate(review.date)}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 mb-3">{review.comment}</p>
                      
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="w-16 h-16 bg-neutral-200 rounded-lg"></div>
                          ))}
                        </div>
                      )}
                      
                      <button className="flex items-center text-sm text-neutral-600 hover:text-burgundy-600">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-burgundy-800 mb-4">You May Also Like</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {product.relatedProducts.map((related) => (
                <Link 
                  key={related.id}
                  href={`/marketplace/product/${related.id}`}
                  className="mama-card p-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg mb-3"></div>
                  <h4 className="font-semibold text-burgundy-800 mb-2">{related.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-burgundy-800">{formatCurrency(related.price)}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{related.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Purchase & Seller Info */}
        <div className="space-y-6">
          {/* Purchase Card */}
          <div className="mama-card p-6 sticky top-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {product.originalPrice && (
                  <span className="text-neutral-500 line-through text-lg">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-burgundy-800">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>{product.stockCount} in stock</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{product.views} views</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                  Quantity
                </label>
                <div className="flex items-center border-2 border-neutral-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-neutral-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stockCount}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="flex-1 text-center border-none focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-4 py-2 hover:bg-neutral-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-sm text-neutral-600">
                <div className="flex items-center justify-between mb-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-burgundy-800">{formatCurrency(product.price * quantity)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery:</span>
                  <span className="font-semibold text-burgundy-800">
                    {product.price * quantity >= product.delivery.freeDeliveryThreshold
                      ? 'FREE'
                      : formatCurrency(product.delivery.deliveryFee)
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-red-600 transition-all"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-orange-400 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <h4 className="font-semibold text-burgundy-800 mb-3">Delivery Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-neutral-700">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Processing: {product.delivery.processingTime}</span>
                </div>
                <div className="flex items-center text-neutral-700">
                  <Truck className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Free delivery over {formatCurrency(product.delivery.freeDeliveryThreshold)}</span>
                </div>
                <div className="flex items-center text-neutral-700">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Ships from: {product.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="mama-card p-6">
            <h4 className="font-semibold text-burgundy-800 mb-4">About the Seller</h4>
            
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-semibold text-burgundy-800">{product.seller.name}</h5>
                  {product.seller.isVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="text-sm text-neutral-600">{product.seller.circle}</div>
              </div>
            </div>

            <p className="text-sm text-neutral-700 mb-4">{product.seller.bio}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-bold text-burgundy-800">{product.seller.rating}</span>
                </div>
                <div className="text-xs text-neutral-600">{product.seller.totalReviews} reviews</div>
              </div>
              
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="font-bold text-burgundy-800">{product.seller.totalSales}</span>
                </div>
                <div className="text-xs text-neutral-600">Total sales</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {product.seller.badges.map((badge) => (
                <span key={badge} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-sm text-neutral-600 mb-4">
              <div className="flex justify-between">
                <span>Response time:</span>
                <span className="font-semibold text-emerald-600">{product.seller.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Member since:</span>
                <span className="font-semibold text-burgundy-800">{formatDate(product.seller.memberSince)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleContactSeller}
                className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </button>
              <Link
                href={`/marketplace/seller/${product.seller.id}`}
                className="flex-1 bg-neutral-100 text-neutral-700 py-2 rounded-lg font-semibold hover:bg-neutral-200 transition-colors text-center"
              >
                View Shop
              </Link>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="mama-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-burgundy-800">Sister Safety Tips</h4>
            </div>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Only pay after receiving the product</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Inspect items before payment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Report any issues to circle leaders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-burgundy-800 mb-4">Contact Seller</h3>
            <p className="text-neutral-700 mb-6">
              Send a message to {product.seller.name} about this product.
            </p>
            <textarea
              rows={4}
              placeholder="Hi! I'm interested in your product..."
              className="mama-input resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 mama-button-secondary"
              >
                Cancel
              </button>
              <button className="flex-1 mama-button-primary">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
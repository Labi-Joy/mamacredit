'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Camera,
  Upload,
  X,
  Plus,
  Package,
  DollarSign,
  MapPin,
  Clock,
  Star,
  Heart,
  Crown,
  CheckCircle,
  Info,
  AlertCircle,
  Scissors,
  Utensils,
  Shirt,
  Baby,
  Home,
  Briefcase
} from 'lucide-react';

export default function SellPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    
    // Pricing
    price: '',
    originalPrice: '',
    currency: 'NGN',
    
    // Inventory
    hasStock: true,
    stockCount: '',
    isService: false,
    
    // Images
    images: [] as File[],
    
    // Delivery & Location
    location: '',
    deliveryOptions: [] as string[],
    processingTime: '1-2_days',
    
    // Circle Settings
    availableToCircles: [] as string[],
    isPublic: true,
    
    // Agreement
    agreedToTerms: false
  });

  const steps = [
    {
      id: 1,
      title: "Product Details",
      subtitle: "Tell sisters about what you're selling",
      icon: <Package className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Pricing & Stock",
      subtitle: "Set your price and availability",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Photos & Location",
      subtitle: "Show your product and delivery details",
      icon: <Camera className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Circle Audience",
      subtitle: "Choose who can see your listing",
      icon: <Heart className="w-8 h-8" />
    }
  ];

  const categories = [
    { id: 'beauty', name: 'Beauty & Hair', icon: <Scissors className="w-6 h-6" />, examples: ['Hair products', 'Skincare', 'Makeup', 'Beauty services'] },
    { id: 'food', name: 'Food & Snacks', icon: <Utensils className="w-6 h-6" />, examples: ['Homemade meals', 'Snacks', 'Baked goods', 'Catering'] },
    { id: 'fashion', name: 'Fashion & Clothing', icon: <Shirt className="w-6 h-6" />, examples: ['Clothing', 'Accessories', 'Shoes', 'Tailoring'] },
    { id: 'baby', name: 'Baby & Kids', icon: <Baby className="w-6 h-6" />, examples: ['Baby clothes', 'Toys', 'Childcare', 'Educational items'] },
    { id: 'home', name: 'Home & Living', icon: <Home className="w-6 h-6" />, examples: ['Home decor', 'Furniture', 'Cleaning', 'Organization'] },
    { id: 'services', name: 'Services', icon: <Briefcase className="w-6 h-6" />, examples: ['Tutoring', 'Cleaning', 'Childcare', 'Consulting'] }
  ];

  const userCircles = [
    { id: 'circle_1', name: 'Lagos Market Queens', members: 6 },
    { id: 'circle_2', name: 'Young Professionals United', members: 4 }
  ];

  const popularTags = [
    'handmade', 'organic', 'natural', 'fresh', 'homemade', 'quality',
    'affordable', 'premium', 'authentic', 'traditional', 'modern',
    'professional', 'trusted', 'fast delivery', 'custom made'
  ];

  const deliveryOptions = [
    { id: 'pickup', label: 'Customer Pickup', description: 'Buyers come to you' },
    { id: 'delivery', label: 'Local Delivery', description: 'You deliver within area' },
    { id: 'shipping', label: 'Shipping', description: 'Send via courier service' },
    { id: 'digital', label: 'Digital Service', description: 'Online/virtual service' }
  ];

  const processingTimes = [
    { value: 'same_day', label: 'Same Day', description: 'Ready within hours' },
    { value: '1-2_days', label: '1-2 Days', description: 'Standard processing' },
    { value: '3-5_days', label: '3-5 Days', description: 'Custom/made to order' },
    { value: '1_week', label: '1 Week+', description: 'Complex items/services' }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim()) && formData.tags.length < 5) {
      updateFormData('tags', [...formData.tags, tag.trim()]);
    }
  };

  const removeTag = (index: number) => {
    updateFormData('tags', formData.tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files && formData.images.length < 5) {
      const newImages = Array.from(files).slice(0, 5 - formData.images.length);
      updateFormData('images', [...formData.images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    updateFormData('images', formData.images.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting product:', formData);
    // Here you would integrate with your backend
    router.push('/marketplace');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.length >= 3 && 
               formData.description.length >= 20 && 
               formData.category;
      case 2:
        return formData.price && 
               parseInt(formData.price.replace(/,/g, '')) >= 100 &&
               (!formData.hasStock || formData.stockCount);
      case 3:
        return formData.images.length > 0 && 
               formData.location.length >= 3 &&
               formData.deliveryOptions.length > 0;
      case 4:
        return formData.agreedToTerms;
      default:
        return false;
    }
  };

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount.replace(/,/g, ''));
    return new Intl.NumberFormat('en-NG').format(num);
  };

  const selectedCategory = categories.find(c => c.id === formData.category);

  return (
    <div className="p-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/marketplace" className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="font-bold text-2xl text-burgundy-800">List Your Product</h1>
          <p className="text-neutral-600">Share your talents with your sisters</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mama-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-burgundy-800">Step {currentStep} of {totalSteps}</h3>
          <div className="text-sm text-neutral-600">{steps[currentStep - 1].title}</div>
        </div>
        
        <div className="w-full bg-orange-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="mama-card p-8">
            {/* Step Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mb-4">
                <div className="text-white">
                  {steps[currentStep - 1].icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-burgundy-800 mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-neutral-600">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>

            {/* Step 1: Product Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Product/Service Title ✨
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Premium Shea Butter Hair Cream, Ankara Face Masks"
                    className="mama-input"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                  <p className="text-xs text-neutral-600 mt-1">
                    Make it clear and descriptive so sisters know exactly what you're offering
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Category 📂
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => updateFormData('category', category.id)}
                        className={`p-4 rounded-xl text-left transition-all border-2 ${
                          formData.category === category.id
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-neutral-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-lg mr-3 ${
                            formData.category === category.id
                              ? 'bg-orange-200 text-orange-600'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {category.icon}
                          </div>
                          <h4 className="font-semibold text-burgundy-800">{category.name}</h4>
                        </div>
                        <p className="text-xs text-neutral-600">
                          {category.examples.join(', ')}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Product/Service Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateFormData('isService', false)}
                      className={`p-4 rounded-xl text-center transition-all border-2 ${
                        !formData.isService
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-neutral-200 hover:border-emerald-200 bg-white'
                      }`}
                    >
                      <Package className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold text-burgundy-800">Physical Product</div>
                      <div className="text-xs text-neutral-600">Items you ship or deliver</div>
                    </button>
                    <button
                      onClick={() => updateFormData('isService', true)}
                      className={`p-4 rounded-xl text-center transition-all border-2 ${
                        formData.isService
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-neutral-200 hover:border-blue-200 bg-white'
                      }`}
                    >
                      <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold text-burgundy-800">Service</div>
                      <div className="text-xs text-neutral-600">Skills or work you provide</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Description 📝
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your product/service in detail. What makes it special? How do you make it? Why should sisters choose you?"
                    className="mama-input resize-none"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                  />
                  <p className="text-xs text-neutral-600 mt-1">
                    {formData.description.length}/20 characters minimum. Be detailed and honest.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Tags (Optional) 🏷️
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          formData.tags.includes(tag)
                            ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                            : 'bg-orange-100 hover:bg-orange-200 text-burgundy-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-semibold text-burgundy-800 text-sm">Selected Tags:</h5>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <div key={index} className="flex items-center bg-orange-50 rounded-full px-3 py-1">
                            <span className="text-sm text-burgundy-800">{tag}</span>
                            <button
                              onClick={() => removeTag(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-neutral-600 mt-2">
                    Add up to 5 tags to help sisters find your product
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Stock */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Price 💰
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 text-lg">₦</span>
                    <input
                      type="text"
                      placeholder="3,500"
                      className="mama-input pl-8 text-lg"
                      value={formData.price}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '');
                        if (/^\d*$/.test(value)) {
                          const formatted = value ? formatCurrency(value) : '';
                          updateFormData('price', formatted);
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Set a fair price. Consider your costs, time, and market rates.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Original Price (Optional) 🏷️
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600">₦</span>
                    <input
                      type="text"
                      placeholder="4,500"
                      className="mama-input pl-8"
                      value={formData.originalPrice}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '');
                        if (/^\d*$/.test(value)) {
                          const formatted = value ? formatCurrency(value) : '';
                          updateFormData('originalPrice', formatted);
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Show a higher original price to indicate discount/value
                  </p>
                </div>

                {formData.price && formData.originalPrice && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Discount Preview</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500 line-through">₦{formData.originalPrice}</span>
                      <span className="text-2xl font-bold text-burgundy-800">₦{formData.price}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        -{Math.round((1 - parseInt(formData.price.replace(/,/g, '')) / parseInt(formData.originalPrice.replace(/,/g, ''))) * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Stock Management 📦
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => updateFormData('hasStock', true)}
                      className={`p-4 rounded-xl text-center transition-all border-2 ${
                        formData.hasStock
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-neutral-200 hover:border-emerald-200 bg-white'
                      }`}
                    >
                      <Package className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold text-burgundy-800">Limited Stock</div>
                      <div className="text-xs text-neutral-600">Track inventory count</div>
                    </button>
                    <button
                      onClick={() => updateFormData('hasStock', false)}
                      className={`p-4 rounded-xl text-center transition-all border-2 ${
                        !formData.hasStock
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-neutral-200 hover:border-blue-200 bg-white'
                      }`}
                    >
                      <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold text-burgundy-800">Always Available</div>
                      <div className="text-xs text-neutral-600">Service or made-to-order</div>
                    </button>
                  </div>

                  {formData.hasStock && (
                    <div>
                      <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                        Stock Count
                      </label>
                      <input
                        type="number"
                        placeholder="10"
                        min="1"
                        className="mama-input"
                        value={formData.stockCount}
                        onChange={(e) => updateFormData('stockCount', e.target.value)}
                      />
                      <p className="text-xs text-neutral-600 mt-1">
                        How many items do you have available right now?
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Processing Time ⏰
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {processingTimes.map((time) => (
                      <button
                        key={time.value}
                        onClick={() => updateFormData('processingTime', time.value)}
                        className={`p-3 rounded-xl text-left transition-all border-2 ${
                          formData.processingTime === time.value
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-neutral-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-burgundy-800">{time.label}</div>
                        <div className="text-xs text-neutral-600">{time.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos & Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Product Photos 📸
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <div className="aspect-square border-2 border-dashed border-orange-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                          id={`image-upload-${formData.images.length}`}
                        />
                        <label htmlFor={`image-upload-${formData.images.length}`} className="cursor-pointer text-center">
                          <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                          <div className="text-sm text-neutral-600">Add Photo</div>
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-neutral-600">
                    Add 1-5 clear photos. First photo will be the main image sisters see.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Your Location 📍
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Lagos Island, Lagos State"
                    className="mama-input"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                  />
                  <p className="text-xs text-neutral-600 mt-1">
                    Help sisters know where you're located for delivery estimates
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                    Delivery Options 🚚
                  </label>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.deliveryOptions.includes(option.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFormData('deliveryOptions', [...formData.deliveryOptions, option.id]);
                            } else {
                              updateFormData('deliveryOptions', formData.deliveryOptions.filter(id => id !== option.id));
                            }
                          }}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-semibold text-burgundy-800">{option.label}</div>
                          <div className="text-sm text-neutral-600">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Circle Audience */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-burgundy-800 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-purple-500" />
                    Who Can See Your Listing?
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    Choose whether to share with all sisters on MamaCredit or only your circle sisters.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateFormData('isPublic', true)}
                      className={`p-4 rounded-xl text-left transition-all border-2 ${
                        formData.isPublic
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-neutral-200 hover:border-purple-200 bg-white'
                      }`}
                    >
                      <Crown className="w-8 h-8 mb-2 text-purple-600" />
                      <div className="font-semibold text-burgundy-800">All Sisters</div>
                      <div className="text-sm text-neutral-600">Visible to all verified women on MamaCredit</div>
                    </button>
                    
                    <button
                      onClick={() => updateFormData('isPublic', false)}
                      className={`p-4 rounded-xl text-left transition-all border-2 ${
                        !formData.isPublic
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-neutral-200 hover:border-emerald-200 bg-white'
                      }`}
                    >
                      <Heart className="w-8 h-8 mb-2 text-emerald-600" />
                      <div className="font-semibold text-burgundy-800">My Circles Only</div>
                      <div className="text-sm text-neutral-600">Only sisters in your circles can see</div>
                    </button>
                  </div>
                </div>

                {!formData.isPublic && (
                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Select Your Circles
                    </label>
                    <div className="space-y-3">
                      {userCircles.map((circle) => (
                        <label key={circle.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-neutral-200 cursor-pointer hover:border-orange-200 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.availableToCircles.includes(circle.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData('availableToCircles', [...formData.availableToCircles, circle.id]);
                              } else {
                                updateFormData('availableToCircles', formData.availableToCircles.filter(id => id !== circle.id));
                              }
                            }}
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-burgundy-800">{circle.name}</div>
                            <div className="text-sm text-neutral-600">{circle.members} sisters</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                  <h4 className="font-semibold text-burgundy-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-orange-500" />
                    Seller Guidelines
                  </h4>
                  <div className="space-y-2 text-sm text-neutral-700">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Be honest about your products and delivery times</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Communicate promptly with interested sisters</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Package items carefully and deliver as promised</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Treat every sister with respect and kindness</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => updateFormData('agreedToTerms', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm text-neutral-700">
                      I agree to the <span className="text-burgundy-600 font-semibold">Marketplace Terms</span> and 
                      commit to being a trustworthy seller in our sisterhood community. I understand that my 
                      reputation affects all sisters in MamaCredit.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-orange-100">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'text-neutral-400 cursor-not-allowed'
                    : 'text-burgundy-600 hover:bg-burgundy-50'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transform hover:scale-105'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {currentStep === totalSteps ? 'List Product' : 'Continue'}
                {currentStep !== totalSteps && <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="mama-card p-6">
            <h3 className="font-semibold text-burgundy-800 mb-4">Your Progress</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center space-x-3 ${
                  step.id < currentStep ? 'opacity-60' : 
                  step.id === currentStep ? 'opacity-100' : 'opacity-40'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    step.id < currentStep ? 'bg-emerald-500 text-white' :
                    step.id === currentStep ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' :
                    'bg-neutral-200 text-neutral-500'
                  }`}>
                    {step.id < currentStep ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-burgundy-800">{step.title}</div>
                    <div className="text-xs text-neutral-600">{step.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Card */}
          {(formData.title || formData.price || formData.images.length > 0) && (
            <div className="mama-card p-6">
              <h3 className="font-semibold text-burgundy-800 mb-4">Preview</h3>
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-orange-200 to-red-200 relative">
                  {formData.images.length > 0 && (
                    <img
                      src={URL.createObjectURL(formData.images[0])}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {formData.originalPrice && formData.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      -{Math.round((1 - parseInt(formData.price.replace(/,/g, '')) / parseInt(formData.originalPrice.replace(/,/g, ''))) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-burgundy-800 text-sm mb-1 line-clamp-2">
                    {formData.title || 'Your Product Title'}
                  </h4>
                  {formData.price && (
                    <div className="flex items-center gap-2 mb-2">
                      {formData.originalPrice && (
                        <span className="text-neutral-500 line-through text-xs">
                          ₦{formData.originalPrice}
                        </span>
                      )}
                      <span className="font-bold text-burgundy-800">₦{formData.price}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-600">You</span>
                    {selectedCategory && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {selectedCategory.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selling Tips */}
          <div className="mama-card p-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
            <Crown className="w-8 h-8 mx-auto mb-3 opacity-80" />
            <h3 className="font-semibold mb-3 text-center">Selling Tips</h3>
            <div className="space-y-2 text-sm text-emerald-100">
              <div className="flex items-start">
                <span className="mr-2">📸</span>
                <span>Take clear, well-lit photos from multiple angles</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">💝</span>
                <span>Price fairly - consider your time and materials</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">⚡</span>
                <span>Respond quickly to sister inquiries</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>Be specific about sizes, colors, and materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
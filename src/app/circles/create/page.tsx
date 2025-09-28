'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Users,
  Calendar,
  Coins,
  MapPin,
  Clock,
  Shield,
  Heart,
  Star,
  Crown,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

export default function CreateCirclePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    location: '',
    
    // Financial Details
    monthlyContribution: '',
    maxMembers: 6,
    currency: 'NGN',
    
    // Meeting Details
    meetingDay: '',
    meetingTime: '',
    meetingLocation: 'virtual',
    
    // Requirements & Rules
    requirements: [] as string[],
    ageRange: { min: 18, max: 65 },
    minimumIncome: '',
    
    // Additional Settings
    emergencyLoanEnabled: true,
    emergencyLoanLimit: 50,
    votingPeriod: 24,
    autoPayoutEnabled: true,
    
    // Agreement
    agreedToTerms: false,
    isPublic: true
  });

  const steps = [
    {
      id: 1,
      title: "Circle Basics",
      subtitle: "Give your sisterhood a name and purpose",
      icon: <Heart className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Financial Settings",
      subtitle: "Set contribution amounts and member limits",
      icon: <Coins className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Meeting & Rules",
      subtitle: "When and how your circle will connect",
      icon: <Calendar className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Review & Launch",
      subtitle: "Confirm your circle settings and launch",
      icon: <Crown className="w-8 h-8" />
    }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = (req: string) => {
    if (req.trim() && !formData.requirements.includes(req.trim())) {
      updateFormData('requirements', [...formData.requirements, req.trim()]);
    }
  };

  const removeRequirement = (index: number) => {
    updateFormData('requirements', formData.requirements.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create circle
      handleCreateCircle();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateCircle = async () => {
    // Here you would integrate with the Hedera service
    console.log('Creating circle with data:', formData);
    
    // Simulate success
    router.push('/circles/success');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.length >= 3 && formData.description.length >= 20 && formData.location.length >= 3;
      case 2:
        return formData.monthlyContribution && parseInt(formData.monthlyContribution) >= 5000 && formData.maxMembers >= 3;
      case 3:
        return formData.meetingDay && formData.meetingTime;
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

  const presetRequirements = [
    "Stable monthly income",
    "Lagos resident", 
    "Age 25-45",
    "Has own business",
    "Government employee",
    "University graduate",
    "Mother with children",
    "WhatsApp user",
    "Bank account holder",
    "Reference from circle member"
  ];

  const meetingDayOptions = [
    "1st Monday of the month",
    "2nd Tuesday of the month", 
    "3rd Wednesday of the month",
    "Last Friday of the month",
    "15th of every month",
    "Every two weeks",
    "Custom schedule"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/circles" className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </Link>
              <div>
                <h1 className="font-bold text-lg text-burgundy-800">Create New Circle</h1>
                <p className="text-xs text-neutral-600">Build your sisterhood community</p>
              </div>
            </div>
            <div className="text-sm text-neutral-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-orange-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="mama-card p-8">
              {/* Step Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4">
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

              {/* Step 1: Circle Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Circle Name ✨
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Lagos Market Queens, Young Professionals United"
                      className="mama-input"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                    />
                    <p className="text-xs text-neutral-600 mt-1">
                      Choose a name that reflects your community and purpose
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Circle Description 📝
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your circle's purpose, who you're looking for, and what makes your sisterhood special..."
                      className="mama-input resize-none"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                    />
                    <p className="text-xs text-neutral-600 mt-1">
                      {formData.description.length}/200 characters minimum. Be specific about your community.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Location 📍
                    </label>
                    <input
                      type="text"
                      className="mama-input"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                    />
                    <p className="text-xs text-neutral-600 mt-1">
                      Where are most of your potential sisters located?
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <h4 className="font-semibold text-burgundy-800 text-sm mb-2">💡 Pro Tip</h4>
                    <p className="text-xs text-neutral-700">
                      The best circles are built around shared experiences, goals, or communities. Think about what brings you and your potential sisters together.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Financial Settings */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Monthly Contribution Amount 💰
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600">₦</span>
                      <input
                        type="text"
                        placeholder="50,000"
                        className="mama-input pl-8"
                        value={formData.monthlyContribution}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(value)) {
                            updateFormData('monthlyContribution', formatCurrency(value));
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      Minimum ₦5,000. Choose an amount all sisters can comfortably afford monthly.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Maximum Circle Size 👥
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[4, 6, 8, 10, 12].map((size) => (
                        <button
                          key={size}
                          onClick={() => updateFormData('maxMembers', size)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            formData.maxMembers === size
                              ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                              : 'bg-orange-50 hover:bg-orange-100 text-burgundy-800'
                          }`}
                        >
                          <div className="font-semibold">{size}</div>
                          <div className="text-xs opacity-75">sisters</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      Smaller circles build closer bonds, larger circles provide more support options.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <h4 className="font-semibold text-burgundy-800 text-sm mb-3">💵 Projected Payouts</h4>
                    {formData.monthlyContribution && formData.maxMembers && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Monthly Circle Total:</span>
                          <span className="font-semibold text-burgundy-800">
                            ₦{formatCurrency((parseInt(formData.monthlyContribution.replace(/,/g, '')) * formData.maxMembers).toString())}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Your Payout (when it's your turn):</span>
                          <span className="font-semibold text-emerald-600">
                            ₦{formatCurrency((parseInt(formData.monthlyContribution.replace(/,/g, '')) * formData.maxMembers).toString())}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Cycle Duration:</span>
                          <span className="font-semibold text-burgundy-800">{formData.maxMembers} months</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Meeting & Rules */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Meeting Schedule 📅
                    </label>
                    <select
                      className="mama-input"
                      value={formData.meetingDay}
                      onChange={(e) => updateFormData('meetingDay', e.target.value)}
                    >
                      <option value="">Select meeting schedule</option>
                      {meetingDayOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Meeting Time 🕐
                    </label>
                    <input
                      type="time"
                      className="mama-input"
                      value={formData.meetingTime}
                      onChange={(e) => updateFormData('meetingTime', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Meeting Type 💻
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateFormData('meetingLocation', 'virtual')}
                        className={`p-4 rounded-xl text-left transition-all ${
                          formData.meetingLocation === 'virtual'
                            ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'
                            : 'bg-blue-50 hover:bg-blue-100 text-burgundy-800'
                        }`}
                      >
                        <div className="font-semibold">Virtual (WhatsApp)</div>
                        <div className="text-xs opacity-75">Meet online via video call</div>
                      </button>
                      <button
                        onClick={() => updateFormData('meetingLocation', 'physical')}
                        className={`p-4 rounded-xl text-left transition-all ${
                          formData.meetingLocation === 'physical'
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                            : 'bg-green-50 hover:bg-green-100 text-burgundy-800'
                        }`}
                      >
                        <div className="font-semibold">In-Person</div>
                        <div className="text-xs opacity-75">Meet at a physical location</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                      Membership Requirements 📋
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {presetRequirements.map((req) => (
                          <button
                            key={req}
                            onClick={() => addRequirement(req)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${
                              formData.requirements.includes(req)
                                ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                                : 'bg-orange-100 hover:bg-orange-200 text-burgundy-700'
                            }`}
                          >
                            {req}
                          </button>
                        ))}
                      </div>
                      
                      {formData.requirements.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-semibold text-burgundy-800 text-sm">Selected Requirements:</h5>
                          {formData.requirements.map((req, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                              <span className="text-sm text-burgundy-800">{req}</span>
                              <button
                                onClick={() => removeRequirement(index)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <h4 className="font-semibold text-burgundy-800 text-sm mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Emergency Support Settings
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.emergencyLoanEnabled}
                          onChange={(e) => updateFormData('emergencyLoanEnabled', e.target.checked)}
                          className="mr-3"
                        />
                        <span className="text-sm text-neutral-700">Enable emergency loans for circle members</span>
                      </label>
                      {formData.emergencyLoanEnabled && (
                        <div className="pl-6">
                          <label className="block text-xs text-neutral-600 mb-1">Maximum loan amount (% of circle funds)</label>
                          <input
                            type="range"
                            min="25"
                            max="75"
                            value={formData.emergencyLoanLimit}
                            onChange={(e) => updateFormData('emergencyLoanLimit', parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-neutral-600">
                            <span>25%</span>
                            <span className="font-semibold">{formData.emergencyLoanLimit}%</span>
                            <span>75%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Launch */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                      Circle Summary
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Circle Name:</span>
                        <span className="font-semibold text-burgundy-800">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Location:</span>
                        <span className="font-semibold text-burgundy-800">{formData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Monthly Contribution:</span>
                        <span className="font-semibold text-emerald-600">₦{formData.monthlyContribution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Max Members:</span>
                        <span className="font-semibold text-burgundy-800">{formData.maxMembers} sisters</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Meeting Schedule:</span>
                        <span className="font-semibold text-burgundy-800">{formData.meetingDay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Meeting Type:</span>
                        <span className="font-semibold text-burgundy-800">
                          {formData.meetingLocation === 'virtual' ? 'Virtual (WhatsApp)' : 'In-Person'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-500" />
                      What Happens Next?
                    </h4>
                    <div className="space-y-3 text-sm text-neutral-700">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>Your circle will be created and added to the community directory</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>Verified sisters can find and request to join your circle</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>You'll review and approve new members based on your requirements</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                        <div>Once you have enough sisters, your first savings cycle begins!</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => updateFormData('agreedToTerms', e.target.checked)}
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm text-neutral-700">
                        I agree to the <span className="text-burgundy-600 font-semibold">Circle Leader Terms</span> and understand my responsibilities as a circle creator. I commit to fostering a supportive sisterhood environment.
                      </span>
                    </label>
                    
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.isPublic}
                        onChange={(e) => updateFormData('isPublic', e.target.checked)}
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm text-neutral-700">
                        Make my circle visible in the public directory so verified sisters can discover and join
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
                      ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transform hover:scale-105'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  {currentStep === totalSteps ? 'Launch Circle' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="mama-card p-6">
              <h3 className="font-semibold text-burgundy-800 mb-4">Progress</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className={`flex items-center space-x-3 ${
                    step.id < currentStep ? 'opacity-60' : 
                    step.id === currentStep ? 'opacity-100' : 'opacity-40'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      step.id < currentStep ? 'bg-emerald-500 text-white' :
                      step.id === currentStep ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
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

            {/* Inspirational Quote */}
            <div className="mama-card p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <blockquote className="text-sm font-medium italic mb-3 leading-relaxed">
                  "A wise woman builds her house with her own hands. You are building more than a savings circle - you are building a sisterhood legacy."
                </blockquote>
                <div className="text-xs opacity-80">— MamaCredit Wisdom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
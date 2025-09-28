'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Users, 
  Crown, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Smartphone,
  Shield,
  Wallet,
  Star,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    guarantor1Name: '',
    guarantor1Phone: '',
    guarantor2Name: '',
    guarantor2Phone: '',
    hasWallet: false,
    agreedToTerms: false
  });

  const totalSteps = 4;

  const steps = [
    {
      id: 1,
      title: "Welcome, Beautiful Sister! 👑",
      subtitle: "Let's get you started on your financial freedom journey",
      icon: <Crown className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Tell Us About Yourself 💫",
      subtitle: "We want to know the amazing woman joining our sisterhood",
      icon: <Heart className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Your Sister Guarantee 🤝",
      subtitle: "Two verified sisters will vouch for your trustworthiness",
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Setup Your Digital Wallet 💳",
      subtitle: "Your secure space for savings and transactions",
      icon: <Wallet className="w-8 h-8" />
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return formData.name.length > 2 && formData.phoneNumber.length > 10;
      case 3:
        return formData.guarantor1Name.length > 2 && 
               formData.guarantor1Phone.length > 10 &&
               formData.guarantor2Name.length > 2 && 
               formData.guarantor2Phone.length > 10;
      case 4:
        return formData.agreedToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Progress Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-burgundy-800">MamaCredit</span>
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
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
          
          {/* Left Side - Step Content */}
          <div className="space-y-8">
            {/* Step Header */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-6 animate-pulse-gentle">
                <div className="text-white">
                  {steps[currentStep - 1].icon}
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-burgundy-800 mb-3">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-lg text-neutral-600">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>

            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="mama-card p-6">
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4">
                    "It takes a village to raise a child" 🌍
                  </h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed">
                    Welcome to MamaCredit, where African women come together to build financial freedom 
                    through the power of sisterhood and traditional savings circles.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="font-semibold text-sm text-burgundy-800">Secure</div>
                      <div className="text-xs text-neutral-600">Your money is safe</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="font-semibold text-sm text-burgundy-800">Community</div>
                      <div className="text-xs text-neutral-600">Sisters support sisters</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <Star className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="font-semibold text-sm text-burgundy-800">Growth</div>
                      <div className="text-xs text-neutral-600">Build your future</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="mama-card p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                        Your Beautiful Name ✨
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Amina Ibrahim"
                        className="mama-input"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                        Phone Number 📱
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        className="mama-input"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                      />
                      <p className="text-xs text-neutral-600 mt-2">
                        We'll send you WhatsApp notifications about your circles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-burgundy-800 text-sm">WhatsApp Integration</h4>
                      <p className="text-xs text-neutral-700">
                        Get circle updates, reminders, and emergency notifications directly on WhatsApp in your local language.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Sister Guarantee */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="mama-card p-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-burgundy-800 mb-2">Sister Guarantee System 🤝</h4>
                    <p className="text-sm text-neutral-700">
                      Two verified women in our community will vouch for your character. This creates trust and strengthens our sisterhood bonds.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                        <UserCheck className="w-5 h-5 mr-2 text-orange-500" />
                        First Sister Guarantor
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Sister's name"
                          className="mama-input"
                          value={formData.guarantor1Name}
                          onChange={(e) => updateFormData('guarantor1Name', e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="Sister's phone"
                          className="mama-input"
                          value={formData.guarantor1Phone}
                          onChange={(e) => updateFormData('guarantor1Phone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                        <UserCheck className="w-5 h-5 mr-2 text-orange-500" />
                        Second Sister Guarantor
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Sister's name"
                          className="mama-input"
                          value={formData.guarantor2Name}
                          onChange={(e) => updateFormData('guarantor2Name', e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="Sister's phone"
                          className="mama-input"
                          value={formData.guarantor2Phone}
                          onChange={(e) => updateFormData('guarantor2Phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-burgundy-800 text-sm">Why Sister Guarantee?</h4>
                      <p className="text-xs text-neutral-700">
                        This system builds trust without bank requirements. Your guarantors know your character and commitment to the community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Wallet Setup */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="mama-card p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-burgundy-800 mb-2">Your Digital Money Pot</h4>
                    <p className="text-neutral-600">
                      Think of this as your secure digital purse that only you control
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">More secure than bank accounts</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">Send money instantly to any sister</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">Track all your savings transparently</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => updateFormData('agreedToTerms', e.target.checked)}
                        className="w-5 h-5 text-orange-500 rounded border-2 border-orange-300 focus:ring-orange-500"
                      />
                      <span className="text-sm text-neutral-700">
                        I agree to the <span className="text-burgundy-600 font-semibold">Terms of Sisterhood</span> and understand how my digital wallet works
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200">
                    <h5 className="font-semibold text-burgundy-800 text-sm mb-2">Don't worry, Queen! 👑</h5>
                    <p className="text-xs text-neutral-700">
                      We'll guide you through everything step by step. Your sisters are here to help you learn.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6">
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
                {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Right Side - Visual Support */}
          <div className="relative">
            {/* Step-specific visuals */}
            {currentStep === 1 && (
              <div className="relative h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl overflow-hidden shadow-mama-strong">
                <div className="absolute inset-0 pattern-dots"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Crown className="w-16 h-16 mx-auto mb-4 animate-bounce-gentle" />
                    <h3 className="text-2xl font-bold mb-2">Welcome Queen!</h3>
                    <p className="text-lg opacity-90">Your journey starts here</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="relative h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl overflow-hidden shadow-mama-strong">
                <div className="absolute inset-0 pattern-waves"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse-gentle text-red-400" />
                    <h3 className="text-2xl font-bold mb-2">You Are Special</h3>
                    <p className="text-lg opacity-90">Every sister has a story</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="relative h-96 bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl overflow-hidden shadow-mama-strong">
                <div className="absolute inset-0 pattern-tribal"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Users className="w-16 h-16 mx-auto mb-4 animate-bounce-gentle" />
                    <h3 className="text-2xl font-bold mb-2">Sisterhood Power</h3>
                    <p className="text-lg opacity-90">Together we are stronger</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="relative h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl overflow-hidden shadow-mama-strong">
                <div className="absolute inset-0 pattern-dots"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Wallet className="w-16 h-16 mx-auto mb-4 animate-glow" />
                    <h3 className="text-2xl font-bold mb-2">Your Digital Safe</h3>
                    <p className="text-lg opacity-90">Secure. Simple. Yours.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step <= currentStep
                        ? 'bg-gradient-to-r from-orange-400 to-red-500'
                        : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Encouragement */}
        <div className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100">
          <p className="text-sm text-neutral-600 italic">
            "Little by little, a bird builds its nest" - Every great journey begins with a single step, beautiful sister.
          </p>
        </div>
      </div>
    </div>
  );
}
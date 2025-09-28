'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  AlertCircle,
  Heart,
  Shield,
  Clock,
  Users,
  Coins,
  Camera,
  Upload,
  Phone,
  Hospital,
  GraduationCap,
  Home,
  Car,
  Briefcase,
  Baby,
  CheckCircle,
  Info,
  Crown
} from 'lucide-react';

export default function EmergencyRequestPage() {
  const router = useRouter();
  const [selectedCircle, setSelectedCircle] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [repaymentPlan, setRepaymentPlan] = useState('30_days');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock user circles
  const userCircles = [
    {
      id: "circle_1",
      name: "Lagos Market Queens",
      totalFunds: 450000,
      maxLoanAmount: 225000, // 50% of total funds
      members: 6,
      successRate: 98
    },
    {
      id: "circle_2",
      name: "Young Professionals United",
      totalFunds: 300000,
      maxLoanAmount: 150000,
      members: 4,
      successRate: 100
    }
  ];

  const emergencyTypes = [
    {
      id: 'medical',
      label: 'Medical Emergency',
      icon: <Hospital className="w-6 h-6" />,
      description: 'Hospital bills, surgery, medication',
      urgency: 'high',
      examples: ['Surgery costs', 'Emergency treatment', 'Medication expenses']
    },
    {
      id: 'education',
      label: 'Children\'s Education',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'School fees, uniforms, books',
      urgency: 'medium',
      examples: ['School fees', 'Exam fees', 'Uniforms and books']
    },
    {
      id: 'housing',
      label: 'Housing Crisis',
      icon: <Home className="w-6 h-6" />,
      description: 'Rent, repairs, utilities',
      urgency: 'high',
      examples: ['Rent payment', 'Emergency repairs', 'Utility bills']
    },
    {
      id: 'business',
      label: 'Business Emergency',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Stock, equipment, licenses',
      urgency: 'medium',
      examples: ['Restock inventory', 'Equipment repair', 'License renewal']
    },
    {
      id: 'family',
      label: 'Family Emergency',
      icon: <Baby className="w-6 h-6" />,
      description: 'Childcare, family support',
      urgency: 'high',
      examples: ['Childcare costs', 'Family support', 'Emergency travel']
    },
    {
      id: 'transport',
      label: 'Transportation',
      icon: <Car className="w-6 h-6" />,
      description: 'Vehicle repairs, transport costs',
      urgency: 'medium',
      examples: ['Vehicle repair', 'Transport costs', 'Emergency travel']
    }
  ];

  const selectedCircleData = userCircles.find(c => c.id === selectedCircle);
  const selectedTypeData = emergencyTypes.find(t => t.id === emergencyType);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return selectedCircle && 
           emergencyType && 
           amount && 
           parseInt(amount.replace(/,/g, '')) >= 5000 &&
           reason.trim().length >= 10 &&
           description.trim().length >= 50 &&
           agreedToTerms;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    // Here you would integrate with the Hedera service
    console.log('Submitting emergency loan request:', {
      circleId: selectedCircle,
      type: emergencyType,
      amount: parseInt(amount.replace(/,/g, '')),
      reason,
      description,
      repaymentPlan,
      files: uploadedFiles
    });
    
    // Simulate success and redirect
    router.push('/emergency/success');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="font-bold text-lg text-burgundy-800">Emergency Support Request</h1>
              <p className="text-xs text-neutral-600">Your sisters are here for you 💜</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mama-card p-8 mb-8 bg-gradient-to-r from-red-500 to-pink-600 text-white">
          <div className="text-center max-w-2xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Emergency Grace System</h2>
            <p className="text-red-100 text-lg leading-relaxed">
              "When the hen gathers her chicks under her wings" - In times of need, 
              your sisterhood provides shelter and support. Request help and let your 
              community decide together.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="mama-card p-8">
              <div className="space-y-8">
                
                {/* Step 1: Select Circle */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Choose Your Sisterhood Circle
                  </h3>
                  <div className="grid gap-4">
                    {userCircles.map((circle) => (
                      <button
                        key={circle.id}
                        onClick={() => setSelectedCircle(circle.id)}
                        className={`p-4 rounded-xl text-left transition-all border-2 ${
                          selectedCircle === circle.id
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-neutral-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-burgundy-800">{circle.name}</h4>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-emerald-600">
                              {formatCurrency(circle.maxLoanAmount)}
                            </div>
                            <div className="text-xs text-neutral-600">Max Available</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-neutral-600">Total Funds:</span>
                            <div className="font-semibold text-burgundy-800">{formatCurrency(circle.totalFunds)}</div>
                          </div>
                          <div>
                            <span className="text-neutral-600">Members:</span>
                            <div className="font-semibold text-burgundy-800">{circle.members} sisters</div>
                          </div>
                          <div>
                            <span className="text-neutral-600">Success Rate:</span>
                            <div className="font-semibold text-emerald-600">{circle.successRate}%</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Emergency Type */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Type of Emergency
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {emergencyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setEmergencyType(type.id)}
                        className={`p-4 rounded-xl text-left transition-all border-2 ${
                          emergencyType === type.id
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-neutral-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${
                            type.urgency === 'high' ? 'bg-red-100 text-red-600' :
                            type.urgency === 'medium' ? 'bg-orange-100 text-orange-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-burgundy-800">{type.label}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(type.urgency)}`}>
                                {type.urgency}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 mb-2">{type.description}</p>
                            <div className="text-xs text-neutral-500">
                              Examples: {type.examples.join(', ')}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Amount Needed */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <Coins className="w-5 h-5 mr-2" />
                    Amount Needed
                  </h3>
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 text-lg">₦</span>
                    <input
                      type="text"
                      placeholder="75,000"
                      className="mama-input pl-8 text-lg"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '');
                        if (/^\d*$/.test(value)) {
                          const formatted = new Intl.NumberFormat('en-NG').format(parseInt(value) || 0);
                          setAmount(formatted === '0' ? '' : formatted);
                        }
                      }}
                    />
                  </div>
                  
                  {selectedCircleData && amount && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-600">Requested Amount:</span>
                          <div className="text-lg font-bold text-burgundy-800">₦{amount}</div>
                        </div>
                        <div>
                          <span className="text-neutral-600">% of Circle Funds:</span>
                          <div className={`text-lg font-bold ${
                            (parseInt(amount.replace(/,/g, '')) / selectedCircleData.totalFunds) * 100 <= 50
                              ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {((parseInt(amount.replace(/,/g, '')) / selectedCircleData.totalFunds) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      
                      {(parseInt(amount.replace(/,/g, '')) / selectedCircleData.totalFunds) * 100 > 50 && (
                        <div className="mt-3 p-3 bg-red-100 rounded-lg">
                          <div className="flex items-center text-red-700 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Amount exceeds 50% limit. Maximum allowed: {formatCurrency(selectedCircleData.maxLoanAmount)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Step 4: Reason & Description */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Tell Your Sisters Why
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                        Brief Reason (One sentence) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., My daughter needs urgent surgery for appendicitis"
                        className="mama-input"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <p className="text-xs text-neutral-600 mt-1">
                        This will be shown to your sisters for quick understanding
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-burgundy-800 mb-2">
                        Detailed Description *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Please share more details about your situation. Your sisters care about you and want to understand how to best support you during this time..."
                        className="mama-input resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <p className="text-xs text-neutral-600 mt-1">
                        {description.length}/50 characters minimum. Share openly - your sisters want to help.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5: Supporting Documents */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Supporting Documents (Optional)
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-orange-200 rounded-xl p-6 text-center">
                      <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <div className="text-sm text-neutral-600 mb-3">
                        Upload photos of bills, receipts, or medical reports
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="mama-button-secondary cursor-pointer">
                        Choose Files
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-sm text-burgundy-800">{file.name}</span>
                            <button
                              onClick={() => removeFile(index)}
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

                {/* Step 6: Repayment Plan */}
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Repayment Plan
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: '15_days', label: '15 Days', description: 'Quick repayment' },
                      { value: '30_days', label: '30 Days', description: 'Standard period' },
                      { value: '60_days', label: '60 Days', description: 'Extended period' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRepaymentPlan(option.value)}
                        className={`p-4 rounded-xl text-center transition-all border-2 ${
                          repaymentPlan === option.value
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-neutral-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-burgundy-800">{option.label}</div>
                        <div className="text-sm text-neutral-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <div className="text-sm text-neutral-700">
                      <span className="font-semibold text-burgundy-800">I understand and agree:</span>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>• My sisters will vote on this request within 24 hours</li>
                        <li>• I commit to repaying the loan within the agreed timeframe</li>
                        <li>• Late payments may affect my standing in the circle</li>
                        <li>• This request will be shared with all circle members</li>
                        <li>• I will provide updates on my situation as needed</li>
                      </ul>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transform hover:scale-[1.02]'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  Send Emergency Request to Sisters
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="mama-card p-6">
              <h3 className="font-semibold text-burgundy-800 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                How Emergency Grace Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <div className="font-semibold text-burgundy-800 text-sm">Submit Request</div>
                    <div className="text-xs text-neutral-600">Share your emergency with your sisters</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <div className="font-semibold text-burgundy-800 text-sm">Sisters Vote</div>
                    <div className="text-xs text-neutral-600">24-hour voting period begins</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <div className="font-semibold text-burgundy-800 text-sm">Instant Support</div>
                    <div className="text-xs text-neutral-600">Majority approval = immediate transfer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Stats */}
            {selectedCircleData && (
              <div className="mama-card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <h3 className="font-semibold text-burgundy-800 mb-4">Circle Emergency Fund</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Available Funds:</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(selectedCircleData.totalFunds)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Max Emergency Loan:</span>
                    <span className="font-semibold text-burgundy-800">{formatCurrency(selectedCircleData.maxLoanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Voting Members:</span>
                    <span className="font-semibold text-burgundy-800">{selectedCircleData.members} sisters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Approval Needed:</span>
                    <span className="font-semibold text-burgundy-800">{Math.ceil(selectedCircleData.members / 2)} votes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Inspirational Quote */}
            <div className="mama-card p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <blockquote className="text-sm font-medium italic mb-3 leading-relaxed">
                  "In times of need, the village responds. Your sisters understand that life happens to us all."
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
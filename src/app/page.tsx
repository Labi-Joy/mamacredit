'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Users,
  Shield,
  Coins,
  ChevronRight,
  Star,
  TrendingUp,
  Crown,
  ArrowRight,
  Play
} from 'lucide-react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Amina Ibrahim",
      role: "Circle Leader, Lagos",
      text: "MamaCredit saved my family when my husband fell ill. My sisters had my back in 24 hours!",
      image: "/images/avatars/avatar1.png"
    },
    {
      name: "Fatima Adeola",
      role: "Entrepreneur, Kano",
      text: "I used my circle payout to start my fabric business. Now I employ 5 other women!",
      image: "/images/avatars/avatar2.png"
    },
    {
      name: "Grace Okafor",
      role: "Teacher, Abuja",
      text: "Learning about crypto through MamaCredit was so easy. My daughters are proud of their tech-savvy mama!",
      image: "/images/avatars/avatar3.png"
    }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Sister Guarantee",
      description: "Join through trusted women in your community. No bank paperwork needed.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Emergency Grace",
      description: "When life happens, get community-approved loans in 24 hours.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Mama's Marketplace",
      description: "Sell your products to circle sisters. Turn savings into income streams.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Progress Mama",
      description: "Earn badges and recognition as you build your financial future.",
      color: "from-yellow-400 to-red-500"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-burgundy-800">MamaCredit</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-700 hover:text-burgundy-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-neutral-700 hover:text-burgundy-600 font-medium">How It Works</a>
              <a href="#testimonials" className="text-neutral-700 hover:text-burgundy-600 font-medium">Stories</a>
              <Link href="/onboarding" className="mama-button-primary inline-flex items-center">
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-orange-700">For African Women, By African Women</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Your <span className="gradient-text">Sisterhood</span> 
                  <br />Savings Circle
                </h1>
                
                <p className="text-xl text-neutral-600 leading-relaxed max-w-xl">
                  Join thousands of African women building financial freedom through traditional savings circles, 
                  powered by modern technology. <span className="font-semibold text-burgundy-600">No banks. No paperwork. Just sisters.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding" className="mama-button-primary text-center group">
                  Start Your Circle Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="mama-button-secondary flex items-center justify-center group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch How It Works
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-burgundy-800">10,000+</div>
                  <div className="text-sm text-neutral-600">Women Empowered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-burgundy-800">₦2.5B</div>
                  <div className="text-sm text-neutral-600">Total Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-burgundy-800">99.7%</div>
                  <div className="text-sm text-neutral-600">Success Rate</div>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              {/* Hero Image */}
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-mama-strong">
                <img
                  src="/images/illustrations/hero.png"
                  alt="African women in traditional savings circle gathering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-burgundy-800">Amina's Circle</div>
                        <div className="text-sm text-neutral-600">Lagos, Nigeria</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Monthly Target:</span>
                        <span className="font-semibold">₦50,000</span>
                      </div>
                      <div className="w-full bg-orange-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full w-4/5"></div>
                      </div>
                      <div className="text-xs text-neutral-500">5 of 6 sisters contributed this month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="gradient-text">Sisters</span> Choose Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We understand African women's financial needs because we ARE African women. 
              Built with love, powered by community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="mama-card text-center group hover:scale-105 transition-transform">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-burgundy-800">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple as <span className="gradient-text">1-2-3</span>
            </h2>
            <p className="text-xl text-neutral-600">
              Join your sisterhood in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-burgundy-800">Get Sister Guarantee</h3>
              <p className="text-neutral-600">
                Two verified women in your community vouch for you. No credit checks or bank statements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-burgundy-800">Join or Create Circle</h3>
              <p className="text-neutral-600">
                Find your perfect savings circle or start one with friends. Set your monthly amount.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-burgundy-800">Save & Grow Together</h3>
              <p className="text-neutral-600">
                Make monthly contributions, support sisters in need, and watch your financial future bloom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Sister</span> Success Stories
            </h2>
            <p className="text-xl text-neutral-600">
              Real women, real transformations, real sisterhood
            </p>
          </div>

          <div className="relative">
            <div className="mama-card max-w-4xl mx-auto text-center p-8 lg:p-12">
              <div className="mb-8">
                {/* Placeholder for testimonial image */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
                <blockquote className="text-2xl lg:text-3xl font-medium text-burgundy-800 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-lg font-semibold text-neutral-800">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-neutral-600">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-orange-500' 
                        : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-burgundy-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join Your <span className="text-orange-300">Sisterhood</span>?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Take the first step towards financial freedom. Your sisters are waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding" className="bg-white text-burgundy-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center">
                Start My Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-burgundy-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">MamaCredit</span>
              </div>
              <p className="text-neutral-400">
                Empowering African women through sisterhood and savings.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Sister Support</a></li>
                <li><a href="#" className="hover:text-white">Events</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">WhatsApp Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 MamaCredit. Built with ❤️ by Labi-dev for <b>African women</b>. Powered by Hedera</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
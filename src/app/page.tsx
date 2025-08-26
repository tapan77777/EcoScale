'use client'
import { ArrowRight, Award, BarChart3, Calculator, CheckCircle2, Eye, Globe2, Leaf, LineChart, ShieldCheck, Sparkles, Target, TreePine, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// ⚙️ Change this to your actual demo routes
const DEMO_URL = '/farmer' // farmer-facing calculator (your prototype)
const ADMIN_URL = '/admin' // verifier dashboard

export default function EcoScaleLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced chart data with more dramatic growth
  const chartData = useMemo(
    () => [
      { month: 'Jan', co2: 2.4, farmers: 5, revenue: 240 },
      { month: 'Feb', co2: 5.8, farmers: 12, revenue: 580 },
      { month: 'Mar', co2: 12.3, farmers: 28, revenue: 1230 },
      { month: 'Apr', co2: 18.7, farmers: 45, revenue: 1870 },
      { month: 'May', co2: 27.2, farmers: 67, revenue: 2720 },
      { month: 'Jun', co2: 38.9, farmers: 94, revenue: 3890 },
    ],
    []
  );

  const features = [
    { icon: <Calculator className="size-6"/>, title: 'Smart Calculator', desc: 'AI-powered carbon estimates in seconds' },
    { icon: <Eye className="size-6"/>, title: 'Real-time Verification', desc: 'Instant validation & audit trails' },
    { icon: <TrendingUp className="size-6"/>, title: 'Revenue Tracking', desc: 'Track earnings potential live' },
  ];

  const stats = [
    { value: '₹38.9K', label: 'Revenue Generated', icon: <TrendingUp className="size-5 text-green-600"/> },
    { value: '94+', label: 'Farmers Onboarded', icon: <Users className="size-5 text-green-600"/> },
    { value: '38.9', label: 'tCO₂e Captured', icon: <Leaf className="size-5 text-green-600"/> },
    { value: '99.2%', label: 'Accuracy Rate', icon: <Target className="size-5 text-green-600"/> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-900 overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-300/5 to-green-600/10" />

      
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 px-4 py-2 text-sm font-medium text-green-700 shadow-lg mb-8">
              <Sparkles className="size-4 animate-pulse" /> 
              <span>Live MVP Ready • NABARD Hackathon 2025</span>
              <Award className="size-4" />
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">
                EcoScale MRV
              </span>
              <br />
              <span className="text-gray-800">Carbon Made</span>{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Simple
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Revolutionary MRV platform that transforms{' '}
              <span className="font-semibold text-green-700">smallholder farmers</span> into carbon heroes with{' '}
              <span className="font-semibold text-emerald-700">instant calculations</span> and{' '}
              <span className="font-semibold text-green-700">real-time verification</span>
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href={DEMO_URL}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2">
                  <Calculator className="size-5" />
                  Try Live Demo
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a 
                href={ADMIN_URL}
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 font-semibold rounded-2xl shadow-xl hover:shadow-green-200/50 hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Eye className="size-5" />
                  View Dashboard
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Stats showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution with 3D Integration */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
              Transforming Carbon Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From complex, expensive MRV processes to simple, instant, and scalable solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Problem Side with 3D */}
            <div className="space-y-8">
              <div className="h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 relative">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    {/* Broken process visualization */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center relative">
                        <Users className="size-8 text-red-600" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 h-1 bg-red-300 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-400 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">×</span>
                        </div>
                      </div>
                      
                      <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center relative">
                        <BarChart3 className="size-8 text-red-600" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">$</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Problem indicators */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-red-100/70 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-red-700">6-12</div>
                        <div className="text-xs text-red-600">Months Wait</div>
                      </div>
                      <div className="bg-red-100/70 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-red-700">₹50K+</div>
                        <div className="text-xs text-red-600">Cost/Farmer</div>
                      </div>
                      <div className="bg-red-100/70 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-red-700">2%</div>
                        <div className="text-xs text-red-600">Adoption</div>
                      </div>
                    </div>
                    
                    {/* Frustrated farmer illustration */}
                    <div className="flex items-center justify-center mt-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl">😞</span>
                        </div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          Too Complex!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated warning lines */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-red-400 border-dashed rounded-full animate-spin opacity-30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-red-400 border-dashed rounded-full animate-spin opacity-30" style={{animationDirection: 'reverse'}} />
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-red-800">❌ Traditional MRV Problems</h3>
                <div className="space-y-4">
                  {[
                    { icon: <BarChart3 className="size-5 text-red-600"/>, text: '₹50,000+ per farmer MRV cost' },
                    { icon: <LineChart className="size-5 text-red-600"/>, text: '6-12 months verification cycles' },
                    { icon: <Users className="size-5 text-red-600"/>, text: 'Only 2% farmer adoption rate' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl">
                      {item.icon}
                      <span className="font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Solution Side with 3D */}
            <div className="space-y-8">
              <div className="h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 relative">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-6 w-full">
                    {/* Digital solution flow */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center relative group">
                        <Users className="size-8 text-green-600" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white text-xs font-bold">📱</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
                          <div className="h-full w-1/3 bg-white/40 rounded-full animate-pulse" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                          <Zap className="size-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center relative">
                        <ShieldCheck className="size-8 text-green-600" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Digital transformation indicators */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-100/70 p-3 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
                        <div className="relative">
                          <div className="text-2xl font-bold text-green-700">3s</div>
                          <div className="text-xs text-green-600">Instant Results</div>
                        </div>
                      </div>
                      <div className="bg-emerald-100/70 p-3 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 animate-pulse" />
                        <div className="relative">
                          <div className="text-2xl font-bold text-emerald-700">₹500</div>
                          <div className="text-xs text-emerald-600">Low Cost</div>
                        </div>
                      </div>
                      <div className="bg-green-100/70 p-3 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
                        <div className="relative">
                          <div className="text-2xl font-bold text-green-700">95%</div>
                          <div className="text-xs text-green-600">Adoption</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Digital devices showcase */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="relative">
                        <div className="w-8 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📱</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-600">Mobile</div>
                      </div>
                      
                      <div className="w-2 h-0.5 bg-green-400" />
                      
                      <div className="relative">
                        <div className="w-12 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">💻</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-600">Web</div>
                      </div>
                      
                      <div className="w-2 h-0.5 bg-green-400" />
                      
                      <div className="relative">
                        <div className="w-12 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">☁️</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-600">Cloud</div>
                      </div>
                    </div>
                    
                    {/* Happy farmer */}
                    <div className="flex items-center justify-center mt-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl">😊</span>
                        </div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          So Easy!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated success indicators */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-ping" style={{animationDelay: '1s'}} />
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-green-800">✅ EcoScale Solution</h3>
                <div className="space-y-4">
                  {[
                    { icon: <CheckCircle2 className="size-5 text-green-600"/>, text: '₹500 per farmer - 99% cost reduction' },
                    { icon: <CheckCircle2 className="size-5 text-green-600"/>, text: 'Instant estimates & same-day verification' },
                    { icon: <CheckCircle2 className="size-5 text-green-600"/>, text: '95%+ adoption with simple UX' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl">
                      {item.icon}
                      <span className="font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Interactive */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
            How EcoScale Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <TreePine className="size-8"/>, 
                title: '1. Farmer Submits', 
                desc: 'Simple mobile/web form captures crop type, area, and tree species in local language',
                color: 'from-green-400 to-emerald-500'
              },
              { 
                icon: <Zap className="size-8"/>, 
                title: '2. Instant Magic', 
                desc: 'AI calculates tCO₂e, uncertainty bands, and revenue potential in under 3 seconds',
                color: 'from-emerald-400 to-green-500'
              },
              { 
                icon: <ShieldCheck className="size-8"/>, 
                title: '3. Smart Verification', 
                desc: 'Auto-validated submissions enter dashboard with complete audit trail and export-ready reports',
                color: 'from-green-500 to-emerald-600'
              },
            ].map((step, i) => (
              <div 
                key={i} 
                className={`group bg-white rounded-3xl p-8 shadow-2xl border-2 border-transparent hover:border-green-200 transform hover:-translate-y-2 transition-all duration-500 cursor-pointer ${activeFeature === i ? 'scale-105 border-green-300 shadow-green-200/50' : ''}`}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-xl`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Chart - Enhanced */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Live Impact Dashboard</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-medium">Real-time Data</span>
              </div>
            </div>
            
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="fillCo2Enhanced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value, name) => [
                      name === 'co2' ? `${value} tCO₂e` : `₹${value}`,
                      name === 'co2' ? 'Carbon Captured' : 'Revenue Generated'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#fillCo2Enhanced)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl font-bold text-green-700">₹3,890</div>
                <div className="text-green-600">Monthly Revenue</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-2xl">
                <div className="text-2xl font-bold text-emerald-700">38.9 tCO₂e</div>
                <div className="text-emerald-600">Carbon Captured</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl font-bold text-green-700">94 Farmers</div>
                <div className="text-green-600">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700" />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Scale Carbon Impact?
          </h2>
          <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto">
            Join the MRV revolution. See how EcoScale transforms smallholder farmers into carbon heroes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={DEMO_URL}
              className="group px-10 py-5 bg-white text-green-700 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              <div className="flex items-center gap-3">
                <Calculator className="size-6" />
                Experience Live Demo
                <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            
            <a 
              href={ADMIN_URL}
              className="group px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              <div className="flex items-center gap-3">
                <Eye className="size-6" />
                View Verifier Dashboard
                <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-green-100 flex-wrap">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5" />
              <span>Tamper-resistant Records</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="size-5" />
              <span>District-scale Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-5" />
              <span>Multilingual Support</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
            <Leaf className="size-6" />
            <span className="text-xl font-bold">EcoScale MRV</span>
          </div>
          <p className="text-gray-400">
            Transforming MRV for agroforestry & rice projects • Built for NABARD Hackathon 2025
          </p>
        </div>
      </footer>
    </main>
  )
}
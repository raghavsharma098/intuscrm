"use client";

import { MessageSquare, Phone, Mail, CheckCircle2, Hash, ArrowRight, Plus, DollarSign, TrendingUp, Users, Activity, Clock, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [showQuickActions, setShowQuickActions] = useState(false);

  const tabs = [
    { id: 'for-you', label: 'For You' },
    { id: 'verifications', label: 'Verifications' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'customer-care', label: 'Customer Care' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Greeting & Title */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm mb-2">Ahoy, Admin</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Get started with Intus One</h1>
        </div>
        <button 
          onClick={() => setShowQuickActions(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all" 
          style={{
            background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
          }}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Messages Sent Today */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(50, 69, 255, 0.1) 0%, rgba(72, 201, 255, 0.1) 100%)'
            }}>
              <MessageSquare className="h-5 w-5" style={{ color: '#3245ff' }} />
            </div>
            <span className="flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-600 font-medium">Messages Today</p>
            <p className="text-3xl font-bold text-slate-900">2,847</p>
            <p className="text-xs text-slate-500">456 SMS • 1,891 WhatsApp • 500 Email</p>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(186, 163, 255, 0.1) 0%, rgba(255, 164, 211, 0.1) 100%)'
            }}>
              <DollarSign className="h-5 w-5" style={{ color: '#BAA3FF' }} />
            </div>
            <Link href="/billing" className="text-xs text-[#3245ff] font-medium hover:underline">
              Recharge
            </Link>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-600 font-medium">Wallet Balance</p>
            <p className="text-3xl font-bold text-slate-900">$1,247.50</p>
            <p className="text-xs text-slate-500">Auto-recharge: ON ($500)</p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(72, 201, 255, 0.1) 0%, rgba(149, 216, 255, 0.1) 100%)'
            }}>
              <Activity className="h-5 w-5" style={{ color: '#48c9ff' }} />
            </div>
            <Link href="/campaigns" className="text-xs text-[#3245ff] font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-600 font-medium">Active Campaigns</p>
            <p className="text-3xl font-bold text-slate-900">7</p>
            <p className="text-xs text-slate-500">3 scheduled • 4 running</p>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(255, 164, 211, 0.1) 0%, rgba(255, 164, 211, 0.2) 100%)'
            }}>
              <Users className="h-5 w-5" style={{ color: '#FFA4D3' }} />
            </div>
            <span className="flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-600 font-medium">New Leads</p>
            <p className="text-3xl font-bold text-slate-900">142</p>
            <p className="text-xs text-slate-500">This week</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#0263E0]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{
                  background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
                }}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SMS Low Code Solutions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-bold text-slate-900">SMS low code solutions</h2>
          </div>
          <Link href="/campaigns" className="flex items-center gap-1 text-[#0263E0] text-sm font-medium hover:underline">
            Explore all Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(50, 69, 255, 0.1) 0%, rgba(72, 201, 255, 0.1) 100%)'
              }}>
                <Hash className="h-6 w-6" style={{
                  color: '#3245ff'
                }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0263E0] mb-2">Claim your trial phone number</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Start sending and receiving SMS messages with a local phone number.
                </p>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2" style={{
              background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)'
            }}>
              <Plus className="h-4 w-4" />
              Get trial phone number
            </button>
          </div>
        </div>

        {/* Illustration Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Developer Card */}
          <div className="bg-slate-50 rounded-lg p-8 flex items-center justify-center min-h-[240px]">
            <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
              {/* Code Editor Illustration */}
              <rect x="40" y="30" width="160" height="120" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              <rect x="40" y="30" width="160" height="30" rx="8" fill="#3245ff" fillOpacity="0.1"/>
              <circle cx="55" cy="45" r="4" fill="#3245ff"/>
              <circle cx="68" cy="45" r="4" fill="#48c9ff"/>
              <circle cx="81" cy="45" r="4" fill="#BAA3FF"/>
              
              {/* Code Lines */}
              <rect x="55" y="75" width="60" height="4" rx="2" fill="#3245ff" fillOpacity="0.3"/>
              <rect x="55" y="85" width="80" height="4" rx="2" fill="#48c9ff" fillOpacity="0.3"/>
              <rect x="65" y="95" width="70" height="4" rx="2" fill="#BAA3FF" fillOpacity="0.3"/>
              <rect x="55" y="105" width="50" height="4" rx="2" fill="#3245ff" fillOpacity="0.3"/>
              
              {/* Terminal */}
              <rect x="55" y="120" width="120" height="20" rx="4" fill="#121C2D"/>
              <rect x="60" y="125" width="30" height="3" rx="1.5" fill="#48c9ff"/>
              <rect x="95" y="125" width="20" height="3" rx="1.5" fill="#32d74b"/>
            </svg>
          </div>

          {/* Customer Care Card */}
          <div className="bg-slate-50 rounded-lg p-8 flex items-center justify-center min-h-[240px]">
            <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
              {/* Mobile Phone */}
              <rect x="80" y="20" width="80" height="140" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              <circle cx="120" cy="30" r="3" fill="#cbd5e1"/>
              
              {/* Chat Bubbles */}
              <rect x="90" y="45" width="50" height="20" rx="10" fill="#3245ff" fillOpacity="0.2"/>
              <circle cx="145" cy="55" r="10" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              <path d="M140 52 L145 57 L150 52" stroke="#3245ff" strokeWidth="2" strokeLinecap="round" fill="none"/>
              
              <rect x="100" y="75" width="50" height="20" rx="10" fill="#48c9ff" fillOpacity="0.2"/>
              
              {/* Person Icon */}
              <circle cx="175" cy="100" r="20" fill="#3245ff" fillOpacity="0.1"/>
              <circle cx="175" cy="95" r="6" fill="#3245ff"/>
              <path d="M165 110 Q175 105 185 110" stroke="#3245ff" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Link href="/inbox" className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-5 w-5 text-[#3245ff]" />
              <h3 className="font-semibold text-slate-900">Unified Inbox</h3>
            </div>
            <p className="text-sm text-slate-600">Manage all conversations in one place</p>
          </Link>

          <Link href="/voice-otp" className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="h-5 w-5 text-[#48c9ff]" />
              <h3 className="font-semibold text-slate-900">Voice & OTP</h3>
            </div>
            <p className="text-sm text-slate-600">Send verification codes securely</p>
          </Link>

          <Link href="/analytics" className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-[#BAA3FF]" />
              <h3 className="font-semibold text-slate-900">Analytics</h3>
            </div>
            <p className="text-sm text-slate-600">Track performance and ROI</p>
          </Link>
        </div>
      </div>

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuickActions(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
              <button onClick={() => setShowQuickActions(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/campaigns/new" onClick={() => setShowQuickActions(false)} className="p-4 border border-slate-200 rounded-lg hover:border-[#3245ff] hover:shadow-md transition-all group">
                <MessageSquare className="h-8 w-8 text-[#3245ff] mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">New Campaign</h3>
                <p className="text-sm text-slate-600">Send broadcast messages</p>
              </Link>

              <Link href="/leads?new=1" onClick={() => setShowQuickActions(false)} className="p-4 border border-slate-200 rounded-lg hover:border-[#48c9ff] hover:shadow-md transition-all group">
                <Users className="h-8 w-8 text-[#48c9ff] mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">Add Lead</h3>
                <p className="text-sm text-slate-600">Create new contact</p>
              </Link>

              <Link href="/sales/invoices/new" onClick={() => setShowQuickActions(false)} className="p-4 border border-slate-200 rounded-lg hover:border-[#BAA3FF] hover:shadow-md transition-all group">
                <DollarSign className="h-8 w-8 text-[#BAA3FF] mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">New Invoice</h3>
                <p className="text-sm text-slate-600">Generate invoice</p>
              </Link>

              <Link href="/helpdesk?new=1" onClick={() => setShowQuickActions(false)} className="p-4 border border-slate-200 rounded-lg hover:border-[#FFA4D3] hover:shadow-md transition-all group">
                <AlertCircle className="h-8 w-8 text-[#FFA4D3] mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">New Ticket</h3>
                <p className="text-sm text-slate-600">Create support ticket</p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
          <button className="text-sm text-[#3245ff] font-medium hover:underline">View all</button>
        </div>
        
        <div className="space-y-4">
          {[
            { icon: MessageSquare, color: '#3245ff', text: 'Campaign "Summer Sale" sent to 1,234 contacts', time: '5 min ago', bg: 'rgba(50, 69, 255, 0.1)' },
            { icon: Users, color: '#48c9ff', text: 'New lead added: John Doe from Website Form', time: '12 min ago', bg: 'rgba(72, 201, 255, 0.1)' },
            { icon: DollarSign, color: '#BAA3FF', text: 'Invoice #INV-0042 paid: $2,450.00', time: '1 hour ago', bg: 'rgba(186, 163, 255, 0.1)' },
            { icon: AlertCircle, color: '#FFA4D3', text: 'Support ticket #1234 marked as resolved', time: '2 hours ago', bg: 'rgba(255, 164, 211, 0.1)' },
            { icon: Clock, color: '#95D8FF', text: 'Scheduled campaign "Welcome Series" will start in 3 hours', time: '3 hours ago', bg: 'rgba(149, 216, 255, 0.1)' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: activity.bg }}>
                <activity.icon className="h-5 w-5" style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 font-medium">{activity.text}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

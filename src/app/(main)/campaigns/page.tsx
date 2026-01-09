"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Mail, MessageSquare, Send, Clock, CheckCircle2, Users } from "lucide-react";

type CampaignStatus = 'all' | 'draft' | 'scheduled' | 'sent' | 'failed';

export default function CampaignsPage() {
  const [statusFilter, setStatusFilter] = useState<CampaignStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const campaigns = [
    {
      id: 1,
      name: "Summer Sale 2026",
      channel: "Multi-channel",
      status: "sent",
      recipients: 1234,
      delivered: 1198,
      opened: 856,
      cost: "$123.40",
      sentAt: "2 hours ago",
      icon: MessageSquare,
    },
    {
      id: 2,
      name: "Welcome New Users",
      channel: "WhatsApp",
      status: "scheduled",
      recipients: 450,
      delivered: 0,
      opened: 0,
      cost: "$45.00",
      sentAt: "Scheduled for Jan 12, 10:00 AM",
      icon: MessageSquare,
    },
    {
      id: 3,
      name: "Product Launch Email",
      channel: "Email",
      status: "draft",
      recipients: 0,
      delivered: 0,
      opened: 0,
      cost: "$0.00",
      sentAt: "Draft",
      icon: Mail,
    },
    {
      id: 4,
      name: "Flash Sale Alert",
      channel: "SMS",
      status: "sent",
      recipients: 2890,
      delivered: 2845,
      opened: 2401,
      cost: "$289.00",
      sentAt: "Yesterday 3:30 PM",
      icon: MessageSquare,
    },
  ];

  const statusColors = {
    sent: "bg-emerald-100 text-emerald-700",
    scheduled: "bg-blue-100 text-blue-700",
    draft: "bg-slate-100 text-slate-700",
    failed: "bg-red-100 text-red-700",
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Campaigns</h1>
          <p className="text-slate-600 mt-1">Manage broadcast messages across SMS, WhatsApp, and Email</p>
        </div>
        <Link
          href="/campaigns/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
          style={{ background: 'linear-gradient(135deg, #3245ff 0%, #48c9ff 100%)' }}
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(50, 69, 255, 0.1) 0%, rgba(72, 201, 255, 0.1) 100%)' }}>
              <Send className="h-5 w-5" style={{ color: '#3245ff' }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-sm text-slate-600">Total Campaigns</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="text-sm text-slate-600">Successfully Sent</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-sm text-slate-600">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">5.2K</p>
              <p className="text-sm text-slate-600">Total Recipients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3245ff] focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'sent', 'scheduled', 'draft', 'failed'] as CampaignStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === status ? 'bg-[#3245ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <Link href="/campaigns/audiences" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
            <Users className="h-4 w-4" />
            Audiences
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Channel</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Recipients</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Delivered</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Opened</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Cost</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(50, 69, 255, 0.1) 0%, rgba(72, 201, 255, 0.1) 100%)' }}>
                        <campaign.icon className="h-4 w-4" style={{ color: '#3245ff' }} />
                      </div>
                      <Link href={`/campaigns/${campaign.id}`} className="font-medium text-slate-900 hover:text-[#3245ff] transition-colors">
                        {campaign.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.channel}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{campaign.recipients.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.delivered.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.opened.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{campaign.cost}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.sentAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">No campaigns found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or create a new campaign</p>
          </div>
        )}
      </div>
    </div>
  );
}

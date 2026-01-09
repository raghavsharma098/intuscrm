"use client";

import React, { useState } from "react";
import { useAsync } from "@/lib/hooks/useAsync";

interface Report {
  id: string;
  name: string;
  description: string;
  category: "campaign" | "lead" | "sales" | "customer";
  icon: string;
  metrics: string[];
  isCustom: boolean;
}

const reportTemplates: Report[] = [
  {
    id: "campaign_perf",
    name: "Campaign Performance",
    description: "Overview of all campaigns with delivery and engagement metrics",
    category: "campaign",
    icon: "📊",
    metrics: ["Sent", "Delivered", "Opened", "Clicked", "Conversion"],
    isCustom: false,
  },
  {
    id: "lead_funnel",
    name: "Lead Funnel Analysis",
    description: "Track leads through each stage of the sales funnel",
    category: "lead",
    icon: "📈",
    metrics: ["Total Leads", "Qualified", "In Progress", "Converted", "Lost"],
    isCustom: false,
  },
  {
    id: "sales_rev",
    name: "Sales & Revenue",
    description: "Revenue overview including invoices and quotations",
    category: "sales",
    icon: "💰",
    metrics: ["Total Revenue", "Invoiced", "Paid", "Overdue", "Pending"],
    isCustom: false,
  },
  {
    id: "customer_retention",
    name: "Customer Retention",
    description: "Customer lifecycle and retention metrics",
    category: "customer",
    icon: "👥",
    metrics: ["New Customers", "Returning", "Churn Rate", "LTV", "CAC"],
    isCustom: false,
  },
  {
    id: "sms_whatsapp",
    name: "SMS & WhatsApp",
    description: "Message delivery and engagement across all channels",
    category: "campaign",
    icon: "📱",
    metrics: ["SMS Sent", "WhatsApp Sent", "Delivery Rate", "Read Rate", "Reply Rate"],
    isCustom: false,
  },
  {
    id: "helpdesk_perf",
    name: "Helpdesk Performance",
    description: "Support ticket metrics and agent performance",
    category: "customer",
    icon: "🎫",
    metrics: ["Total Tickets", "Resolved", "Pending", "Avg Resolution", "CSAT"],
    isCustom: false,
  },
];

export default function AnalyticsReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [customReports, setCustomReports] = useState<Report[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);

  const handleGenerateReport = async (report: Report) => {
    setSelectedReport(report.id);
    setGenerating(true);
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setGenerating(false);
  };

  const handleExport = (format: "pdf" | "csv" | "excel") => {
    // Simulate export
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const allReports = [...reportTemplates, ...customReports];
  const selectedReportData = allReports.find((r) => r.id === selectedReport);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Report Templates */}
        <div className="col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Generate and view analytics reports</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button className="px-4 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold">
              Templates
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900 font-semibold">
              My Reports ({customReports.length})
            </button>
            <button onClick={() => setShowBuilder(true)} className="px-4 py-3 text-gray-600 hover:text-gray-900 font-semibold">
              + Create Custom
            </button>
          </div>

          {/* Report Templates Grid */}
          <div className="grid grid-cols-2 gap-4">
            {reportTemplates.map((report) => (
              <div
                key={report.id}
                onClick={() => handleGenerateReport(report)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                  selectedReport === report.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-400"
                }`}
              >
                <div className="text-3xl mb-3">{report.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="flex flex-wrap gap-2">
                  {report.metrics.map((metric, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Report Preview */}
        <div className="col-span-1">
          {selectedReportData && (
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">{selectedReportData.name}</h3>

                {generating ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 mt-4">Generating report...</p>
                  </div>
                ) : (
                  <>
                    {/* Sample Chart */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg h-40 flex items-end justify-around gap-2">
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "60%" }}></div>
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "75%" }}></div>
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "45%" }}></div>
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "90%" }}></div>
                      <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "55%" }}></div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-600">Period</p>
                        <p className="font-semibold text-gray-900">Last 30 Days</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600">Growth</p>
                        <p className="font-semibold text-green-700">+24.5%</p>
                      </div>
                    </div>

                    {/* Export Options */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleExport("pdf")}
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        📄 Export as PDF
                      </button>
                      <button
                        onClick={() => handleExport("csv")}
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        📊 Export as CSV
                      </button>
                      <button
                        onClick={() => handleExport("excel")}
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        📈 Export as Excel
                      </button>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                        📧 Email Report
                      </button>
                    </div>

                    {/* Date Range */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Date Range</p>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {!selectedReportData && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center h-full flex flex-col items-center justify-center">
              <p className="text-gray-600">Select a report to view</p>
              <p className="text-sm text-gray-500 mt-1">Choose from templates or create a custom report</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Report Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Custom Report</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="My Custom Report"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Metrics</label>
                <div className="space-y-2">
                  {["Revenue", "Conversions", "Engagement", "SMS Sent", "Calls Made"].map((metric) => (
                    <label key={metric} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBuilder(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition font-medium"
                >
                  Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

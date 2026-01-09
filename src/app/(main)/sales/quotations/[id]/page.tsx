"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { SalesService } from "@/services/sales";
import { Quotation, QuotationStatus } from "@/lib/types";
import { useAsync } from "@/lib/hooks/useAsync";

const statusColorMap: Record<QuotationStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-yellow-100 text-yellow-700",
};

const statusLabelMap: Record<QuotationStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
};

const nextStatusMap: Record<QuotationStatus, QuotationStatus | null> = {
  draft: "sent",
  sent: "accepted",
  accepted: null,
  rejected: null,
  expired: null,
};

export default function QuotationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, error, loading } = useAsync(() => SalesService.getQuotation(id), [id]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const quotation = data as Quotation | undefined;

  const handleStatusChange = async (newStatus: QuotationStatus) => {
    if (!quotation) return;
    setUpdateLoading(true);
    setUpdateError("");
    try {
      await SalesService.updateQuotationStatus(quotation.id, newStatus);
      router.refresh();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatDateTime = (date: string) => new Date(date).toLocaleString();

  if (loading && !quotation) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading quotation...</p>
      </div>
    );
  }

  if (error && !quotation) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          Failed to load quotation.
        </div>
      </div>
    );
  }

  if (!quotation) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/sales/quotations" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Quotations
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{quotation.quotationNumber}</h1>
          <p className="text-gray-600 mt-2">{quotation.customerName}</p>
        </div>
        <span className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${statusColorMap[quotation.status]}`}>
          {statusLabelMap[quotation.status]}
        </span>
      </div>

      {updateError && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{updateError}</div>}

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Customer Info */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Customer Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Customer ID:</span>
              <p className="font-semibold text-gray-900">{quotation.customerId}</p>
            </div>
            <div>
              <span className="text-gray-600">Customer Name:</span>
              <p className="font-semibold text-gray-900">{quotation.customerName}</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Dates</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Created:</span>
              <p className="font-semibold text-gray-900">{formatDateTime(quotation.createdAt)}</p>
            </div>
            <div>
              <span className="text-gray-600">Valid Until:</span>
              <p className="font-semibold text-gray-900">{formatDate(quotation.validUntil)}</p>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Amount</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">{formatCurrency(quotation.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold">{formatCurrency(quotation.tax)}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-gray-200 pt-2 mt-2">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-blue-600">{formatCurrency(quotation.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Items</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotation.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {quotation.status !== "accepted" &&
          quotation.status !== "rejected" &&
          quotation.status !== "expired" &&
          nextStatusMap[quotation.status] && (
            <button
              onClick={() => handleStatusChange(nextStatusMap[quotation.status] as QuotationStatus)}
              disabled={updateLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {updateLoading ? "Updating..." : `Mark as ${statusLabelMap[nextStatusMap[quotation.status] as QuotationStatus]}`}
            </button>
          )}
        {quotation.status === "sent" && (
          <button
            onClick={() => handleStatusChange("rejected")}
            disabled={updateLoading}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition disabled:opacity-50"
          >
            {updateLoading ? "Updating..." : "Reject"}
          </button>
        )}
        {quotation.status === "draft" && (
          <button
            onClick={() => router.push(`/sales/quotations/${id}/edit`)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Print
        </button>
      </div>
    </div>
  );
}

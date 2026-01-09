"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SalesService } from "@/services/sales";
import { Quotation, QuotationStatus, PagedResult } from "@/lib/types";
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

export default function QuotationsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | undefined>();
  const { data, error, loading } = useAsync(async () => {
    return await SalesService.listQuotations(page, 10, statusFilter);
  }, [page, statusFilter]);

  const pagedData = data as PagedResult<Quotation> | null;
  const quotations = pagedData?.items || [];
  const total = pagedData?.total || 0;
  const pageSize = 10;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  let errorMsg = "";
  if (error) {
    errorMsg = typeof error === "string" ? error : "Unknown error occurred";
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
          <p className="text-gray-600 mt-2">Manage customer quotations and proposals</p>
        </div>
        <Link
          href="/sales/quotations/new"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          + New Quotation
        </Link>
      </div>

      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => {
            setStatusFilter(undefined);
            setPage(1);
          }}
          className={statusFilter === undefined ? "px-4 py-2 rounded-lg font-medium transition bg-blue-600 text-white" : "px-4 py-2 rounded-lg font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200"}
        >
          All
        </button>
        {(["draft", "sent", "accepted", "rejected", "expired"] as const).map((s: QuotationStatus) => (
          <button
            key={s}
            onClick={() => {
              setStatusFilter(s);
              setPage(1);
            }}
            className={statusFilter === s ? "px-4 py-2 rounded-lg font-medium transition bg-blue-600 text-white" : "px-4 py-2 rounded-lg font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200"}
          >
            {statusLabelMap[s]}
          </button>
        ))}
      </div>

      {loading && !data && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading quotations...</p>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          Failed to load quotations: {errorMsg}
        </div>
      )}

      {!loading && pagedData && quotations.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">QT Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Valid Until</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.map((qt: Quotation) => (
                <tr key={qt.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    <Link href={`/sales/quotations/${qt.id}`} className="text-blue-600 hover:underline">
                      {qt.quotationNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{qt.customerName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(qt.total)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(qt.validUntil)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColorMap[qt.status]}`}>
                      {statusLabelMap[qt.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/sales/quotations/${qt.id}`} className="text-blue-600 hover:underline font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && pagedData && quotations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">No quotations found</p>
        </div>
      ) : null}

      {!loading && pagedData && total > pageSize && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} quotations
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition font-medium"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700 font-medium">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * pageSize >= total}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

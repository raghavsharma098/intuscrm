"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SalesService } from "@/services/sales";
import { CreateQuotationInput } from "@/lib/types";

export default function NewQuotationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    idx: number,
    field: "description" | "quantity" | "unitPrice",
    value: string | number
  ) => {
    const updated = [...formData.items];
    updated[idx] = {
      ...updated[idx],
      [field]: field === "description" ? value : Number(value),
    };
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleRemoveItem = (idx: number) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== idx),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.customerId || !formData.customerName || formData.items.some((i) => !i.description || i.quantity <= 0)) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const input: CreateQuotationInput = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        items: formData.items,
        validUntil: new Date(formData.validUntil).toISOString(),
      };
      await SalesService.createQuotation(input);
      router.push("/sales/quotations");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create quotation");
    } finally {
      setLoading(false);
    }
  };

  const totalItems = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = totalItems * 0.1;
  const total = totalItems + tax;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Quotation</h1>
        <p className="text-gray-600 mt-2">Create a new customer quotation</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

        {/* Customer Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer ID</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                placeholder="CUST-123"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Acme Corp"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quotation Items</h2>
          <div className="space-y-4 mb-4">
            {formData.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <input
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                  min="1"
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-700 font-semibold w-24 text-right">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </span>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
          >
            + Add Item
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">${totalItems.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%):</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-300">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Quotation"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

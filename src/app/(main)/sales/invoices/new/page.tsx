"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SalesService } from "@/services/sales";

export default function NewInvoicePage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [submitting, setSubmitting] = useState(false);

  function addItem() {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  }

  function removeItem(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, field: string, value: string | number) {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
  }

  async function handleCreate() {
    setSubmitting(true);
    try {
      await SalesService.createInvoice({
        customerId: customerId || `cust_${Math.random().toString(36).slice(2, 6)}`,
        customerName,
        items,
        dueDate,
      });
      router.push("/sales/invoices");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = customerName.trim() && dueDate && items.some(it => it.description.trim());

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New Invoice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0A0F1C] rounded-lg border border-gray-200 dark:border-white/10 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Customer Name</label>
                <input
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0A0F1C] rounded-lg border border-gray-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Line Items</h2>
              <button
                type="button"
                onClick={addItem}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Item
              </button>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  placeholder="Description"
                  className="flex-1 rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-20 rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-28 rounded-md border border-gray-300 bg-white/90 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(idx, "unitPrice", Number(e.target.value))}
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#3245ff] to-[#48c9ff] text-white disabled:opacity-50"
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#0A0F1C] rounded-lg border border-gray-200 dark:border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${items.reduce((sum, it) => sum + (it.quantity * it.unitPrice), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (10%)</span>
                <span>${(items.reduce((sum, it) => sum + (it.quantity * it.unitPrice), 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span>${(items.reduce((sum, it) => sum + (it.quantity * it.unitPrice), 0) * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

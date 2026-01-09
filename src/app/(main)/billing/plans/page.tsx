"use client";

import React, { useState } from "react";
import { BillingService } from "@/services/billing";
import { Plan, PlanType } from "@/lib/types";
import { useAsync } from "@/lib/hooks/useAsync";

const planFeatures: Record<PlanType, string[]> = {
  starter: [
    "Up to 1,000 SMS/month",
    "Email & SMS campaigns",
    "Basic analytics",
    "1 team member",
    "Email support",
  ],
  professional: [
    "Up to 50,000 SMS/month",
    "All Starter features",
    "WhatsApp & Voice",
    "Advanced analytics",
    "Up to 5 team members",
    "Priority support",
    "Custom integrations",
  ],
  enterprise: [
    "Unlimited SMS/calls",
    "All Professional features",
    "Dedicated account manager",
    "Unlimited team members",
    "24/7 phone support",
    "Custom SLAs",
    "On-premise deployment",
    "API rate limit: 100k/min",
  ],
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    currency: "USD",
    billingPeriod: "monthly",
    features: planFeatures.starter,
    messageLimit: 1000,
    apiAccess: true,
    support: "email",
  },
  {
    id: "professional",
    name: "Professional",
    price: 499,
    currency: "USD",
    billingPeriod: "monthly",
    features: planFeatures.professional,
    messageLimit: 50000,
    apiAccess: true,
    support: "chat",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    currency: "USD",
    billingPeriod: "yearly",
    features: planFeatures.enterprise,
    apiAccess: true,
    support: "priority",
  },
];

export default function BillingPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PlanType>("starter");

  const handleUpgrade = async (plan: Plan) => {
    setUpgrading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentPlan(plan.id);
      setSelectedPlan(null);
      // Could show success toast here
    } catch (err) {
      console.error("Failed to upgrade plan:", err);
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Billing Plans</h1>
        <p className="text-gray-600 mt-2">Choose the perfect plan for your team</p>
        <p className="text-sm text-gray-500 mt-4">
          Current Plan: <span className="font-semibold text-gray-700 capitalize">{currentPlan}</span>
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex rounded-lg border border-gray-300 p-1">
          <button className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium">
            Monthly
          </button>
          <button className="px-6 py-2 text-gray-700 hover:bg-gray-100 font-medium transition">Annual</button>
        </div>
        <span className="ml-4 text-sm text-green-600 font-medium">Save 20% with annual billing</span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border-2 transition ${
              currentPlan === plan.id
                ? "border-blue-600 bg-blue-50"
                : selectedPlan === plan.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {currentPlan === plan.id && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Current Plan
                </span>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                {plan.price > 0 ? (
                  <>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.billingPeriod === "monthly" ? "month" : "year"}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Billed {plan.billingPeriod}</p>
                  </>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">Custom Pricing</div>
                )}
              </div>

              {/* CTA */}
              {currentPlan === plan.id ? (
                <button disabled className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 font-semibold cursor-default mb-8">
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan)}
                  disabled={upgrading}
                  className={`w-full py-3 rounded-lg font-semibold transition mb-8 ${
                    plan.recommended
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {upgrading ? "Processing..." : plan.price > 0 ? "Upgrade" : "Contact Sales"}
                </button>
              )}

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, bank transfers, and digital payment methods.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">Yes, you get 14 days free trial on any plan. No credit card required.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer discounts for annual billing?</h3>
            <p className="text-gray-600">Yes, annual billing comes with 20% discount automatically applied.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

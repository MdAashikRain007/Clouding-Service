import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DeshboardLayout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiEndpoints } from '../util/apiEndpoints';
import { useAuth } from '@clerk/clerk-react';
import { useCredits } from '../context/CreditsContext';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: '₹',
    credits: 5,
    description: 'Perfect for individuals getting started',
    features: ['5 GB Secure Storage', 'Basic File Sharing', 'Limited Upload Speed', 'Community Support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 199,
    currency: '₹',
    credits: 50,
    description: 'Best for freelancers and personal use',
    features: ['50 GB Secure Storage', 'Unlimited File Sharing', 'Fast Upload Speed', 'Email Support'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: '₹',
    credits: 200,
    description: 'Ideal for professionals and small teams',
    features: ['200 GB Secure Storage', 'Priority Upload Speed', 'Advanced Sharing Controls', 'Priority Email Support', 'Activity Logs'],
    cta: 'Upgrade Now',
    highlighted: true,
  },
];

function Subscription() {
  const { getToken } = useAuth();
  const { fetchCredits } = useCredits();
  const [current, setCurrent] = useState(null);

  const fetchSubscription = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(apiEndpoints.SUBSCRIPTIONS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrent(res.data);
    } catch (err) {
      console.error('Could not load subscription', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchSubscription();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const purchase = async (planId) => {
    try {
      const token = await getToken();
      const res = await axios.post(
        apiEndpoints.PURCHASE_SUBSCRIPTION,
        { plan: planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Subscription purchased');
      setCurrent(res.data.subscription);
      fetchCredits();
    } catch (err) {
      console.error(err);
      toast.error('Purchase failed');
    }
  };

  return (
    <DashboardLayout activeMenu="Subscriptions">
      <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Upgrade Your Plan
            </h2>
            <p className="mt-2 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500">
              {current && (
                <>
                  Current plan: <strong>{current.plan}</strong> • Expires:{' '}
                  {current.expiresAt ? new Date(current.expiresAt).toLocaleDateString() : 'N/A'}
                </>
              )}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`relative rounded-xl border bg-white shadow-sm flex flex-col transition-transform duration-300 ${
                  p.highlighted
                    ? 'border-purple-600 ring-2 ring-purple-600 scale-105 shadow-lg'
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {p.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full shadow">
                      <Star className="w-4 h-4 fill-white" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6 pt-8">
                  <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{p.description}</p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {p.currency}
                      {p.price}
                    </span>
                    <span className="ml-1 text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{p.credits} Credits included</p>
                </div>

                {/* Features */}
                <div className="flex-1 px-6 pb-6">
                  <ul className="space-y-3">
                    {p.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="ml-3 text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6">
                  <button
                    onClick={() => purchase(p.id)}
                    className={`w-full py-3 px-4 rounded-md font-medium transition ${
                      p.highlighted
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {p.price === 0 ? 'Current Plan' : p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Subscription;
import React from "react";
import { Check, Star } from "lucide-react";

function PricingSection({ pricingPlans,openSignUp }) {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border bg-white shadow-sm flex flex-col transition-transform duration-300
                ${
                  plan.highlighted
                    ? "border-purple-600 ring-2 ring-purple-600 scale-105 shadow-lg"
                    : "border-gray-200 hover:shadow-md"
                }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full shadow">
                    <Star className="w-4 h-4 fill-white" />
                    Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pt-8">
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline">
                  {typeof plan.price === "number" ? (
                    <>
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.currency}
                        {plan.price}
                      </span>
                      <span className="ml-1 text-gray-500">
                        /{plan.duration}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 px-6 pb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-1" />
                      <span className="ml-3 text-sm text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6">
                <button onClick={()=>openSignUp()}
                  className={`w-full py-3 px-4 rounded-md font-medium transition
                    ${
                      plan.highlighted
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PricingSection;
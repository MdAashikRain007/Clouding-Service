import React from "react";
import { Wallet, Upload, Lock, Share2, Folder, History } from "lucide-react";

/* icon mapping (based on your data icon field) */
const iconMap = {
  upload: Upload,
  lock: Lock,
  share: Share2,
  wallet: Wallet,
  folder: Folder,
  history: History,
};

function FeaturesSection({ features }) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for the file sharing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            CloudShare provides all the tools you need to manage your digital content
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Wallet;

              return (
                <div
                  key={index}
                  className="pt-5 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>

                      <h3 className="mt-3 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeaturesSection;
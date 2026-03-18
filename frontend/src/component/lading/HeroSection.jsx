import React from "react";
import dashboard from "../../assets/dashboard.png"

const HeroSection = ({openSignIn,openSignUp}) => {
  return (
    <div className="landing-page-content relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-80 z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50">
                🚀 Trusted by 10,000+ users
              </button>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Share Files Securely with</span>
              <span className="block text-purple-600">CloudShare</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
              Upload, manage, and share files effortlessly with enterprise-grade
              security, blazing-fast uploads, and simple collaboration.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={()=> openSignUp()} className="px-8 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
                Get Started 
              </button >

              <button onClick={()=> openSignIn()} className="px-8 py-3 rounded-md border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden">
            <img
              src={dashboard}
              alt="CloudShare Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Secure uploads • Encrypted storage • Share with confidence
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
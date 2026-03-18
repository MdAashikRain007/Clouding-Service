import React from "react";

function CTASection({openSignUp}) {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600">
      {/* Decorative overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to start sharing files securely?
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
          Join thousands of professionals who trust CloudShare to upload,
          manage, and share files with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-purple-600 font-medium hover:bg-purple-50 transition"  onClick={()=>openSignUp()}>
            Get Started Free
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-sm text-purple-200">
          No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
}

export default CTASection;
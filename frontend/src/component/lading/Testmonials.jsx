import React from "react";
import { Star } from "lucide-react";

function Testimonials({ testimonials }) {
  return (
    <div className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by professionals worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            See what our users have to say about CloudShare
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                “{item.quote}”
              </p>

              {/* Rating */}
              <div className="mt-4 flex">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Testimonials;
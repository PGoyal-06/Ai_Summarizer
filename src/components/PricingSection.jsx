import React from "react";

const PricingSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Choose a plan that fits your needs.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Free
                </h3>
                <p className="mt-4 text-2xl font-extrabold text-gray-900">
                  $0{" "}
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      10 article summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      50 video summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Basic summarization
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {/* Basic Plan */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Basic
                </h3>
                <p className="mt-4 text-2xl font-extrabold text-gray-900">
                  $9.99{" "}
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      50 article summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      100 video summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Advanced summarization
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Notes extraction and highlighting
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Premium
                </h3>
                <p className="mt-4 text-2xl font-extrabold text-gray-900">
                  $19.99{" "}
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      200 article summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      500 video summaries per month per user
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Advanced summarization
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Notes extraction and highlighting
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Flashcard generation
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l-2-2 1-1 1 1 3-3 1 1-4 4z" />
                      </svg>
                    </span>
                    <p className="ml-3 text-base text-gray-700">
                      Potential Exam Questions generation
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="relative px-6 py-12 mt-20 mb-32 rounded-xl overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-gray-900/70 rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/20"></div>

      {/* Decorative elements */}
      <div className="absolute -right-20 top-1/2 w-64 h-64 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>

      <div className="text-center relative z-10 max-w-3xl mx-auto">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 text-2xl font-semibold">
          Subscribe now & get 20% off
        </p>
        <p className="text-gray-300 mt-3">
          Join our newsletter for exclusive deals and updates on new collections
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 overflow-hidden rounded-full shadow-lg bg-gray-900/70 border border-purple-900/30 backdrop-blur-sm p-1"
        >
          <div className="flex items-center gap-2 w-full pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              className="w-full outline-none py-3 bg-transparent text-gray-300 placeholder-gray-500"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white font-medium px-8 py-3 rounded-full w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-3">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </div>
    </div>
  );
};

export default NewsletterBox;

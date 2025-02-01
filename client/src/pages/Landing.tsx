import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('name')

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] bg-gradient-to-br from-green-50 to-green-100 p-4">
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 text-center mb-4 sm:mb-6">
        APAY
      </h1>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-green-900 text-center mb-4 sm:mb-6 opacity-80">
        SAFE AND SECURE PAYMENT SOLUTION
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg md:text-xl text-green-700 text-center max-w-2xl mb-6 sm:mb-8">
        Join thousands of users who trust us for fast, reliable, and secure payment processing. Whether you're an individual or a business, we've got you covered.
      </p>

      {/* Call-to-Action Button */}
      <button
        onClick={() => navigate(user ? '/dashboard' : '/login')}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out text-base sm:text-lg font-semibold cursor-pointer"
      >
        Join Now
      </button>

      {/* Additional Features Section */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800">Fast Transactions</h2>
          <p className="text-sm sm:text-base text-green-600">Process payments in seconds.</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800">Secure Payments</h2>
          <p className="text-sm sm:text-base text-green-600">Your data is always protected.</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800">Better UI</h2>
          <p className="text-sm sm:text-base text-green-600">Our UI is far better than other service</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800">24/7 Support</h2>
          <p className="text-sm sm:text-base text-green-600">We're here to help, anytime.</p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-8 sm:mt-12 text-xs sm:text-sm text-green-600 text-center">
        Trusted by over 1 million users worldwide. Start your journey today!
      </p>
    </div>
  );
};

export default Landing;
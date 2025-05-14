import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-90"></div>
          {/* We'll replace this with an actual padel court image later */}
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-bg.jpg')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Padel Courts in Tunisia, Simplified</h1>
              <p className="text-xl mb-8 text-blue-100">The premier platform for booking padel courts across Tunisia. Your game, your way.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/terrains" className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg text-center font-medium">
                  Find Courts
                </Link>
                <Link href="/auth/register" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 px-6 rounded-lg text-center font-medium">
                  Sign Up Now
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* We'll replace this with a custom illustration or mockup */}
              <div className="bg-white rounded-lg shadow-lg p-6 transform rotate-2">
                <div className="bg-gray-100 rounded p-2 mb-4">
                  <div className="h-4 w-24 bg-blue-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-blue-100 rounded w-full"></div>
                  <div className="h-8 bg-blue-100 rounded w-full"></div>
                  <div className="h-8 bg-blue-100 rounded w-3/4"></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-20 bg-blue-50 rounded flex items-center justify-center">
                    <div className="h-8 w-8 bg-blue-300 rounded-full"></div>
                  </div>
                  <div className="h-20 bg-blue-50 rounded flex items-center justify-center">
                    <div className="h-8 w-8 bg-blue-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SuperAiPadel?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform offers a seamless experience for padel enthusiasts in Tunisia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Book your favorite padel court in just a few clicks. View availability in real-time and secure your spot instantly.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Token System</h3>
              <p className="text-gray-600">Purchase tokens in bulk at discounted prices and use them for reservations, making your padel experience more affordable.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Equipment Rental</h3>
              <p className="text-gray-600">Forgot your racket? No problem. Rent equipment directly through our platform at competitive prices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Book your padel court in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">Create an Account</h3>
              <p className="text-gray-600">Sign up for free and set up your player profile</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Find a Court</h3>
              <p className="text-gray-600">Browse available courts and select your preferred time slot</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Confirm Reservation</h3>
              <p className="text-gray-600">Pay with tokens or directly and receive your confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover top-rated padel facilities across Tunisia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* These will be dynamically populated from the database */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Padel Club Tunis</h3>
                <p className="text-gray-600 mb-4">Tunis, Downtown</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">From 40 TND/hour</span>
                  <Link href="/terrains/1" className="text-blue-600 hover:text-blue-800">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sousse Padel Center</h3>
                <p className="text-gray-600 mb-4">Sousse, Beachfront</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">From 35 TND/hour</span>
                  <Link href="/terrains/2" className="text-blue-600 hover:text-blue-800">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sfax Padel Club</h3>
                <p className="text-gray-600 mb-4">Sfax, City Center</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">From 30 TND/hour</span>
                  <Link href="/terrains/3" className="text-blue-600 hover:text-blue-800">View Details</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/terrains" className="inline-block bg-blue-600 text-white hover:bg-blue-700 py-3 px-8 rounded-lg font-medium">
              View All Courts
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">Join thousands of padel enthusiasts in Tunisia who are already using SuperAiPadel to book courts and improve their game.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/register" className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-lg font-medium">
              Sign Up Now
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 px-8 rounded-lg font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

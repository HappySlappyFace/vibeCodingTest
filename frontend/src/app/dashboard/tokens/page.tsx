"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TokenPurchase() {
  // Mock data for token packages - in a real app, this would come from an API call
  const tokenPackages = [
    {
      id: 1,
      name: 'Starter Pack',
      tokens: 20,
      price: 120,
      discount: '0%',
      popular: false,
      description: 'Perfect for trying out the platform',
    },
    {
      id: 2,
      name: 'Regular Pack',
      tokens: 50,
      price: 280,
      discount: '7%',
      popular: true,
      description: 'Our most popular option for regular players',
    },
    {
      id: 3,
      name: 'Pro Pack',
      tokens: 100,
      price: 500,
      discount: '17%',
      popular: false,
      description: 'Best value for frequent players',
    },
    {
      id: 4,
      name: 'Family Pack',
      tokens: 200,
      price: 900,
      discount: '25%',
      popular: false,
      description: 'Share with family and friends',
    },
  ];

  // Mock data for transaction history
  const transactionHistory = [
    {
      id: 1,
      date: '2025-04-15',
      package: 'Regular Pack',
      tokens: 50,
      price: 280,
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-03-20',
      package: 'Starter Pack',
      tokens: 20,
      price: 120,
      status: 'completed',
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);

  // Current user token balance (in a real app, this would come from the user's profile data)
  const userTokens = 25;

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowCheckout(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const handleDone = () => {
    setSelectedPackage(null);
    setShowCheckout(false);
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="flex items-center justify-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Tokens Purchased Successfully!</h2>
            <p className="mt-2 text-lg text-gray-600">
              You have successfully purchased {selectedPackage.tokens} tokens.
            </p>
            <div className="mt-8 bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900">Purchase Details</h3>
              <dl className="mt-4 text-sm text-gray-600 space-y-3">
                <div className="flex justify-between">
                  <dt>Package:</dt>
                  <dd className="font-medium text-gray-900">{selectedPackage.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Tokens:</dt>
                  <dd className="font-medium text-gray-900">{selectedPackage.tokens}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Date:</dt>
                  <dd className="font-medium text-gray-900">{new Date().toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Payment Method:</dt>
                  <dd className="font-medium text-gray-900">
                    {paymentMethod === 'credit-card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                  </dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <dt className="font-medium">Total Paid:</dt>
                  <dd className="font-bold text-gray-900">{selectedPackage.price} TND</dd>
                </div>
              </dl>
            </div>
            <div className="mt-8 space-y-4">
              <button 
                onClick={handleDone}
                className="inline-block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Done
              </button>
              <Link 
                href="/terrains"
                className="inline-block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book a Court
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Token Purchase</h1>
          <p className="mt-1 text-gray-600">Buy tokens to use for court reservations and other services</p>
        </div>

        {/* Current Token Balance */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Current Token Balance</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{userTokens} Tokens</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {!showCheckout ? (
          <>
            {/* Token Packages */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Token Package</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tokenPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className={`bg-white overflow-hidden shadow rounded-lg border ${pkg.popular ? 'border-blue-500' : 'border-gray-200'}`}
                  >
                    {pkg.popular && (
                      <div className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 text-center">
                        Most Popular
                      </div>
                    )}
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-3xl font-extrabold text-gray-900">{pkg.tokens}</span>
                        <span className="ml-1 text-xl font-medium text-gray-500">tokens</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-2xl font-medium text-gray-900">{pkg.price} TND</span>
                        {pkg.discount !== '0%' && (
                          <span className="ml-2 text-sm font-medium text-green-600">
                            Save {pkg.discount}
                          </span>
                        )}
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={() => handlePackageSelect(pkg)}
                          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            {transactionHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                </div>
                
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {transactionHistory.map((transaction) => (
                      <li key={transaction.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-600">{transaction.package}</p>
                            <p className="text-sm text-gray-500">{transaction.tokens} tokens</p>
                          </div>
                          <div className="flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {transaction.date}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {transaction.price} TND
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Complete Your Purchase</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Review your token package and payment details.</p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-500">{selectedPackage.name}</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPackage.tokens} tokens</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPackage.price} TND</p>
                </div>
                {selectedPackage.discount !== '0%' && (
                  <div className="flex justify-between text-green-600">
                    <p className="text-sm">Discount</p>
                    <p className="text-sm font-medium">{selectedPackage.discount}</p>
                  </div>
                )}
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-bold text-gray-900">{selectedPackage.price} TND</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-gray-900">Payment Method</label>
                    <fieldset className="mt-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="credit-card"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === 'credit-card'}
                            onChange={() => setPaymentMethod('credit-card')}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                            Credit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="paypal"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                            PayPal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="bank-transfer"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === 'bank-transfer'}
                            onChange={() => setPaymentMethod('bank-transfer')}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">
                            Bank Transfer
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                          type="text"
                          id="card-number"
                          placeholder="4242 4242 4242 4242"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                          <input
                            type="text"
                            id="expiration"
                            placeholder="MM/YY"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                          <input
                            type="text"
                            id="cvc"
                            placeholder="123"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="John Doe"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <p className="text-sm text-gray-700">
                        You will be redirected to PayPal to complete your purchase after clicking "Complete Purchase".  
                      </p>
                    </div>
                  )}
                  
                  {paymentMethod === 'bank-transfer' && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700 mb-2">
                        Please use the following details for your bank transfer:  
                      </p>
                      <div className="text-sm">
                        <p><span className="font-medium">Bank Name:</span> Tunisia International Bank</p>
                        <p><span className="font-medium">Account Name:</span> SuperAiPadel SARL</p>
                        <p><span className="font-medium">Account Number:</span> 000123456789</p>
                        <p><span className="font-medium">Reference:</span> Token-{selectedPackage.id}-{Date.now().toString().substring(8)}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Your tokens will be credited to your account once we receive your payment. This typically takes 1-2 business days.  
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row-reverse gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Complete Purchase'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

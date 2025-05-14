"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function EquipmentRental() {
  // Mock data - in a real app, this would come from an API call
  const equipment = [
    {
      id: 1,
      name: 'Professional Padel Racket',
      brand: 'BullPadel',
      description: 'Professional grade padel racket, perfect for advanced players.',
      pricePerDay: 15,
      pricePerWeek: 70,
      deposit: 100,
      image: '/images/racket1.jpg',
      available: 5,
      category: 'racket',
    },
    {
      id: 2,
      name: 'Mid-Range Padel Racket',
      brand: 'Head',
      description: 'Great racket for intermediate players.',
      pricePerDay: 10,
      pricePerWeek: 50,
      deposit: 80,
      image: '/images/racket2.jpg',
      available: 8,
      category: 'racket',
    },
    {
      id: 3,
      name: 'Beginner Padel Racket',
      brand: 'Babolat',
      description: 'Lightweight and easy to use, perfect for beginners.',
      pricePerDay: 8,
      pricePerWeek: 40,
      deposit: 60,
      image: '/images/racket3.jpg',
      available: 12,
      category: 'racket',
    },
    {
      id: 4,
      name: 'Premium Padel Balls (3-pack)',
      brand: 'Wilson',
      description: 'Professional padel balls used in tournaments.',
      pricePerDay: 5,
      pricePerWeek: 20,
      deposit: 10,
      image: '/images/balls1.jpg',
      available: 20,
      category: 'balls',
    },
    {
      id: 5,
      name: 'Padel Shoes',
      brand: 'Adidas',
      description: 'Specialized shoes for padel with excellent grip and support.',
      pricePerDay: 12,
      pricePerWeek: 60,
      deposit: 90,
      image: '/images/shoes1.jpg',
      available: 6,
      category: 'shoes',
    },
    {
      id: 6,
      name: 'Padel Gloves',
      brand: 'Nike',
      description: 'Improve your grip with these specialized padel gloves.',
      pricePerDay: 6,
      pricePerWeek: 30,
      deposit: 20,
      image: '/images/gloves1.jpg',
      available: 15,
      category: 'accessories',
    },
  ];

  // Mock data for user's current rentals
  const userRentals = [
    {
      id: 1,
      equipmentId: 2,
      equipmentName: 'Mid-Range Padel Racket',
      brand: 'Head',
      rentalDate: '2025-05-10',
      returnDate: '2025-05-17',
      rentalPeriod: 'week',
      cost: 50,
      deposit: 80,
      status: 'active',
    },
  ];

  const [filter, setFilter] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  // Filter equipment by category
  const filteredEquipment = filter === 'all' 
    ? equipment 
    : equipment.filter(item => item.category === filter);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, rentalType: 'day' }]);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  // Update rental type (day or week)
  const updateRentalType = (id, rentalType) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, rentalType } : item
    ));
  };
  
  // Calculate total cost
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.rentalType === 'day' ? item.pricePerDay : item.pricePerWeek;
      return total + (price * item.quantity);
    }, 0);
  };
  
  // Calculate total deposit
  const calculateDeposit = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.deposit * item.quantity);
    }, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Equipment Rental</h1>
          <p className="mt-1 text-gray-600">Browse and rent high-quality padel equipment for your games</p>
        </div>
        
        {/* Current Rentals */}
        {userRentals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Current Rentals</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {userRentals.map((rental) => (
                  <li key={rental.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">{rental.equipmentName}</p>
                        <p className="text-sm text-gray-500">{rental.brand}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {rental.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {rental.rentalDate} to {rental.returnDate}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {rental.cost} TND ({rental.rentalPeriod})
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Shopping Cart Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('racket')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'racket' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Rackets
            </button>
            <button
              onClick={() => setFilter('balls')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'balls' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Balls
            </button>
            <button
              onClick={() => setFilter('shoes')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'shoes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Shoes
            </button>
            <button
              onClick={() => setFilter('accessories')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'accessories' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Accessories
            </button>
          </div>
          
          <button
            onClick={() => setViewCart(true)}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
        
        {/* Equipment Grid */}
        {!viewCart && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEquipment.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  {/* In a real app, we'd use an actual image */}
                  <span className="text-blue-600 font-medium">{item.name}</span>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-sm font-medium text-gray-500">Daily:</span>
                      <span className="ml-2 text-base font-medium text-gray-900">{item.pricePerDay} TND</span>
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-sm font-medium text-gray-500">Weekly:</span>
                      <span className="ml-2 text-base font-medium text-gray-900">{item.pricePerWeek} TND</span>
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-sm font-medium text-gray-500">Deposit:</span>
                      <span className="ml-2 text-base font-medium text-gray-900">{item.deposit} TND</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {item.available > 0 ? `${item.available} available` : 'Out of stock'}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.available === 0}
                      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm ${item.available > 0 ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-400 bg-gray-200 cursor-not-allowed'}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Cart View */}
        {viewCart && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Your Rental Cart</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Review your selected equipment before completing the rental.</p>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">Your cart is empty. Add some equipment to get started!</p>
                <button
                  onClick={() => setViewCart(false)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Equipment
                </button>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-blue-600">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <label htmlFor={`rental-type-${item.id}`} className="text-sm text-gray-500">Rental:</label>
                            <select
                              id={`rental-type-${item.id}`}
                              value={item.rentalType}
                              onChange={(e) => updateRentalType(item.id, e.target.value)}
                              className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              <option value="day">Daily</option>
                              <option value="week">Weekly</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-500">Qty:</label>
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 border border-gray-300 rounded-l-md"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                id={`quantity-${item.id}`}
                                min="1"
                                max={item.available}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                className="w-12 border-t border-b border-gray-300 text-center"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.available}
                                className="p-1 border border-gray-300 rounded-r-md"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {item.rentalType === 'day' ? item.pricePerDay : item.pricePerWeek} TND
                              {item.quantity > 1 && ` × ${item.quantity}`}
                            </p>
                            <p className="text-xs text-gray-500">Deposit: {item.deposit} TND</p>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="px-4 py-5 sm:p-6 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Rental Total</p>
                      <p className="text-sm font-medium text-gray-900">{calculateTotal()} TND</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Refundable Deposit</p>
                      <p className="text-sm font-medium text-gray-900">{calculateDeposit()} TND</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                      <p className="text-base font-medium text-gray-900">Total Due Today</p>
                      <p className="text-base font-bold text-blue-600">{calculateTotal() + calculateDeposit()} TND</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row-reverse gap-4">
                    <Link 
                      href="/dashboard/equipment/checkout"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Proceed to Checkout
                    </Link>
                    <button
                      onClick={() => setViewCart(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function BookTerrain() {
  const params = useParams();
  const router = useRouter();
  const { facilityId, terrainId } = params;
  
  // In a real app, we would fetch facility and terrain details based on IDs
  const facility = {
    id: facilityId,
    name: 'Padel Club Tunis',
    location: 'Tunis, Downtown',
    pricePerHour: '40 TND',
  };
  
  const terrain = {
    id: terrainId,
    name: 'Court 1',
    type: 'Indoor',
  };
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    duration: 1,
    players: 2,
    useTokens: true,
    paymentMethod: 'tokens',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  // Available time slots (in a real app, this would be fetched from the backend)
  const availableTimeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  
  // Calculate total price
  const totalPrice = parseInt(facility.pricePerHour.split(' ')[0]) * formData.duration;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // If they uncheck "use tokens", change payment method to credit card
    if (name === 'useTokens' && !checked) {
      setFormData(prev => ({
        ...prev,
        paymentMethod: 'creditCard',
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call to create the reservation
    setTimeout(() => {
      setIsLoading(false);
      setBookingConfirmed(true);
    }, 1500);
  };
  
  if (bookingConfirmed) {
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
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
            <p className="mt-2 text-lg text-gray-600">
              Your reservation for {terrain.name} at {facility.name} has been confirmed.
            </p>
            <div className="mt-8 bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900">Reservation Details</h3>
              <dl className="mt-4 text-sm text-gray-600 space-y-3">
                <div className="flex justify-between">
                  <dt>Date:</dt>
                  <dd className="font-medium text-gray-900">{formData.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Time:</dt>
                  <dd className="font-medium text-gray-900">{formData.startTime} - {parseInt(formData.startTime.split(':')[0]) + formData.duration}:00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Players:</dt>
                  <dd className="font-medium text-gray-900">{formData.players}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Payment Method:</dt>
                  <dd className="font-medium text-gray-900">{formData.paymentMethod === 'tokens' ? 'Tokens' : 'Credit Card'}</dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <dt className="font-medium">Total:</dt>
                  <dd className="font-bold text-gray-900">{totalPrice} {formData.paymentMethod === 'tokens' ? 'Tokens' : 'TND'}</dd>
                </div>
              </dl>
            </div>
            <div className="mt-8 space-y-4">
              <Link 
                href="/dashboard"
                className="inline-block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/terrains"
                className="inline-block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Another Court
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book a Court</h1>
          <p className="mt-1 text-gray-600">Complete your reservation for {terrain.name} at {facility.name}</p>
        </div>
        
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Reservation Details</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 space-y-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <select
                  id="startTime"
                  name="startTime"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                >
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (hours)
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>1 hour</option>
                  <option value={2}>2 hours</option>
                  <option value={3}>3 hours</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="players" className="block text-sm font-medium text-gray-700">
                  Number of Players
                </label>
                <select
                  id="players"
                  name="players"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.players}
                  onChange={handleInputChange}
                  required
                >
                  <option value={2}>2 players</option>
                  <option value={4}>4 players</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  id="useTokens"
                  name="useTokens"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.useTokens}
                  onChange={handleInputChange}
                />
                <label htmlFor="useTokens" className="ml-2 block text-sm text-gray-700">
                  Pay with tokens
                </label>
              </div>
              
              {!formData.useTokens && (
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-5 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-blue-600">{totalPrice} {formData.useTokens ? 'Tokens' : 'TND'}</span>
              </div>
              <div className="flex flex-col sm:flex-row-reverse gap-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Confirm Booking'}
                </button>
                <Link
                  href="/terrains"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

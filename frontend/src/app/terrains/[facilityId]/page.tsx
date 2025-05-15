"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function FacilityDetails() {
  const params = useParams();
  const { facilityId } = params;
  
  // In a real implementation, we would fetch this data from the backend based on facilityId
  const facility = {
    id: facilityId,
    name: 'Padel Club Tunis',
    description: 'The premier padel facility in downtown Tunis, featuring 5 professional courts (3 indoor, 2 outdoor) with state-of-the-art lighting and professional-grade surfaces. Our facility includes changing rooms, showers, a cafe, and equipment rental.',
    location: 'Tunis, Downtown',
    address: '123 Avenue Habib Bourguiba, Tunis 1000',
    phone: '+216 71 123 456',
    email: 'info@padelclubtunis.com',
    hours: 'Mon-Fri: 8:00-22:00, Sat-Sun: 9:00-21:00',
    amenities: ['Parking', 'Showers', 'Changing Rooms', 'Cafe', 'Equipment Rental', 'Pro Shop', 'Coaching Services'],
    rating: 4.8,
    reviews: 127,
    pricePerHour: '40 TND',
    discountRate: '10% off for morning slots',
    images: [
      '/images/court1.jpg',
      '/images/court2.jpg',
      '/images/court3.jpg',
    ],
    terrains: [
      { id: 1, name: 'Court 1', type: 'Indoor', indoor: true, available: true, features: ['Professional Surface', 'LED Lighting', 'Glass Walls'] },
      { id: 2, name: 'Court 2', type: 'Indoor', indoor: true, available: false, features: ['Professional Surface', 'LED Lighting', 'Glass Walls'] },
      { id: 3, name: 'Court 3', type: 'Indoor', indoor: true, available: true, features: ['Professional Surface', 'LED Lighting', 'Glass Walls'] },
      { id: 4, name: 'Court 4', type: 'Outdoor', indoor: false, available: true, features: ['Professional Surface', 'Night Lighting', 'Glass Walls'] },
      { id: 5, name: 'Court 5', type: 'Outdoor', indoor: false, available: true, features: ['Professional Surface', 'Night Lighting', 'Glass Walls'] },
    ],
  };

  // State for selected date (default to today)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Facility Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{facility.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{facility.location}</p>
              </div>
              <Link
                href="/terrains"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to All Courts
              </Link>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(facility.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{facility.rating} ({facility.reviews} reviews)</span>
              </div>
              <span className="ml-6 text-sm text-gray-600">From {facility.pricePerHour}/hour</span>
              {facility.discountRate && (
                <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                  {facility.discountRate}
                </span>
              )}
            </div>
          </div>

          {/* Facility Images */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* We'd normally map through facility.images and display them, but since we don't have actual images, */}
              {/* we'll use placeholder divs with background colors */}
              <div className="h-48 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-medium">Indoor Court Image</span>
              </div>
              <div className="h-48 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-medium">Outdoor Court Image</span>
              </div>
              <div className="h-48 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-medium">Facility Overview</span>
              </div>
            </div>
          </div>

          {/* Facility Details */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">About {facility.name}</h2>
            <p className="text-gray-600 mb-4">{facility.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-sm text-gray-600">{facility.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h3>
                <p className="text-sm text-gray-600">{facility.phone}</p>
                <p className="text-sm text-gray-600">{facility.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Opening Hours</h3>
                <p className="text-sm text-gray-600">{facility.hours}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Amenities</h3>
                <div className="flex flex-wrap">
                  {facility.amenities.map((amenity, index) => (
                    <span 
                      key={index} 
                      className="mr-2 mb-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Court Booking Section */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Available Courts</h2>
              <div className="flex items-center">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mr-2">
                  Select Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facility.terrains.map((terrain) => (
                <div
                  key={terrain.id}
                  className={`border rounded-lg overflow-hidden ${terrain.available ? 'border-green-300' : 'border-red-300'}`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{terrain.name}</h3>
                        <p className="text-sm text-gray-500">{terrain.type}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${terrain.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {terrain.available ? 'Available' : 'Booked'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-1">Features:</h4>
                      <div className="flex flex-wrap">
                        {terrain.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="mr-1 mb-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {terrain.available && (
                      <div className="mt-4">
                        <Link
                          href={`/terrains/${facility.id}/book/${terrain.id}`}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Book Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

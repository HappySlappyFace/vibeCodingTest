import React from 'react';
import Link from 'next/link';

export default function TerrainsPage() {
  // In a real implementation, we would fetch this data from the backend
  const facilities = [
    {
      id: 1,
      name: 'Padel Club Tunis',
      location: 'Tunis, Downtown',
      rating: 4.8,
      pricePerHour: '40 TND',
      terrains: [
        { id: 1, name: 'Court 1', type: 'Indoor', indoor: true, available: true },
        { id: 2, name: 'Court 2', type: 'Indoor', indoor: true, available: false },
        { id: 3, name: 'Court 3', type: 'Outdoor', indoor: false, available: true },
      ],
    },
    {
      id: 2,
      name: 'Sousse Padel Center',
      location: 'Sousse, Beachfront',
      rating: 4.5,
      pricePerHour: '35 TND',
      terrains: [
        { id: 4, name: 'Court 1', type: 'Indoor', indoor: true, available: true },
        { id: 5, name: 'Court 2', type: 'Outdoor', indoor: false, available: true },
      ],
    },
    {
      id: 3,
      name: 'Sfax Padel Club',
      location: 'Sfax, City Center',
      rating: 4.2,
      pricePerHour: '30 TND',
      terrains: [
        { id: 6, name: 'Court 1', type: 'Indoor', indoor: true, available: false },
        { id: 7, name: 'Court 2', type: 'Indoor', indoor: true, available: true },
        { id: 8, name: 'Court 3', type: 'Outdoor', indoor: false, available: true },
      ],
    },
  ];

  // Cities for filtering
  const cities = ['All Cities', 'Tunis', 'Sousse', 'Sfax', 'Hammamet', 'Monastir'];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Padel Courts</h1>
          <p className="mt-1 text-gray-600">Browse and book available padel courts across Tunisia</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                name="city"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Court Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>All Types</option>
                <option>Indoor</option>
                <option>Outdoor</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Facilities List */}
        <div className="space-y-8">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{facility.name}</h3>
                  <Link
                    href={`/terrains/${facility.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    View Details
                  </Link>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{facility.location}</p>
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
                    <span className="ml-2 text-sm text-gray-600">{facility.rating} / 5</span>
                  </div>
                  <span className="ml-6 text-sm text-gray-600">From {facility.pricePerHour}/hour</span>
                </div>
              </div>
              <div className="px-6 py-5">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Available Courts</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {facility.terrains.map((terrain) => (
                    <div
                      key={terrain.id}
                      className={`border rounded-lg overflow-hidden ${terrain.available ? 'border-green-300' : 'border-red-300'}`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">{terrain.name}</h5>
                            <p className="text-xs text-gray-500">{terrain.type}</p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${terrain.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {terrain.available ? 'Available' : 'Booked'}
                          </span>
                        </div>
                        {terrain.available && (
                          <div className="mt-4">
                            <Link
                              href={`/terrains/${facility.id}/book/${terrain.id}`}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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
          ))}
        </div>
      </div>
    </div>
  );
}

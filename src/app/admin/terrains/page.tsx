"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminTerrains() {
  // Mock data - in a real app, this would come from an API call
  const facilityData = {
    id: 1,
    name: 'Padel Club Tunis',
    location: 'Tunis, Downtown',
  };

  const initialTerrains = [
    { 
      id: 1, 
      name: 'Court 1', 
      type: 'Indoor', 
      status: 'active',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
      reservationsToday: 4,
      totalReservations: 128,
      maintenanceDate: '2025-03-15',
    },
    { 
      id: 2, 
      name: 'Court 2', 
      type: 'Indoor', 
      status: 'active',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
      reservationsToday: 3,
      totalReservations: 112,
      maintenanceDate: '2025-03-15',
    },
    { 
      id: 3, 
      name: 'Court 3', 
      type: 'Indoor', 
      status: 'active',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
      reservationsToday: 2,
      totalReservations: 96,
      maintenanceDate: '2025-03-20',
    },
    { 
      id: 4, 
      name: 'Court 4', 
      type: 'Outdoor', 
      status: 'active',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
      reservationsToday: 3,
      totalReservations: 104,
      maintenanceDate: '2025-04-01',
    },
    { 
      id: 5, 
      name: 'Court 5', 
      type: 'Outdoor', 
      status: 'maintenance',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
      reservationsToday: 0,
      totalReservations: 86,
      maintenanceDate: '2025-05-14',
    },
  ];

  const [terrains, setTerrains] = useState(initialTerrains);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTerrain, setNewTerrain] = useState({
    name: '',
    type: 'Indoor',
    surface: 'Premium Artificial Grass',
    glassWalls: true,
    lights: true,
    dimensions: '20m x 10m',
  });

  // Filter terrains based on selected filter
  const filteredTerrains = filter === 'all' 
    ? terrains 
    : filter === 'maintenance'
    ? terrains.filter(terrain => terrain.status === 'maintenance')
    : terrains.filter(terrain => terrain.type.toLowerCase() === filter && terrain.status === 'active');

  // Toggle terrain status (active/maintenance)
  const toggleTerrainStatus = (id) => {
    setTerrains(terrains.map(terrain => 
      terrain.id === id 
        ? { 
            ...terrain, 
            status: terrain.status === 'active' ? 'maintenance' : 'active',
            maintenanceDate: terrain.status === 'active' ? new Date().toISOString().split('T')[0] : terrain.maintenanceDate
          } 
        : terrain
    ));
  };

  // Handle input change for new terrain form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTerrain({
      ...newTerrain,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Add new terrain
  const handleAddTerrain = (e) => {
    e.preventDefault();
    const id = Math.max(...terrains.map(t => t.id)) + 1;
    const newTerrainData = {
      ...newTerrain,
      id,
      status: 'active',
      reservationsToday: 0,
      totalReservations: 0,
      maintenanceDate: '',
    };
    setTerrains([...terrains, newTerrainData]);
    setNewTerrain({
      name: '',
      type: 'Indoor',
      surface: 'Premium Artificial Grass',
      glassWalls: true,
      lights: true,
      dimensions: '20m x 10m',
    });
    setShowAddModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Court Management</h1>
            <p className="mt-1 text-gray-600">{facilityData.name} - {facilityData.location}</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Court
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            All Courts
          </button>
          <button
            onClick={() => setFilter('indoor')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'indoor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Indoor
          </button>
          <button
            onClick={() => setFilter('outdoor')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'outdoor' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Outdoor
          </button>
          <button
            onClick={() => setFilter('maintenance')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'maintenance' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Under Maintenance
          </button>
        </div>

        {/* Courts Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTerrains.length > 0 ? (
                filteredTerrains.map((terrain) => (
                  <tr key={terrain.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{terrain.name}</div>
                      <div className="text-sm text-gray-500">{terrain.dimensions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{terrain.type}</div>
                      <div className="text-sm text-gray-500">{terrain.surface}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {terrain.glassWalls && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Glass Walls
                          </span>
                        )}
                        {terrain.lights && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Lights
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${terrain.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {terrain.status === 'active' ? 'Active' : 'Maintenance'}
                      </span>
                      {terrain.status === 'maintenance' && (
                        <div className="text-xs text-gray-500 mt-1">Since: {terrain.maintenanceDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Today: {terrain.reservationsToday} bookings</div>
                      <div className="text-sm text-gray-500">Total: {terrain.totalReservations} bookings</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link 
                          href={`/admin/terrains/${terrain.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => toggleTerrainStatus(terrain.id)}
                          className={terrain.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                        >
                          {terrain.status === 'active' ? 'Set to Maintenance' : 'Set to Active'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No courts found matching the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add New Court Modal */}
        {showAddModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Add New Court
                      </h3>
                      <div className="mt-6">
                        <form onSubmit={handleAddTerrain}>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Court Name</label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={newTerrain.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                              <select
                                id="type"
                                name="type"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                value={newTerrain.type}
                                onChange={handleInputChange}
                              >
                                <option>Indoor</option>
                                <option>Outdoor</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="surface" className="block text-sm font-medium text-gray-700">Surface</label>
                              <select
                                id="surface"
                                name="surface"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                value={newTerrain.surface}
                                onChange={handleInputChange}
                              >
                                <option>Premium Artificial Grass</option>
                                <option>Standard Artificial Grass</option>
                                <option>Hard Court</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
                              <input
                                type="text"
                                name="dimensions"
                                id="dimensions"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={newTerrain.dimensions}
                                onChange={handleInputChange}
                              />
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="glassWalls"
                                  name="glassWalls"
                                  type="checkbox"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                  checked={newTerrain.glassWalls}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="glassWalls" className="font-medium text-gray-700">Glass Walls</label>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="lights"
                                  name="lights"
                                  type="checkbox"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                  checked={newTerrain.lights}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="lights" className="font-medium text-gray-700">Lights</label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Add Court
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAddModal(false)}
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

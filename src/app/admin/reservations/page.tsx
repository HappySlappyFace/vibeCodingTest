"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminReservations() {
  // Mock data - in a real app, this would come from an API call
  const facilityData = {
    id: 1,
    name: 'Padel Club Tunis',
    location: 'Tunis, Downtown',
  };

  const initialReservations = [
    { 
      id: 1, 
      court: 'Court 1', 
      date: '2025-05-14', 
      time: '18:00 - 19:00', 
      user: 'Ahmed Ben Ali', 
      userEmail: 'ahmed@example.com',
      phone: '+216 55 123 456',
      players: 4,
      paymentMethod: 'Tokens',
      amount: 40,
      status: 'confirmed',
      createdAt: '2025-05-10',
    },
    { 
      id: 2, 
      court: 'Court 2', 
      date: '2025-05-14', 
      time: '19:00 - 20:00', 
      user: 'Sara Mansour', 
      userEmail: 'sara@example.com',
      phone: '+216 55 789 123',
      players: 2,
      paymentMethod: 'Credit Card',
      amount: 40,
      status: 'confirmed',
      createdAt: '2025-05-12',
    },
    { 
      id: 3, 
      court: 'Court 3', 
      date: '2025-05-15', 
      time: '17:00 - 18:00', 
      user: 'Youssef Khelifi', 
      userEmail: 'youssef@example.com',
      phone: '+216 55 456 789',
      players: 4,
      paymentMethod: 'Tokens',
      amount: 40,
      status: 'pending',
      createdAt: '2025-05-13',
    },
    { 
      id: 4, 
      court: 'Court 1', 
      date: '2025-05-16', 
      time: '16:00 - 17:00', 
      user: 'Mohammed Hassan', 
      userEmail: 'mohammed@example.com',
      phone: '+216 55 234 567',
      players: 4,
      paymentMethod: 'Credit Card',
      amount: 40,
      status: 'confirmed',
      createdAt: '2025-05-14',
    },
    { 
      id: 5, 
      court: 'Court 4', 
      date: '2025-05-16', 
      time: '18:00 - 19:00', 
      user: 'Leila Trabelsi', 
      userEmail: 'leila@example.com',
      phone: '+216 55 345 678',
      players: 2,
      paymentMethod: 'Tokens',
      amount: 40,
      status: 'confirmed',
      createdAt: '2025-05-14',
    },
    { 
      id: 6, 
      court: 'Court 2', 
      date: '2025-05-13', 
      time: '17:00 - 18:00', 
      user: 'Nadia Selmi', 
      userEmail: 'nadia@example.com',
      phone: '+216 55 567 890',
      players: 4,
      paymentMethod: 'Credit Card',
      amount: 40,
      status: 'completed',
      createdAt: '2025-05-10',
    },
    { 
      id: 7, 
      court: 'Court 3', 
      date: '2025-05-13', 
      time: '19:00 - 20:00', 
      user: 'Karim Mbarki', 
      userEmail: 'karim@example.com',
      phone: '+216 55 678 901',
      players: 4,
      paymentMethod: 'Tokens',
      amount: 40,
      status: 'cancelled',
      createdAt: '2025-05-08',
    },
  ];

  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date in YYYY-MM-DD format
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Filter reservations based on selected filters and search term
  const filteredReservations = reservations
    .filter(reservation => {
      // Filter by status
      if (filter === 'all') return true;
      return reservation.status === filter;
    })
    .filter(reservation => {
      // Filter by date
      if (dateFilter === 'all') return true;
      if (dateFilter === 'today') return reservation.date === today;
      if (dateFilter === 'tomorrow') return reservation.date === tomorrowStr;
      if (dateFilter === 'upcoming') return reservation.date >= today;
      if (dateFilter === 'past') return reservation.date < today;
      return true;
    })
    .filter(reservation => {
      // Filter by search term
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        reservation.user.toLowerCase().includes(searchLower) ||
        reservation.userEmail.toLowerCase().includes(searchLower) ||
        reservation.court.toLowerCase().includes(searchLower)
      );
    });

  // Handle reservation status change
  const handleStatusChange = (id, newStatus) => {
    if (newStatus === 'cancelled') {
      // Show cancel modal
      const reservation = reservations.find(r => r.id === id);
      setSelectedReservation(reservation);
      setShowCancelModal(true);
    } else {
      // Update status directly
      setReservations(reservations.map(reservation => 
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      ));
    }
  };

  // Handle reservation cancellation
  const handleCancelReservation = () => {
    if (!selectedReservation) return;

    setReservations(reservations.map(reservation => 
      reservation.id === selectedReservation.id ? { ...reservation, status: 'cancelled' } : reservation
    ));
    setShowCancelModal(false);
    setSelectedReservation(null);
    setCancelReason('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
            <p className="mt-1 text-gray-600">{facilityData.name} - {facilityData.location}</p>
          </div>
          <Link
            href="/admin/reservations/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Reservation
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by name, email, or court"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {filteredReservations.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reservation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reservation.court}</div>
                      <div className="text-sm text-gray-500">{reservation.date}</div>
                      <div className="text-sm text-gray-500">{reservation.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.user}</div>
                      <div className="text-sm text-gray-500">{reservation.userEmail}</div>
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.players} players</div>
                      <div className="text-sm text-gray-500">{reservation.paymentMethod}</div>
                      <div className="text-sm text-gray-500">{reservation.amount} TND</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${{
                        'confirmed': 'bg-green-100 text-green-800',
                        'pending': 'bg-yellow-100 text-yellow-800',
                        'completed': 'bg-blue-100 text-blue-800',
                        'cancelled': 'bg-red-100 text-red-800'
                      }[reservation.status]}`}>
                        {reservation.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">Created: {reservation.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link 
                          href={`/admin/reservations/${reservation.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        
                        {reservation.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        
                        {['pending', 'confirmed'].includes(reservation.status) && (
                          <button 
                            onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                        
                        {reservation.status === 'confirmed' && reservation.date <= today && (
                          <button 
                            onClick={() => handleStatusChange(reservation.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No reservations found matching your filters.
            </div>
          )}
        </div>

        {/* Cancel Reservation Modal */}
        {showCancelModal && selectedReservation && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Cancel Reservation
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to cancel this reservation for {selectedReservation.user} on {selectedReservation.date} at {selectedReservation.time}?
                        </p>
                        <div className="mt-4">
                          <label htmlFor="cancel-reason" className="block text-sm font-medium text-gray-700">Reason for cancellation (optional)</label>
                          <textarea
                            id="cancel-reason"
                            name="cancel-reason"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleCancelReservation}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel Reservation
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCancelModal(false);
                      setSelectedReservation(null);
                      setCancelReason('');
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Keep Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

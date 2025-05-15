"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminStatistics() {
  // Mock data - in a real app, this would come from an API call
  const facilityData = {
    id: 1,
    name: 'Padel Club Tunis',
    location: 'Tunis, Downtown',
  };

  // Mock statistics data
  const statistics = {
    revenue: {
      today: 480,
      thisWeek: 2850,
      thisMonth: 9600,
      lastMonth: 8400,
      monthlyData: [
        { month: 'Jan', amount: 6200 },
        { month: 'Feb', amount: 7100 },
        { month: 'Mar', amount: 8300 },
        { month: 'Apr', amount: 7800 },
        { month: 'May', amount: 9600 },
      ],
    },
    reservations: {
      today: 12,
      thisWeek: 68,
      thisMonth: 240,
      lastMonth: 218,
      monthlyData: [
        { month: 'Jan', count: 180 },
        { month: 'Feb', count: 190 },
        { month: 'Mar', count: 210 },
        { month: 'Apr', count: 200 },
        { month: 'May', count: 240 },
      ],
      byStatus: {
        completed: 192,
        confirmed: 30,
        pending: 8,
        cancelled: 10,
      },
    },
    courts: {
      total: 5,
      active: 4,
      maintenance: 1,
      usage: [
        { court: 'Court 1', reservations: 58, revenue: 2320 },
        { court: 'Court 2', reservations: 52, revenue: 2080 },
        { court: 'Court 3', reservations: 48, revenue: 1920 },
        { court: 'Court 4', reservations: 50, revenue: 2000 },
        { court: 'Court 5', reservations: 32, revenue: 1280 },
      ],
      busyHours: [
        { hour: '10:00', count: 18 },
        { hour: '11:00', count: 20 },
        { hour: '12:00', count: 15 },
        { hour: '13:00', count: 10 },
        { hour: '14:00', count: 12 },
        { hour: '15:00', count: 16 },
        { hour: '16:00', count: 22 },
        { hour: '17:00', count: 38 },
        { hour: '18:00', count: 45 },
        { hour: '19:00', count: 42 },
        { hour: '20:00', count: 28 },
      ],
    },
    customers: {
      total: 175,
      new: 28,
      returning: 147,
      topUsers: [
        { name: 'Ahmed Ben Ali', reservations: 12, totalSpent: 480 },
        { name: 'Sara Mansour', reservations: 10, totalSpent: 400 },
        { name: 'Mohammed Hassan', reservations: 9, totalSpent: 360 },
        { name: 'Leila Trabelsi', reservations: 8, totalSpent: 320 },
        { name: 'Youssef Khelifi', reservations: 7, totalSpent: 280 },
      ],
    },
  };

  const [timeRange, setTimeRange] = useState('month');

  // Helper function to generate simple bar chart using CSS
  const BarChart = ({ data, valueKey, labelKey, maxValue, valuePrefix = '', valueSuffix = '' }) => {
    return (
      <div className="space-y-2">
        {data.map((item, index) => {
          const value = item[valueKey];
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center">
              <div className="w-24 text-sm text-gray-600">{item[labelKey]}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-24 text-right text-sm text-gray-900">
                {valuePrefix}{value}{valueSuffix}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate percentages for the status pie chart
  const totalReservations = Object.values(statistics.reservations.byStatus).reduce((sum, val) => sum + val, 0);
  const statusColors = {
    completed: 'bg-green-500',
    confirmed: 'bg-blue-500',
    pending: 'bg-yellow-500',
    cancelled: 'bg-red-500'
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistics & Analytics</h1>
            <p className="mt-1 text-gray-600">{facilityData.name} - {facilityData.location}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Year
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} Revenue</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {timeRange === 'week' ? statistics.revenue.thisWeek : timeRange === 'month' ? statistics.revenue.thisMonth : statistics.revenue.thisMonth * 12} TND
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>14% vs previous {timeRange}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} Reservations</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {timeRange === 'week' ? statistics.reservations.thisWeek : timeRange === 'month' ? statistics.reservations.thisMonth : statistics.reservations.thisMonth * 12}
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>10% vs previous {timeRange}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{statistics.customers.total}</div>
                      <div className="flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{statistics.customers.new} new this month</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Court Utilization</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{Math.round((statistics.reservations.thisMonth / (statistics.courts.total * 30 * 12)) * 100)}%</div>
                      <div className="flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>5% vs previous month</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue by Month</h2>
            <BarChart 
              data={statistics.revenue.monthlyData} 
              valueKey="amount" 
              labelKey="month" 
              maxValue={10000}
              valuePrefix=""
              valueSuffix=" TND"
            />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Reservations by Status</h2>
            <div className="flex space-x-4">
              <div className="w-32 h-32 relative">
                {/* Simple CSS Pie Chart */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-green-500" style={{ clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)` }}></div>
                  <div className="absolute inset-0 bg-blue-500" style={{ clipPath: `polygon(50% 50%, 100% 0%, 100% 50%, 50% 50%)` }}></div>
                  <div className="absolute inset-0 bg-yellow-500" style={{ clipPath: `polygon(50% 50%, 100% 50%, 100% 75%, 50% 50%)` }}></div>
                  <div className="absolute inset-0 bg-red-500" style={{ clipPath: `polygon(50% 50%, 100% 75%, 100% 100%, 75% 100%, 50% 50%)` }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  {Object.entries(statistics.reservations.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center">
                      <div className={`w-4 h-4 ${statusColors[status]} rounded-full mr-2`}></div>
                      <div className="flex-1 text-sm text-gray-600 capitalize">{status}</div>
                      <div className="text-sm font-medium text-gray-900">{count}</div>
                      <div className="w-16 text-right text-sm text-gray-500">
                        {Math.round((count / totalReservations) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Court Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Court Performance</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Court
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reservations
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statistics.courts.usage.map((court, index) => {
                  const utilization = Math.round((court.reservations / 60) * 100); // Assuming max 60 reservations per month
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {court.court}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {court.reservations}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {court.revenue} TND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${utilization}%` }}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-900">{utilization}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Hours & Top Customers */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Hours</h2>
            <BarChart 
              data={statistics.courts.busyHours} 
              valueKey="count" 
              labelKey="hour" 
              maxValue={50}
            />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Top Customers</h2>
              <Link href="/admin/customers" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reservations
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statistics.customers.topUsers.map((customer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{customer.reservations}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{customer.totalSpent} TND</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

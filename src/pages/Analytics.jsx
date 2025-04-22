import React, { useState } from 'react';
import {
  ChartBarIcon,
  MusicalNoteIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  HeartIcon,
  ClockIcon,
  CalendarIcon,
  ChartPieIcon,
  MapIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const TIME_RANGES = [
  { id: '7d', name: '7 Days', days: 7 },
  { id: '30d', name: '30 Days', days: 30 },
  { id: '90d', name: '90 Days', days: 90 },
  { id: '1y', name: '1 Year', days: 365 },
];

const ANALYTICS_SECTIONS = [
  {
    title: 'Streaming Trends',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
    data: [
      { date: 'Mon', streams: 1200 },
      { date: 'Tue', streams: 1800 },
      { date: 'Wed', streams: 1500 },
      { date: 'Thu', streams: 2100 },
      { date: 'Fri', streams: 2400 },
      { date: 'Sat', streams: 2800 },
      { date: 'Sun', streams: 2200 },
    ]
  },
  {
    title: 'Audience Demographics',
    icon: UsersIcon,
    color: 'bg-blue-500',
    data: [
      { category: '18-24', percentage: 35 },
      { category: '25-34', percentage: 45 },
      { category: '35-44', percentage: 15 },
      { category: '45+', percentage: 5 },
    ]
  },
  {
    title: 'Geographic Distribution',
    icon: MapIcon,
    color: 'bg-green-500',
    data: [
      { country: 'United States', percentage: 40 },
      { country: 'United Kingdom', percentage: 25 },
      { country: 'Germany', percentage: 15 },
      { country: 'France', percentage: 10 },
      { country: 'Others', percentage: 10 },
    ]
  }
];

const DEVICE_STATS = [
  { name: 'Mobile', percentage: 65, icon: DevicePhoneMobileIcon },
  { name: 'Desktop', percentage: 25, icon: ChartPieIcon },
  { name: 'Tablet', percentage: 10, icon: DevicePhoneMobileIcon },
];

const generateMockData = (days) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      }),
      fullDate: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      streams: Math.floor(Math.random() * 2000) + 1000,
    });
  }
  return data;
};

const Analytics = () => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState(() => ({
    ...ANALYTICS_SECTIONS[0],
    data: generateMockData(7)
  }));

  // Calculate bar width based on time range
  const getBarWidth = (timeRange) => {
    switch (timeRange) {
      case '7d': return 'w-16';
      case '30d': return 'w-12';
      case '90d': return 'w-8';
      case '1y': return 'w-6';
      default: return 'w-16';
    }
  };

  const handleTimeRangeChange = (rangeId) => {
    setSelectedRange(rangeId);
    const selectedTimeRange = TIME_RANGES.find(range => range.id === rangeId);
    setAnalyticsData(prev => ({
      ...prev,
      data: generateMockData(selectedTimeRange.days)
    }));
  };

  // Get the maximum stream value for scaling the chart
  const maxStreams = Math.max(...analyticsData.data.map(day => day.streams));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Analytics</h1>
            <p className="text-lg text-gray-600">Detailed insights about your music's performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            {TIME_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => handleTimeRangeChange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedRange === range.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Streaming Trends */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Streaming Trends</h2>
              </div>
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            
            {/* Chart Container with Horizontal Scroll */}
            <div className="overflow-x-auto">
              <div className={`h-64 flex items-end space-x-1 ${
                selectedRange === '7d' ? 'min-w-full' : 
                selectedRange === '30d' ? 'min-w-[800px]' : 
                selectedRange === '90d' ? 'min-w-[1200px]' : 
                'min-w-[2000px]'
              }`}>
                {analyticsData.data.map((day) => (
                  <div 
                    key={day.date} 
                    className={`flex-none flex flex-col items-center group relative ${getBarWidth(selectedRange)}`}
                  >
                    <div
                      className="w-full bg-purple-500 rounded-t-lg transition-all duration-300 hover:bg-purple-600 cursor-pointer"
                      style={{ height: `${(day.streams / maxStreams) * 100}%` }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {day.fullDate}: {day.streams.toLocaleString()} streams
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap" 
                      style={{
                        fontSize: selectedRange === '7d' ? '0.75rem' : '0.65rem',
                        marginLeft: '4px'
                      }}>
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audience Demographics */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Audience Demographics</h2>
              </div>
              <ChartPieIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {ANALYTICS_SECTIONS[1].data.map((demo) => (
                <div key={demo.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{demo.category}</span>
                    <span className="text-sm text-gray-500">{demo.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${demo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapIcon className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Geographic Distribution</h2>
              </div>
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {ANALYTICS_SECTIONS[2].data.map((geo) => (
                <div key={geo.country}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{geo.country}</span>
                    <span className="text-sm text-gray-500">{geo.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${geo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Device Usage</h2>
              </div>
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {DEVICE_STATS.map((device) => (
                <div key={device.name} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
                    <device.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600">{device.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="mt-8 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 
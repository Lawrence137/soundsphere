import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Finance = () => {
  const { user } = useAuth();

  // Mock royalty data with larger numbers to test overflow
  const royaltyStats = {
    totalEarnings: 1523045.67, // Larger number to test overflow
    monthlyEarnings: 245075.89,
    pendingPayouts: 120000.00,
    lastPayout: 180050.12,
  };

  const recentTransactions = [
    {
      id: 1,
      platform: 'Spotify',
      amount: 950.25,
      date: '2025-04-28',
      status: 'Completed',
    },
    {
      id: 2,
      platform: 'Apple Music',
      amount: 620.30,
      date: '2025-04-25',
      status: 'Completed',
    },
    {
      id: 3,
      platform: 'YouTube',
      amount: 320.50,
      date: '2025-04-20',
      status: 'Pending',
    },
    {
      id: 4,
      platform: 'Tidal',
      amount: 150.70,
      date: '2025-04-15',
      status: 'Completed',
    },
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 md:p-8"
      >
        {/* Header */}
        {/* <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Hey {user?.name || 'Artist'}, Let’s Talk Money! 💸
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Your royalty earnings, beautifully summarized.
          </p>
        </motion.div> */}

        {/* Royalty Metrics */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full max-w-full"
        >
          {[
            {
              label: 'Total Earnings',
              value: `$${royaltyStats.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              gradient: 'from-green-500 to-emerald-500',
            },
            {
              label: 'Monthly Earnings',
              value: `$${royaltyStats.monthlyEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 011 1v10zm4 0a1 1 0 01-1 1h-1a1 1 0 01-1-1V6a1 1 0 011-1h1a1 1 0 011 1v10z',
              gradient: 'from-blue-500 to-indigo-500',
            },
            {
              label: 'Pending Payouts',
              value: `$${royaltyStats.pendingPayouts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              gradient: 'from-orange-500 to-amber-500',
            },
            {
              label: 'Last Payout',
              value: `$${royaltyStats.lastPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
              gradient: 'from-purple-500 to-pink-500',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 group w-full"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={stat.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 truncate">{stat.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Transactions and Quick Actions */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-full"
        >
          {/* Transactions Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="py-3 px-4 text-sm font-medium">Platform</th>
                    <th className="py-3 px-4 text-sm font-medium">Amount</th>
                    <th className="py-3 px-4 text-sm font-medium">Date</th>
                    <th className="py-3 px-4 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="border-b border-white/10 hover:bg-white/20 transition-all duration-300"
                    >
                      <td className="py-4 px-4 text-sm text-white flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${transaction.platform === 'Spotify' ? 'bg-green-500' : transaction.platform === 'Apple Music' ? 'bg-gray-500' : transaction.platform === 'YouTube' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                        <span>{transaction.platform}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-white">
                        ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">{transaction.date}</td>
                      <td className="py-4 px-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'Completed'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-orange-500/20 text-orange-300'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/withdraw"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Withdraw Earnings</span>
              </Link>
              <Link
                to="/analytics"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>View Detailed Reports</span>
              </Link>
              <Link
                to="/earnings-breakdown"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white hover:from-pink-600 hover:to-fuchsia-600 transition-all transform hover:scale-105"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Earnings Breakdown</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bonus: Earnings Trend Card */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 w-full max-w-full"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Earnings Trend</h2>
          <div className="relative h-64 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <p>Interactive Earnings Chart Coming Soon! 📈</p>
              <p className="text-sm mt-2">Track your earnings growth over time.</p>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Finance;
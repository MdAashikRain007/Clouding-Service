import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DeshboardLayout';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { apiEndpoints } from '../util/apiEndpoints';
import { useCredits } from '../context/CreditsContext';
import toast from 'react-hot-toast';
import { FileUp, BarChart3, CreditCard } from 'lucide-react';

function Dashboard() {
  const { getToken } = useAuth();
  const { credits, fetchCredits } = useCredits();
  const [fileCount, setFileCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const token = await getToken();
      const filesResp = await axios.get(apiEndpoints.FETCH_FILES, { headers: { Authorization: `Bearer ${token}` } });
      setFileCount(filesResp.data.length);
      const txResp = await axios.get(apiEndpoints.TRANSACTIONS, { headers: { Authorization: `Bearer ${token}` } });
      setTransactionsCount(txResp.data.length);
    } catch (err) {
      console.error(err);
      toast.error('Unable to load dashboard stats');
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchCounts();
      await fetchCredits();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">Welcome back!</h1>
            <p className="text-sm sm:text-base text-gray-600">Here's an overview of your CloudShare activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Files Uploaded */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Files Uploaded</p>
                  <p className="text-3xl font-bold text-gray-900">{fileCount}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <FileUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Transactions</p>
                  <p className="text-3xl font-bold text-gray-900">{transactionsCount}</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Credits Remaining */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-sm border border-purple-200 hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Credits Remaining</p>
                  <p className="text-3xl font-bold text-gray-900">{credits ?? 0}</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/upload"
                className="block p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition text-center"
              >
                <FileUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900">Upload Files</span>
              </a>
              <a
                href="/my-files"
                className="block p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition text-center"
              >
                <FileUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900">View Files</span>
              </a>
              <a
                href="/subscriptions"
                className="block p-4 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition text-center"
              >
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900">Get Credits</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard
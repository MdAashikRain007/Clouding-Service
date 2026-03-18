import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DeshboardLayout';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { apiEndpoints } from '../util/apiEndpoints';
import { TrendingUp, FileUp, CreditCard } from 'lucide-react';

function Transactions() {
  const { getToken } = useAuth();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(apiEndpoints.TRANSACTIONS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load transactions');
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTransactions();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              Transaction History
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Track all your file uploads and purchases</p>
          </div>

          {transactions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
              <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-600 font-medium">No transactions yet</p>
              <p className="text-sm sm:text-base text-gray-500 mt-2">Start uploading files or purchasing credits to see your transaction history</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Credits</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {tx.type === 'UPLOAD' ? (
                              <FileUp className="w-5 h-5 text-blue-600" />
                            ) : (
                              <CreditCard className="w-5 h-5 text-green-600" />
                            )}
                            <span className="font-medium text-gray-900">{tx.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{tx.credits ?? '-'}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">
                          {tx.amount != null ? `₹${tx.amount}` : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tx.timestamp ? new Date(tx.timestamp).toLocaleString('en-IN') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transactions
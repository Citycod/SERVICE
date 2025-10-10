/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wallet, 
  Building,  // Using Building instead of Bank
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Download,
  Plus
} from 'lucide-react';

const Withdrawal = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('withdraw');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [submitting, setSubmitting] = useState(false);

  // Mock data
  const walletData = {
    availableBalance: 250000,
    pendingBalance: 75000,
    totalEarnings: 750000
  };

  const withdrawalMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Building, processingTime: '1-3 business days', fee: '₦100' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, processingTime: 'Instant', fee: '2.5%' },
  ];

  const withdrawalHistory = [
    { id: 'WD-001', amount: 50000, method: 'Bank Transfer', status: 'completed', date: '2024-01-15', fee: 100 },
    { id: 'WD-002', amount: 75000, method: 'PayPal', status: 'completed', date: '2024-01-10', fee: 1875 },
    { id: 'WD-003', amount: 100000, method: 'Bank Transfer', status: 'processing', date: '2024-01-08', fee: 100 },
    { id: 'WD-004', amount: 30000, method: 'PayPal', status: 'failed', date: '2024-01-05', fee: 0 },
  ];

  const bankAccounts = [
    { id: '1', bankName: 'GTBank', accountNumber: '0123456789', accountName: 'Chiamaka Okoro', isDefault: true },
    { id: '2', bankName: 'Zenith Bank', accountNumber: '9876543210', accountName: 'Chiamaka Okoro', isDefault: false },
  ];

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!withdrawAmount || parseFloat(withdrawAmount) < 1000) {
      alert('Minimum withdrawal amount is ₦1,000');
      return;
    }

    if (parseFloat(withdrawAmount) > walletData.availableBalance) {
      alert('Insufficient balance');
      return;
    }

    setSubmitting(true);

    // Mock API call
    setTimeout(() => {
      console.log('Withdrawal request:', { amount: withdrawAmount, method: selectedMethod });
      setSubmitting(false);
      setWithdrawAmount('');
      alert('Withdrawal request submitted successfully!');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Withdraw Earnings</h1>
              <p className="text-gray-600">Manage your payments and withdrawal methods</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Wallet Summary */}
          <div className="grid gap-6 mb-8 md:grid-cols-3">
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Available Balance</h3>
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(walletData.availableBalance)}
                </div>
                <p className="mt-2 text-sm text-gray-600">Ready for withdrawal</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Pending Balance</h3>
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(walletData.pendingBalance)}
                </div>
                <p className="mt-2 text-sm text-gray-600">From active orders</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Total Earnings</h3>
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(walletData.totalEarnings)}
                </div>
                <p className="mt-2 text-sm text-gray-600">All-time earnings</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card">
            <div className="border-b">
              <div className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'withdraw'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Withdraw Funds
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Withdrawal History
                </button>
                <button
                  onClick={() => setActiveTab('methods')}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'methods'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Payment Methods
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Withdraw Funds Tab */}
              {activeTab === 'withdraw' && (
                <div className="max-w-2xl">
                  <form onSubmit={handleWithdrawal} className="space-y-6">
                    {/* Amount Input */}
                    <div>
                      <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
                        Withdrawal Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₦</span>
                        <input
                          id="amount"
                          type="number"
                          min="1000"
                          max={walletData.availableBalance}
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          required
                          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter amount"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Minimum withdrawal: ₦1,000 • Available: {formatCurrency(walletData.availableBalance)}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block mb-3 text-sm font-medium text-gray-700">
                        Withdrawal Method *
                      </label>
                      <div className="grid gap-4 md:grid-cols-2">
                        {withdrawalMethods.map((method) => {
                          const IconComponent = method.icon;
                          return (
                            <label
                              key={method.id}
                              className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                                selectedMethod === method.id
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                                  : 'border-gray-300 bg-white hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="withdrawal-method"
                                value={method.id}
                                checked={selectedMethod === method.id}
                                onChange={(e) => setSelectedMethod(e.target.value)}
                                className="sr-only"
                              />
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <IconComponent className="w-6 h-6 mr-3 text-gray-400" />
                                  <div>
                                    <span className="block text-sm font-medium text-gray-900">
                                      {method.name}
                                    </span>
                                    <span className="block text-sm text-gray-500">
                                      Fee: {method.fee} • {method.processingTime}
                                    </span>
                                  </div>
                                </div>
                                {selectedMethod === method.id && (
                                  <CheckCircle className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bank Account Selection (if bank transfer selected) */}
                    {selectedMethod === 'bank' && (
                      <div>
                        <label className="block mb-3 text-sm font-medium text-gray-700">
                          Select Bank Account
                        </label>
                        <div className="space-y-3">
                          {bankAccounts.map((account) => (
                            <label
                              key={account.id}
                              className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                              <input
                                type="radio"
                                name="bank-account"
                                defaultChecked={account.isDefault}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">
                                  {account.bankName} •••{account.accountNumber.slice(-4)}
                                </span>
                                <span className="block text-sm text-gray-500">
                                  {account.accountName}
                                </span>
                              </div>
                              {account.isDefault && (
                                <span className="px-2 py-1 ml-auto text-xs text-blue-800 bg-blue-100 rounded-full">
                                  Default
                                </span>
                              )}
                            </label>
                          ))}
                          <button
                            type="button"
                            className="flex items-center text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add New Bank Account
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h4 className="mb-3 font-semibold">Withdrawal Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Withdrawal Amount:</span>
                          <span>{withdrawAmount ? `₦${parseFloat(withdrawAmount).toLocaleString()}` : '₦0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span>₦100</span>
                        </div>
                        <div className="flex justify-between pt-2 font-semibold border-t">
                          <span>You'll Receive:</span>
                          <span>
                            {withdrawAmount ? `₦${(parseFloat(withdrawAmount) - 100).toLocaleString()}` : '₦0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting || !withdrawAmount}
                      className="w-full btn btn-primary"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                          Processing Withdrawal...
                        </>
                      ) : (
                        'Withdraw Funds'
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Withdrawal History Tab */}
              {activeTab === 'history' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Withdrawal History</h3>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </button>
                  </div>

                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Transaction
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Method
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {withdrawalHistory.map((withdrawal) => (
                          <tr key={withdrawal.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {withdrawal.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {formatCurrency(withdrawal.amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {withdrawal.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                                {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(withdrawal.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {withdrawalHistory.length === 0 && (
                    <div className="py-12 text-center">
                      <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="mb-2 text-lg font-semibold">No Withdrawals Yet</h3>
                      <p className="text-gray-600">Your withdrawal history will appear here</p>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'methods' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <button className="btn btn-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {bankAccounts.map((account) => (
                      <div key={account.id} className="card">
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Building className="w-8 h-8 text-gray-400" />
                              <div>
                                <h4 className="font-semibold">{account.bankName}</h4>
                                <p className="text-sm text-gray-600">
                                  {account.accountName} •••{account.accountNumber.slice(-4)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {account.isDefault && (
                                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                                  Default
                                </span>
                              )}
                              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Edit
                              </button>
                              {!account.isDefault && (
                                <button className="text-sm font-medium text-red-600 hover:text-red-700">
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="mb-2 font-semibold text-blue-900">Payment Method Information</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Bank transfers take 1-3 business days to process</li>
                      <li>• PayPal transfers are instant but have higher fees</li>
                      <li>• Minimum withdrawal amount is ₦1,000</li>
                      <li>• Bank transfer fee: ₦100 per transaction</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
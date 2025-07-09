import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loanId, setLoanId] = useState(null);
  const [loan, setLoan] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    // Get loan ID from URL query parameters
    const params = new URLSearchParams(location.search);
    const id = params.get('loanId');
    setLoanId(id);

    // TODO: Replace with actual API calls
    // Simulate loading loan and payment data
    setTimeout(() => {
      setLoan({
        id: id,
        amount: 5000,
        type: 'Business Expansion',
        status: 'Active',
        startDate: '2024-03-01',
        term: 12,
        interestRate: 5.5,
        remainingBalance: 4500
      });

      setPayments([
        {
          id: 1,
          date: '2024-03-01',
          amount: 500,
          status: 'Completed',
          type: 'Regular Payment'
        },
        {
          id: 2,
          date: '2024-04-01',
          amount: 500,
          status: 'Pending',
          type: 'Regular Payment'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [location]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!paymentAmount || isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
      setError('Please enter a valid payment amount');
      return;
    }

    setIsProcessingPayment(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      // Simulate successful payment
      const newPayment = {
        id: payments.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(paymentAmount),
        status: 'Completed',
        type: 'Manual Payment'
      };

      setPayments([newPayment, ...payments]);
      setPaymentAmount('');
      alert('Payment processed successfully!');
    } catch (error) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const downloadReceipt = (paymentId) => {
    // TODO: Implement actual receipt generation and download
    alert('Receipt download functionality will be implemented here');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h2>
          <p className="text-gray-600 mb-4">The requested loan could not be found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Loan Summary */}
            <div className="mb-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Loan Summary</h3>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">${loan.amount}</dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Remaining Balance</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">${loan.remainingBalance}</dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Interest Rate</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{loan.interestRate}%</dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Term</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{loan.term} months</dd>
                  </div>
                </div>
              </div>
            </div>

            {/* Make Payment Form */}
            <div className="mb-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Make a Payment</h3>
              <form onSubmit={handlePayment} className="max-w-lg">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                      Payment Amount ($)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="paymentAmount"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter amount"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessingPayment ? 'Processing...' : 'Make Payment'}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </form>
            </div>

            {/* Payment History */}
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment History</h3>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {payments.map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {payment.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${payment.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {payment.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {payment.status === 'Completed' && (
                                  <button
                                    onClick={() => downloadReceipt(payment.id)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Download Receipt
                                  </button>
                                )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
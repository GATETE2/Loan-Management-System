import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    purpose: '',
    period: '',
    guarantor: {
      name: '',
      email: '',
      phone: '',
      relationship: ''
    },
    documents: {
      businessPlan: null,
      financialStatements: null,
      taxReturns: null
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loanTypes = [
    { id: 'business_expansion', name: 'Business Expansion', maxAmount: 100000, minAmount: 5000 },
    { id: 'equipment_purchase', name: 'Equipment Purchase', maxAmount: 50000, minAmount: 2000 },
    { id: 'working_capital', name: 'Working Capital', maxAmount: 75000, minAmount: 10000 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: file
        }
      }));
    }
  };

  const validateStep = () => {
    let tempErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.loanType) tempErrors.loanType = 'Please select a loan type';
        if (!formData.amount) {
          tempErrors.amount = 'Amount is required';
        } else {
          const selectedLoan = loanTypes.find(lt => lt.id === formData.loanType);
          if (selectedLoan) {
            const amount = parseFloat(formData.amount);
            if (amount < selectedLoan.minAmount) {
              tempErrors.amount = `Minimum amount is $${selectedLoan.minAmount}`;
            } else if (amount > selectedLoan.maxAmount) {
              tempErrors.amount = `Maximum amount is $${selectedLoan.maxAmount}`;
            }
          }
        }
        if (!formData.purpose) tempErrors.purpose = 'Purpose is required';
        if (!formData.period) {
          tempErrors.period = 'Repayment period is required';
        } else if (parseInt(formData.period) < 6 || parseInt(formData.period) > 60) {
          tempErrors.period = 'Repayment period must be between 6 and 60 months';
        }
        break;
      case 2:
        if (!formData.guarantor.name) tempErrors['guarantor.name'] = 'Guarantor name is required';
        if (!formData.guarantor.email) {
          tempErrors['guarantor.email'] = 'Guarantor email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guarantor.email)) {
          tempErrors['guarantor.email'] = 'Invalid email format';
        }
        if (!formData.guarantor.phone) tempErrors['guarantor.phone'] = 'Guarantor phone is required';
        if (!formData.guarantor.relationship) tempErrors['guarantor.relationship'] = 'Relationship is required';
        break;
      case 3:
        if (!formData.documents.businessPlan) tempErrors['documents.businessPlan'] = 'Business plan is required';
        if (!formData.documents.financialStatements) tempErrors['documents.financialStatements'] = 'Financial statements are required';
        if (!formData.documents.taxReturns) tempErrors['documents.taxReturns'] = 'Tax returns are required';
        break;
      default:
        break;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Simulate successful submission
      alert('Loan application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Loan Type</label>
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select a loan type</option>
          {loanTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name} (${type.minAmount} - ${type.maxAmount})
            </option>
          ))}
        </select>
        {errors.loanType && <p className="mt-2 text-sm text-red-600">{errors.loanType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter amount"
        />
        {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Purpose</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Describe the purpose of your loan"
        />
        {errors.purpose && <p className="mt-2 text-sm text-red-600">{errors.purpose}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Repayment Period (months)</label>
        <input
          type="number"
          name="period"
          value={formData.period}
          onChange={handleChange}
          min="6"
          max="60"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter number of months"
        />
        {errors.period && <p className="mt-2 text-sm text-red-600">{errors.period}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Guarantor Name</label>
        <input
          type="text"
          name="guarantor.name"
          value={formData.guarantor.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors['guarantor.name'] && <p className="mt-2 text-sm text-red-600">{errors['guarantor.name']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Guarantor Email</label>
        <input
          type="email"
          name="guarantor.email"
          value={formData.guarantor.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors['guarantor.email'] && <p className="mt-2 text-sm text-red-600">{errors['guarantor.email']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Guarantor Phone</label>
        <input
          type="tel"
          name="guarantor.phone"
          value={formData.guarantor.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors['guarantor.phone'] && <p className="mt-2 text-sm text-red-600">{errors['guarantor.phone']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Relationship to Guarantor</label>
        <input
          type="text"
          name="guarantor.relationship"
          value={formData.guarantor.relationship}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors['guarantor.relationship'] && <p className="mt-2 text-sm text-red-600">{errors['guarantor.relationship']}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Plan</label>
        <input
          type="file"
          name="businessPlan"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="mt-1 block w-full"
        />
        {errors['documents.businessPlan'] && <p className="mt-2 text-sm text-red-600">{errors['documents.businessPlan']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Financial Statements</label>
        <input
          type="file"
          name="financialStatements"
          onChange={handleFileChange}
          accept=".pdf,.xls,.xlsx"
          className="mt-1 block w-full"
        />
        {errors['documents.financialStatements'] && <p className="mt-2 text-sm text-red-600">{errors['documents.financialStatements']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tax Returns</label>
        <input
          type="file"
          name="taxReturns"
          onChange={handleFileChange}
          accept=".pdf"
          className="mt-1 block w-full"
        />
        {errors['documents.taxReturns'] && <p className="mt-2 text-sm text-red-600">{errors['documents.taxReturns']}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Loan Application</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Please complete all steps to submit your loan application.</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-24 h-1 ${
                          step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">Loan Details</span>
                <span className="text-sm text-gray-500">Guarantor</span>
                <span className="text-sm text-gray-500">Documents</span>
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {errors.submit && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{errors.submit}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
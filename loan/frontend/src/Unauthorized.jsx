import React from 'react';

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Unauthorized</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <a href="/login" className="text-blue-600 hover:underline">Go to Login</a>
    </div>
  </div>
);

export default Unauthorized; 
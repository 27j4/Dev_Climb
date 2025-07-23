import React from 'react';

const Premium = () => {
  return (
    <div className="my-10 mx-6">
      <div className="flex justify-center gap-8">
        {/* Silver Plan Card */}
        <div className="card bg-base-300 rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center">
          <h1 className="font-bold text-3xl text-blue-600 mb-4">Silver</h1>
          <ul className="text-lg text-gray-700 space-y-2 mb-6">
            <h2 className="font-semibold text-xl text-gray-800">Features:</h2>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
          <button className="btn btn-primary w-full text-lg py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Buy Now
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center text-xl font-semibold text-gray-600">
          <span className="divider divider-horizontal mx-4">OR</span>
        </div>

        {/* Gold Plan Card */}
        <div className="card bg-yellow-200 rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center">
          <h1 className="font-bold text-3xl text-yellow-600 mb-4">Gold</h1>
          <ul className="text-lg text-gray-700 space-y-2 mb-6">
            <h2 className="font-semibold text-xl text-gray-800">Features:</h2>
            <li>X</li>
            <li>Y</li>
            <li>Z</li>
          </ul>
          <button className="btn btn-secondary w-full text-lg py-3 rounded-lg hover:bg-yellow-600 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

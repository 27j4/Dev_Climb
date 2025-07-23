import React, { useState } from 'react';

const CodechefProfile = () => {
  const [username, setUsername] = useState('durgeshagr_22');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchCodechefData = async () => {
    if (!username.trim()) {
      setError("Please enter a CodeChef username.");
      return;
    }

    setError('');
    setUserData(null);

    try {
      const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("User Not Found");
    }
  };

  return (
    <div className="flex flex-col items-center my-10 px-4 w-full overflow-x-auto font-sans text-gray-800">
      <div className="bg-gray-50 border border-blue-500 shadow-xl rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
          CodeChef Profile
        </h2>

        {/* Username Input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter CodeChef Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchCodechefData}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-800 transition"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4 font-medium">
            {error}
          </p>
        )}

        {/* Profile Card */}
        {userData && (
          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={userData.profile}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-blue-500 shadow"
              />
              <div>
                <h3 className="text-xl font-bold">{userData.name}</h3>
                <p className="text-gray-600 text-sm">@{username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={userData.countryFlag}
                alt="Flag"
                className="w-5 h-4 rounded-sm shadow"
              />
              <p className="text-sm text-gray-600 font-medium">
                {userData.countryName}
              </p>
            </div>

            <div className="text-sm sm:text-base space-y-1">
              <p><span className="font-semibold">⭐ Stars:</span> {userData.stars}</p>
              <p><span className="font-semibold">Current Rating:</span> {userData.currentRating}</p>
              <p><span className="font-semibold">Highest Rating:</span> {userData.highestRating}</p>
              <p><span className="font-semibold">Global Rank:</span> {userData.globalRank}</p>
              <p><span className="font-semibold">Country Rank:</span> {userData.countryRank}</p>
            </div>

            <div className="text-center mt-3">
              <a
                href={`https://www.codechef.com/users/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                View Full Profile →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodechefProfile;

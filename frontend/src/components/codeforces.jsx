import React, { useState } from "react";

const CodeforcesProfile = () => {
  const [username, setUsername] = useState("durgeshagr_22");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchCodeforcesData = async () => {
    if (!username.trim()) {
      setError("Please enter a Codeforces username.");
      return;
    }

    setError("");
    setUserData(null);

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      if (!response.ok) throw new Error("User not found or API error");

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("User Not Found");
    }
  };

  const user = userData?.result?.[0];
  const lastOnline = user?.lastOnlineTimeSeconds
    ? new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="flex flex-col items-center my-10 px-4 w-full overflow-x-auto font-sans text-gray-800">
      <div className="bg-gray-50 border border-blue-500 shadow-xl rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
          Codeforces Profile
        </h2>

        {/* Username Input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Codeforces Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchCodeforcesData}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-800 transition"
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4 font-medium">
            {error}
          </p>
        )}

        {/* Profile Card */}
        {user && (
          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={user.titlePhoto || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-blue-500 shadow"
              />
              <div>
                <h3 className="text-xl font-bold">{user.firstName || ""} {user.lastName || ""}</h3>
                <p className="text-gray-600 text-sm">@{user.handle}</p>
              </div>
            </div>

            <div className="text-sm sm:text-base space-y-1">
              <p>
                <span className="font-semibold">Current Rating:</span>{" "}
                {user.rating} ({user.rank})
              </p>
              <p>
                <span className="font-semibold">Max Rating:</span>{" "}
                {user.maxRating} ({user.maxRank})
              </p>
              <p>
                <span className="font-semibold">Contribution:</span>{" "}
                {user.contribution}
              </p>
              <p>
                <span className="font-semibold">Friends:</span>{" "}
                {user.friendOfCount}
              </p>
              <p>
                <span className="font-semibold">Organization:</span>{" "}
                {user.organization || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Last Online:</span> {lastOnline}
              </p>
            </div>

            <div className="text-center">
              <a
                href={`https://codeforces.com/profile/${user.handle}`}
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

export default CodeforcesProfile;

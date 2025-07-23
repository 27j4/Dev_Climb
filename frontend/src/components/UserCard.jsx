import axios from "axios";
import React, { useState } from "react";
import { Base_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, photoUrl, age, gender, about, skills } = user;
  const [status, setStatus] = useState(null);

  const handleFeed = async (status, userId) => {
    try {
      await axios.post(`${Base_Url}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));
      setStatus(status);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="w-full mb-5 max-w-md mx-auto mt-8 bg-white/60 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative group">
        <img
          className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
          src={photoUrl}
          alt={firstName}
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
          <h2 className="text-3xl font-bold">{firstName}, {age}</h2>
          <p className="text-sm text-gray-300">{gender}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5">
        <p className="text-gray-800 text-base">{about}</p>

        {skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={() => handleFeed("ignored", _id)}
            className="w-1/2 py-2 bg-red-500 text-white rounded-xl font-semibold transition-transform duration-300 hover:scale-105 hover:bg-red-600"
          >
            Ignore
          </button>
          <button
            onClick={() => handleFeed("interested", _id)}
            className="w-1/2 py-2 bg-green-500 text-white rounded-xl font-semibold transition-transform duration-300 hover:scale-105 hover:bg-green-600"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

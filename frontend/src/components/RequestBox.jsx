import axios from "axios";
import React from "react";
import { Base_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";

const RequestBox = ({ data }) => {
  const dispatch = useDispatch();
  const request = data.fromUserId;

  const handleRequest = async (status, id) => {
    try {
      await axios.post(
        `${Base_Url}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.error("Error handling request:", error.message);
    }
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-800  shadow-2xl rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto my-4">
      {/* Profile Image */}
      <img
        src={request.photoUrl || "https://via.placeholder.com/100"}
        alt="User"
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />

      {/* User Info */}
      <div className="flex flex-col flex-grow ml-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
          {request.firstName} {request.lastName}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Age: {request.age} | Gender: {request.gender}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleRequest("accepted", data._id)}
          className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button
          onClick={() => handleRequest("rejected", data._id)}
          className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestBox;

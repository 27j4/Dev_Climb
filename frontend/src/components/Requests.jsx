import axios from "axios";
import React, { useEffect } from "react";
import { Base_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import RequestBox from "./RequestBox";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(Base_Url + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center font-bold text-3xl my-7 text-gray-800 dark:text-white">
        No Requests Found
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="flex justify-center font-bold text-2xl md:text-3xl my-7 text-gray-900 dark:text-white">
          Requests
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-6 shadow-md rounded-md overflow-hidden px-2">
        {requests.map((request) => (
          <RequestBox key={request._id} data={request} />
        ))}
      </div>
    </>
  );
};

export default Requests;

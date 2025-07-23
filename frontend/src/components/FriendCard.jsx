import React from "react";
import { Link } from "react-router-dom";

const FriendRow = ({ connection }) => {
    const { _id, firstName, lastName, about, photoUrl } = connection;

    return (
        <div className="flex items-center bg-white shadow-2xl rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto my-4">
            {/* Profile Image */}
            <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />

            {/* User Info */}
            <div className="flex flex-col flex-grow ml-4">
                <h2 className="font-semibold text-lg text-black">{firstName} {lastName}</h2>
                <p className="text-gray-600 text-sm">{about}</p>
            </div>

            {/* Chat Button */}
            <Link to={"/chatWithFriends/" + _id}>
                <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Chat
                </button>
            </Link>
        </div>
    );
};

export default FriendRow;

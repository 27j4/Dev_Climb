import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import CodeLogo from "./CodoLogo";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${Base_Url}/logout`, {}, { withCredentials: true });
      setShow(false)
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white dark:bg-neutral text-black dark:text-white border-b dark:border-neutral-700 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={user ? "/" : "/login"} className="flex items-center space-x-2">
           <CodeLogo/>
          <span className="text-lg font-semibold tracking-wide">DevClimb</span>
        </Link>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white dark:text-white shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-sm md:text-base font-semibold">
              👋 <span className="truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">{`Welcome, ${user.firstName}`}</span>
            </div>
            <div className="relative group">
              <img
                src={user.photoUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full ring-2 ring-indigo-400 cursor-pointer"
                onClick={()=>setShow(prev=>!prev)}
              />
              { show && 
                <div className="absolute right-0 mt-3 flex flex-col bg-white dark:bg-neutral-800 shadow-lg rounded-lg w-48 z-50 p-2 text-sm">
                <Link onClick={()=>setShow(prev=>!prev)} to="/profile" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Profile Edit</Link>
                <Link onClick={()=>setShow(prev=>!prev)} to="/codechef" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">CodeChef</Link>
                <Link onClick={()=>setShow(prev=>!prev)} to="/codeforces" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Codeforces</Link>
                <Link onClick={()=>setShow(prev=>!prev)} to="/connections" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Connections</Link>
                <Link onClick={()=>setShow(prev=>!prev)} to="/requests" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Requests</Link>
                <Link onClick={()=>setShow(prev=>!prev)} to="/premium" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Premium</Link>
                <button
                  onClick={handleLogout}
                  className="text-left w-full px-3 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                >
                  Logout
                </button>
              </div>
              }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

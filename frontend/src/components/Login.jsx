import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../utils/constants';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${Base_Url}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      console.log(res.data)
      dispatch(addUser(res.data));
      console.log(res);
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      setError(error?.response?.data || 'Something went wrong');
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${Base_Url}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success('Signup Successful');
      navigate('/profile');
    } catch (error) {
      setError(error?.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 rounded-2xl shadow-lg backdrop-blur-md border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {isLoggedIn ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form className="space-y-4">
          {!isLoggedIn && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-800 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-800 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
            </>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-800 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={seePassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 pr-10 rounded-lg bg-white/90 dark:bg-gray-800 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
              <span
                onClick={() => setSeePassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={isLoggedIn ? handleLogin : handleSignup}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {isLoggedIn ? 'Login' : 'Sign Up'}
          </button>

          <p
            onClick={() => setIsLoggedIn((prev) => !prev)}
            className="text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer mt-3"
          >
            {isLoggedIn
              ? "Don't have an account? Sign up here"
              : 'Already have an account? Login here'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


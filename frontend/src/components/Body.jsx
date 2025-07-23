import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(`${Base_Url}/profile/view`, { withCredentials: true });
      dispatch(addUser(user.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate('/login');
      }
      console.error('ERROR:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 return (
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <NavBar />

    {/* Main content that grows */}
    <main className="flex-grow">
      <Outlet />
    </main>

    {/* Footer always at the bottom */}
    <footer>
      <Footer />
    </footer>
  </div>
);

};

export default Body;

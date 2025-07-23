import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { Base_Url } from "../utils/constants";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const feed = await axios.get(`${Base_Url}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data?.data));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!user) return;
  if (user.length === 0)
    return (
      <h1 className=" my-10 text-center text-2xl font-bold ">
        No New Users Found
      </h1>
    );
  return user && <UserCard user={user[0]} />;
};

export default Feed;

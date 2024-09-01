"use client";
import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/page';
import { getUser, setUser } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
 
  const dispatch = useDispatch();
  const { loading, error, isLogin, success } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await dispatch(getUser()).unwrap();
      dispatch(setUser(userData.data)) 
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchUser(); 
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h1>User DashBoard</h1>
      
    
    </div>
  );
};

export default UserProfile;

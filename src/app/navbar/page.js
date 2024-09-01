"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser, setIslogin } from "../Redux/authSlice";

const NavBar = () => {
  const router = useRouter();
  const {isLogin ,users}= useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(setIslogin(false));
      router.push("/loginPage");
    } catch (error) {
      console.error("Logout failed:", error.message);

    }
  };

  return (
    <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white text-lg font-semibold">My Website</div>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-gray-200">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
        </li>
        {isLogin ? (
          <>
            <li className="flex items-center space-x-2">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              )}
              <span className="text-white">{users?.username || "User"}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-200">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/loginPage" className="text-white hover:text-gray-200">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
  );
};

export default NavBar;

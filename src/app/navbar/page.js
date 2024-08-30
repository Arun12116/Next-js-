"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const router=useRouter();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log("Logout successful");
      router.push("/form")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">My Website</div>
        <ul className="flex space-x-4">
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
          <li>
            <Link href="/loginPage" className="text-white hover:text-gray-200">
            <button onClick={handleLogout}>
            {isAuthenticated ? "login" : "logout"}

            </button>
             
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

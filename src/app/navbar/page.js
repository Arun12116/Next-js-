
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser, setIslogin, updateUserProfile } from "../Redux/authSlice";

const NavBar = () => {
  const router = useRouter();
  const { isLogin, users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setIslogin(true));
      dispatch(getUser());
    } else {
      dispatch(setIslogin(false));
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem("token");
      dispatch(setIslogin(false));
      router.push("/loginPage");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      dispatch(getUser()); 
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  return (
    <>
      <nav className="bg-blue-500 p-4 relative">
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
                <li
                  className="relative flex items-center space-x-2 cursor-pointer"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  {users?.profilePicture ? (
                    <img
                      src={users.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  )}
                  <span className="text-white">{users?.username || "User"}</span>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed right-0 top-16 w-64 bg-white shadow-lg rounded-lg border border-gray-300 transition-transform transform translate-x-0 ease-in-out duration-300 z-50">
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Profile Options</h2>
                        <label className="block mb-2">
                          <span className="text-blue-500 cursor-pointer hover:underline">
                            Upload Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-2 w-full text-gray-600 hidden"
                          />
                        </label>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2 w-sm"
                        >
                          Logout
                        </button>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      >
                        &times;
                      </button>
                    </div>
                  )}
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
    </>
  );
};

export default NavBar;

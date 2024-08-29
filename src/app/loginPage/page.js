"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import NavBar from "../navbar/page";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Dispatch login action and wait for it to complete
      await dispatch(loginUser(data)).unwrap();

      // Check if authentication was successful
      if (isAuthenticated) {
        router.push("/about");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            User Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "Please enter your email",
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Please enter your password",
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-700 mt-2">{error}</p>}

          <p className="mt-4 text-sm text-gray-600">
            Not registered?{" "}
            <Link href="/form" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

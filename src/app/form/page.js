"use client"; 

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";
import NavBar from "../navbar/page";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner"; 

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      console.log("token", resultAction);
      router.push("/loginPage");
    } catch (err) {
      console.error("Registration failed:", err);
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
            User Registration Form
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              {...register("username", {
                required: "Please enter your full name",
              })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-700 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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

          {loading && (
            <div className="flex justify-center mb-4">
              <TailSpin
                height="50"
                width="50"
                color="#4A90E2"
                ariaLabel="loading"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          >
            Register
          </button>

          {error && (
            <p className="text-red-700 text-sm mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;

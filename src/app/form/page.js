"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";
import NavBar from "../navbar/page";
import { useRouter } from "next/navigation";

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
  const confirmPassword = watch("confirm_password");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      console.log("token", resultAction);
      // Check if the registration was successful
      router.push("/loginPage");
    } catch (err) {
      // Handle errors, if any
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
            {errors.full_name && (
              <p className="text-red-700 text-sm mt-1">
                {errors.full_name.message}
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

          {/* <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>

          {loading && <p className="mt-2">Loading...</p>}
          {error && <p className="text-red-700 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyUserEmail } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
const VerifyUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleVerifyClick = async () => {
    const token = searchParams.get("token");
    console.log("token", token);

    if (token) {
      try {
        setLoading(true);
        const resultAction = await dispatch(verifyUserEmail(token));
        if (verifyUserEmail.fulfilled.match(resultAction)) {
          setMessage("Email verified successfully!");
          setTimeout(() => {
            router.push("/loginPage");
          }, 3000);
        } else {
          setMessage("Email verification failed.");
        }
      } catch (error) {
        setMessage("An error occurred during email verification.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Invalid or missing token.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Email Verification
        </h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={handleVerifyClick}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice"; // Ensure the path is correct and consistent
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    // addUser: userReducer,
    auth: authReducer,
  },
});

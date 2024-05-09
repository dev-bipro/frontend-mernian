import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "../features/user/loginUserSlice";

export const store = configureStore({
  reducer: {
    loginUser: loginUserReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = loginUserSlice.actions;

export default loginUserSlice.reducer;

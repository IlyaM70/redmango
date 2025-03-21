import { createSlice } from "@reduxjs/toolkit";
import { userInterface } from "../../Interfaces";

export const emptyUserState: userInterface = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
  name: "UserAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;

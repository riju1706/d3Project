import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "USER_LIST",
  initialState: [
    { id: "", employee_name: "", employee_salary: "", employee_age: "" },
  ],
  reducers: {
    allUser(state, action) {
      return action.payload;
    },
    addUserOne(state, action) {
      return [...state, action.payload];
    },
  },
});
export const userReducer = userSlice.reducer;
export const { allUser, addUserOne } = userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const personalData = createSlice({
  name: "personalData",
  initialState: {
    name: "",
    last_name: "",
    email: "",
    phone: "",
    mxnUSDPrice: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    setMxnUSDPrice: (state, action) => {
      state.mxnUSDPrice = action.payload.mxnUSDPrice;
    },
  },
});

export const { setUserData, setMxnUSDPrice } = personalData.actions;

export default personalData.reducer;

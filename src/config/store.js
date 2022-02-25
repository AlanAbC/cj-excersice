import { configureStore } from "@reduxjs/toolkit";
import personalDataReducer from "../reducers/personalData";

export default configureStore({
  reducer: {
    personalData: personalDataReducer,
  },
});

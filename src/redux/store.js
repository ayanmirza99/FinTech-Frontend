import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/slice";

export default configureStore({
  reducer: {
    auth,
  },
});

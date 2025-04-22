// import { AUTH_ME } from "../../../apiService/apiDeclaration";
// import { createAsyncThunk } from "@reduxjs/toolkit";

import { AUTH_ME } from "@/api/apiDeclaration";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  AUTH_ME
);
// export const signUp = createAsyncThunk('auth/signUp', SIGN_UP);
// export const verifyOTPAction = createAsyncThunk('auth/otp', VERIFY_OTP_LOGIN);

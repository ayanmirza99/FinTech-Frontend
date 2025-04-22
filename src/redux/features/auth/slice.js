import { constants } from "@/constants";
import { clearStorage, retrieveData } from "@/helper/storageHelper";
import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser } from "./actions";
// import { getLoggedInUser } from "./actions";

const initialState = {
  user: null,
  token: retrieveData(constants.authToken),
  status: {
    user: { loading: true, errorMessage: "", successMessage: "" },
    join: { loading: false, errorMessage: "", successMessage: "" },
    signIn: { loading: false, errorMessage: "", successMessage: "" },
  },
  //   notifications: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    signOut: (state) => {
      state.user = null;
      clearStorage();
      state.token = "";
    },
    setToken: (state, payload) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUser.pending, (state) => {
        state.status.user.loading = true;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.status.user.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.status.user.loading = false;
        state.status.user.errorMessage = action.error.message;
      });
    // postOTPVerification
    //   .addCase(verifyOTPAction.pending, (state) => {
    //     state.status.signIn.loading = true;
    //   })
    //   .addCase(verifyOTPAction.fulfilled, (state, action) => {
    //     state.status.signIn.loading = false;
    //     if (action.payload.data.token) {
    //       state.token = action.payload.data.token;
    //       storeData(constants.authToken, action.payload.data.token);
    //     }
    //     state.status.signIn.successMessage = action.payload.message;
    //   })
    //   .addCase(verifyOTPAction.rejected, (state, action) => {
    //     state.status.signIn.loading = false;
    //     state.status.signIn.errorMessage = action.error.message;
    //   });
  },
});

export const { reset, signOut, setToken } = authSlice.actions;

export default authSlice.reducer;

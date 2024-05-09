/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface initialState {
  balance: number;
  loading: boolean;
  error: string;
  success: boolean;
}

const initialState: initialState = {
  balance: 0,
  loading: false,
  error: "",
  success: false,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGuestBalance.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestBalance.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestBalance.pending, (state) => {
      state.loading = true;
    });
  },
});

export const getGuestBalance = createAsyncThunk(
  "guest/guestBalance",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/guest/guestbalance`,
      {
        headers: {
          guestId,
          token,
        },
      }
    );
    return response.data;
  }
);

export default balanceSlice.reducer;

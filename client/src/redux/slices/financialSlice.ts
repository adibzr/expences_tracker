/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialState {
  income: number;
  expenses: number;
  balance: number;
  loading: boolean;
  error: string;
  success: boolean;
}
const initialState: initialState = {
  income: 0,
  expenses: 0,
  balance: 0,
  loading: false,
  error: "",
  success: false,
};

const financialSlice = createSlice({
  name: "financial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getUserBalance.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getUserBalance.pending, (state) => {
      state.loading = true;
    });
    // builder.addCase(getGuestBalance.fulfilled, (state, action) => {
    //   state.balance = action.payload.balance;
    //   state.loading = false;
    //   state.success = true;
    // });
    // builder.addCase(getGuestBalance.rejected, (state, action) => {
    //   state.error = action.payload as string;
    //   state.loading = false;
    //   state.success = false;
    // });
    // builder.addCase(getGuestBalance.pending, (state) => {
    //   state.loading = true;
    // });
  },
});

export const getUserBalance = createAsyncThunk(
  "expense/balance",
  async (
    { userId, token }: { userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/userbalance",
        {
          headers: {
            userId,
            token: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getGuestBalance = createAsyncThunk(
  "expense/balance",
  async (
    { guestId, token }: { guestId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/guest/guestbalance",
        {
          headers: {
            guestId,
            token: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default financialSlice.reducer;

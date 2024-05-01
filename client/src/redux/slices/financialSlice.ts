/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface expense {
  date: Date;
  amount: number;
  description: string;
  categoryId: string;
  attachment: string;
}

interface initialState {
  balance: number | null;
  loading: boolean;
  error: string;
  success: boolean;
  expense: expense[];
  totalExpense: number | null;
}

const initialState: initialState = {
  balance: null,
  loading: false,
  error: "",
  success: false,
  expense: [],
  totalExpense: null,
};

const financialSlice = createSlice({
  name: "financial",
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

    builder.addCase(getGuestExpense.fulfilled, (state, action) => {
      state.expense = action.payload.expense;
      state.totalExpense = action.payload.expense.reduce(
        (sum: number, curr: { amount: number }) => sum + curr.amount,
        0
      );
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestExpense.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestExpense.pending, (state) => {
      state.loading = true;
    });
  },
});

export const getGuestBalance = createAsyncThunk(
  "expense/guestBalance",
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
export const getGuestExpense = createAsyncThunk(
  "expense/guestExpense",
  async (
    { guestId, token }: { guestId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/expense/guestexpense",
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

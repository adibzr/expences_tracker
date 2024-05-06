/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";
import data, { dataType } from "./../../components/expenses/Expenses";

interface expense {
  date: Date;
  amount: number;
  description: string;
  categoryId: string;
  attachment: string;
}

interface initialState {
  balance: number;
  loading: boolean;
  error: string;
  success: boolean;
  expense: expense[];
  totalExpense: number | null;
}

const initialState: initialState = {
  balance: 0,
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
    builder.addCase(postGuestExpense.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(postGuestExpense.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(postGuestExpense.pending, (state) => {
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
export const getGuestExpense = createAsyncThunk(
  "guest/guestExpense",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/expense/guestexpense`,
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

export const postGuestExpense = createAsyncThunk(
  "guest/postExpense",
  async (data: dataType, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guestId } = (getState() as { userAuth: UserState }).userAuth;
    const { foundCategory, date, description, amount, wallet } = data;
    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/expense/addGuestExpense`,
      {
        guestId,
        categoryId: foundCategory._id,
        date,
        description,
        amount,
        wallet,
      },
      {
        headers: {
          token,
        },
      }
    );
    return response.data;
  }
);

export default financialSlice.reducer;

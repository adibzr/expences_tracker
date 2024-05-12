/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { inputsDataState } from "../../components/inputs/types";
import { UserState } from "./userAuthSlice";

interface expense {
  _id: string;
  date: Date;
  amount: number;
  description: string;
  category: string;
  attachment: string;
  created_at: Date;
}

interface initialState {
  loading: boolean;
  error: string;
  success: boolean;
  expense: expense[];
  totalExpense: number | null;
}

const initialState: initialState = {
  loading: false,
  error: "",
  success: false,
  expense: [],
  totalExpense: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  async (data: inputsDataState, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guestId } = (getState() as { userAuth: UserState }).userAuth;
    const { category, date, description, amount } = data;
    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/expense/addGuestExpense`,
      {
        guestId,
        categoryId: category,
        date,
        description,
        amount,
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

export default expenseSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { inputsDataState } from "../../components/inputs/types";
import { UserState } from "./userAuthSlice";

interface expenseType {
  totalExpense: number;
  success: boolean;
  expense: {
    _id: string;
    amount: number;
    date: Date;
    paymentSource: {
      kind: "bank" | "wallet";
      item: string;
    };
    category: string;
    description: string;
    createdAt: Date;
  }[];
}

interface initialState {
  loading: boolean;
  success: boolean;
  error: string;
  expense: expenseType["expense"];
  totalExpense: number;
}

const initialState: initialState = {
  loading: false,
  error: "",
  success: false,
  expense: [],
  totalExpense: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGuestExpense.fulfilled,
      (state, action: PayloadAction<expenseType>) => {
        state.totalExpense = action.payload.totalExpense;
        state.expense = action.payload.expense;
        state.loading = false;
        state.success = true;
      }
    );
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
    const { guest } = (getState() as { userAuth: UserState }).userAuth;
    const { category, date, description, amount } = data;
    let bankData: string | undefined = data.bank;
    let wallet;
    if (guest.wallet === bankData) {
      wallet = bankData;
      bankData = undefined;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/expense/addguestexpense`,
      {
        guestId: guest._id,
        amount,
        description,
        category,
        date,
        bank: bankData,
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

export default expenseSlice.reducer;

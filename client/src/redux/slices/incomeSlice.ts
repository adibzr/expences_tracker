/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { inputsDataState } from "../../components/inputs/types";
import { UserState } from "./userAuthSlice";

interface incomeType {
  totalIncome: number;
  success: boolean;
  income: {
    _id: string;
    amount: number;
    date: Date;
    paymentSource: {
      kind: "bank" | "wallet";
      item: string;
    };
    category: string;
    description: string;
    created_at: Date;
  }[];
}

interface initialState {
  loading: boolean;
  success: boolean;
  error: string;
  income: incomeType["income"];
  totalIncome: number;
}

const initialState: initialState = {
  loading: false,
  success: false,
  error: "",
  income: [],
  totalIncome: 0,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGuestIncome.fulfilled,
      (state, action: PayloadAction<incomeType>) => {
        state.totalIncome = action.payload.totalIncome;
        state.income = action.payload.income;
        state.loading = false;
        state.success = true;
      }
    );
    builder.addCase(getGuestIncome.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestIncome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postGuestIncome.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(postGuestIncome.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(postGuestIncome.pending, (state) => {
      state.loading = true;
    });
  },
});

export const getGuestIncome = createAsyncThunk(
  "guest/guestincome",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/income/guestincome`,
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
export const postGuestIncome = createAsyncThunk(
  "guest/postIcome",
  async (data: inputsDataState, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guestId } = (getState() as { userAuth: UserState }).userAuth;
    const { category, date, description, amount, bank, wallet } = data;
    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/income/addguestincome`,
      {
        guestId,
        category,
        amount,
        date,
        bank,
        wallet,
        description,
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
//TODO: implemet wallet in the backend

export default incomeSlice.reducer;

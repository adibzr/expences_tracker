/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { inputsDataState } from "../../components/inputs/types";
import { UserState } from "./userAuthSlice";
import dayjs from "dayjs";

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
    createdAt: Date;
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
      state.error = action.error.message as string;
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
      state.error = action.error.message as string;
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
    const response = await axios
      .get(`${import.meta.env.VITE_BASEURL}/income/guestincome`, {
        headers: {
          guestId,
          token,
        },
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
    return response.data;
  }
);
export const postGuestIncome = createAsyncThunk(
  "guest/postIcome",
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

    const response = await axios
      .post(
        `${import.meta.env.VITE_BASEURL}/income/addguestincome`,
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
      )
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
    return response.data;
  }
);
export default incomeSlice.reducer;

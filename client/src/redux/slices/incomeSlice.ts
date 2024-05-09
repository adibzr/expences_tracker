/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dataType } from "../../components/income/Income";
import { UserState } from "./userAuthSlice";

interface bank {
  title: string;
  logo: string;
  amount: number;
  created_at: Date;
}

interface wallet {
  amount: number;
  created_at: Date;
}

interface initialState {
  loading: boolean;
  error: string;
  success: boolean;
  bank: bank[];
  wallet: bank[];
  totalincome: number | null;
}

const initialState: initialState = {
  loading: false,
  error: "",
  success: false,
  bank: [],
  wallet: [],
  totalincome: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGuestincome.fulfilled, (state, action) => {
      state.totalincome = action.payload.guestFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestincome.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestincome.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getGuestWallet.fulfilled, (state, action) => {
      state.wallet = action.payload.guestFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestWallet.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestWallet.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getGuestBank.fulfilled, (state, action) => {
      state.bank = action.payload.guestFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestBank.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestBank.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postGuestBank.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(postGuestBank.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(postGuestBank.pending, (state) => {
      state.loading = true;
    });
  },
});

export const getGuestincome = createAsyncThunk(
  "guest/guestincome",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/funds/guestfund`,
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
export const getGuestBank = createAsyncThunk(
  "guest/guestBank",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/funds/guestbankfund`,
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
export const getGuestWallet = createAsyncThunk(
  "guest/guestwallet",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/funds/guestwalletfund`,
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

export const postGuestBank = createAsyncThunk(
  "guest/postincome",
  async (data: dataType, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guestId } = (getState() as { userAuth: UserState }).userAuth;
    const { foundCategory, bankId, description, date, amount, logo, title } =
      data;
    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/funds/addGuestincome`,
      {
        category: foundCategory,
        guestId,
        bankId,
        description,
        date,
        amount,
        logo,
        title,
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

export default incomeSlice.reducer;

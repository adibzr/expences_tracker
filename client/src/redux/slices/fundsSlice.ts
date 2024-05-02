/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface bank {
  title: string;
  logo: string;
  amount: number;
  created_at: string;
}
interface wallet {
  amount: number;
  created_at: string;
}

interface initialState {
  bankIncome: bank[];
  walletIncome: wallet[];
  loading: boolean;
  success: boolean;
  totalFunds: number | null;
}

const initialState: initialState = {
  bankIncome: [],
  walletIncome: [],
  loading: false,
  success: false,
  totalFunds: null,
};

const financialSlice = createSlice({
  name: "funds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGuestBank.fulfilled, (state, action) => {
      state.bankIncome = action.payload.bankFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestBank.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestBank.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGuestWallet.fulfilled, (state, action) => {
      state.bankIncome = action.payload.walletFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestWallet.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestWallet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGuestFunds.fulfilled, (state, action) => {
      state.totalFunds = action.payload.guestFund;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getGuestFunds.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getGuestFunds.pending, (state) => {
      state.loading = true;
    });
  },
});

export const getGuestBank = createAsyncThunk(
  "funds/guestBank",
  async (
    { guestId, token }: { guestId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/funds/guestbankfund",
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
export const getGuestWallet = createAsyncThunk(
  "funds/guestWallet",
  async (
    { guestId, token }: { guestId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/funds/guestwalletfund",
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
export const getGuestFunds = createAsyncThunk(
  "funds/guestFunds",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get("http://localhost:5000/funds/guestfund", {
      headers: {
        guestId,
        token,
      },
    });
    return response.data;
  }
);

export default financialSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface upateDataType {
  type: string;
  id: string;
  updatedData: {
    amount: number;
    description?: string;
    category: string;
    date?: string;
    bank?: string;
    wallet?: string;
  };
}
interface initialState {
  loading: boolean;
  error: string;
  success: boolean;
}

const initialState: initialState = {
  loading: false,
  error: "",
  success: false,
};

const trasactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTrasaction.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteTrasaction.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(deleteTrasaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTrasaction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTrasaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTrasaction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const deleteTrasaction = createAsyncThunk(
  "transaction/Delete",
  async ({ id, type }: { id: string; type: string }, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.delete(
      `${import.meta.env.VITE_BASEURL}/transaction/deleteguesttransaction`,
      {
        headers: {
          token,
        },
        data: {
          guestId,
          id,
          type,
        },
      }
    );
    return response.data;
  }
);
export const updateTrasaction = createAsyncThunk(
  "transaction/Update",
  async ({ id, type, updatedData }: upateDataType, { getState }) => {
    const { guest, token } = (getState() as { userAuth: UserState }).userAuth;
    let bankData: string | undefined = updatedData.bank;
    let wallet: string | undefined = undefined;
    if (guest.wallet === bankData) {
      wallet = bankData;
      bankData = undefined;
    }
    const response = await axios.put(
      `${import.meta.env.VITE_BASEURL}/transaction/updateguesttransaction`,
      {
        id,
        type,
        updatedData,
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

export default trasactionSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

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

export default trasactionSlice.reducer;

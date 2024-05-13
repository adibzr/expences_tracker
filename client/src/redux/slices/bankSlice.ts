import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface payloadType {
  success: boolean;
  bank: {
    _id: string;
    title: string;
    logo: string;
    created_at: Date;
  }[];
}

export interface initialState {
  loading: boolean;
  error: string;
  bank: payloadType["bank"];
}

const initialState: initialState = {
  loading: false,
  error: "",
  bank: [],
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGuestBank.fulfilled,
      (state, action: PayloadAction<payloadType>) => {
        state.bank = action.payload.bank;
        state.loading = false;
      }
    );
    builder.addCase(getGuestBank.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGuestBank.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const getGuestBank = createAsyncThunk(
  "guest/getBank",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;

    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/guest/getguestbank`,
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

export default bankSlice.reducer;

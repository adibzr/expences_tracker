import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  user: {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
    token: string | null;
  } | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://shiny-adventure-vrxxjv4vjrxf6wwg-5000.app.github.dev/user/login",
        { email, password }
      );

      if (response.status !== 200) {
        throw new Error("Request failed with status: " + response.status);
      }

      return response.data;
    } catch (error) {
      throw error || "something went wrong";
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserStart: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

export const { loginUserStart, loginUserSuccess, loginUserFailure } =
  userSlice.actions;

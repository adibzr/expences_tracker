/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type user = {
  fullname: string;
  email: string;
  password: string;
};
export interface UserState {
  loading: boolean;
  user: user | null;
  userToken: string | undefined;
  error: string | undefined;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  userToken: undefined,
  error: undefined,
  success: false,
};

//===========slice=================
const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<user>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      const errorMessage = action.payload as string;
      state.error = errorMessage;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<user>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      const errorMessage = action.payload as string;
      state.error = errorMessage;
    });
  },
});

//===========action=================
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        config
      );
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }
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
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ fullname, email, password }: user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/user/register",
        {
          email,
          fullname,
          password,
        },
        config
      );
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }
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

export default userAuthSlice.reducer;

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
  userId: string;
  guestId: string;
  token: string | undefined;
  error: string;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  userId: "",
  guestId: "",
  token: undefined,
  error: "",
  success: false,
};

//===========slice=================
const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = undefined;
      state.success = false;
      state.error = "";
      state.loading = false;
      localStorage.removeItem("jwtToken");
      window.location.reload();
    },
    guest: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.token = undefined;
      state.error = "";
      state.success = false;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<user>) => {
        state.loading = false;
        state.success = true;
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
      state.user = null;
      state.token = undefined;
      state.error = "";
      state.success = false;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<user>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      const errorMessage = action.payload as string;
      state.error = errorMessage;
    });
    builder.addCase(
      registerGuest.fulfilled,
      (state, action: PayloadAction<{ guestId: string; token: string }>) => {
        state.guestId = action.payload.guestId;
        state.token = action.payload.token;
      }
    );
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
export const registerGuest = createAsyncThunk("guest/postGuest", async () => {
  const response = await axios.post("http://localhost:5000/guest/guest");
  return response.data;
});

export default userAuthSlice.reducer;

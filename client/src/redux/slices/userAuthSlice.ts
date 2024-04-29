/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";

type user = {
  fullname: string;
  email: string;
  password: string;
};
export interface UserState {
  loading: boolean;
  user: user | null;
  userId?: string;
  userToken: string | undefined;
  error: string;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  userId: "",
  userToken: undefined,
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
      state.userToken = undefined;
      state.success = false;
      state.error = "";
      state.loading = false;
      localStorage.removeItem("jwtToken");
      window.location.reload();
    },
    guest: (state, action) => {
      state.userId = action.payload.userId;
      state.userToken = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.userToken = undefined;
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
      state.userToken = undefined;
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
export const setGuestCredentials = (
  userId: string,
  token: string
): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/user/guest");
      dispatch(guest({ userId, token }));
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }
      if (response.data._id) {
        localStorage.setItem("userId", response.data._id);
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const { logout, guest } = userAuthSlice.actions;

export default userAuthSlice.reducer;

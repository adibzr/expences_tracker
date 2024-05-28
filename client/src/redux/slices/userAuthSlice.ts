/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type userType = {
  fullname: string;
  email: string;
  password: string;
};
interface guestType {
  _id: string;
  bank: string[];
  wallet: string;
  expense: string[];
  income: string[];
  budget: string;
  createdAt?: Date;
}
export interface UserState {
  loading: boolean;
  user: userType | null;
  userId: string;
  guestId: string;
  guest: guestType;
  token: string | undefined;
  error: string;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  userId: "",
  guestId: "",
  guest: {
    _id: "",
    bank: [],
    wallet: "",
    expense: [],
    income: [],
    budget: "",
  },
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
      (state, action: PayloadAction<userType>) => {
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
      (state, action: PayloadAction<userType>) => {
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
      (state, action: PayloadAction<{ guest: guestType; token: string }>) => {
        state.guest = action.payload.guest;
        state.guestId = action.payload.guest._id;
        state.token = action.payload.token;
      }
    );
    builder.addCase(getGuest.fulfilled, (state, action) => {
      state.guest = action.payload.guest;
      state.loading = false;
    });
    builder.addCase(getGuest.pending, (state) => {
      state.loading = true;
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
        `${import.meta.env.VITE_BASEURL}/user/login`,
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
  async ({ fullname, email, password }: userType, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/register`,
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
  const response = await axios.post(
    `${import.meta.env.VITE_BASEURL}/guest/guest`
  );
  return response.data;
});

export const getGuest = createAsyncThunk(
  "guest/getGuest",
  async (_, { getState }) => {
    const { guestId, token } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/guest/getguest`,
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

export default userAuthSlice.reducer;

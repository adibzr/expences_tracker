import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface BudgetState {
  budget: IBudget[];
  loading: boolean;
  error: string;
}

interface IBudget {
  _id?: string;
  category: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: [] as IBudget[],
    loading: false,
    error: "",
  } as BudgetState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBudgets.fulfilled, (state, action) => {
      state.budget = action.payload.budget;
      state.loading = false;
    });
    builder.addCase(getBudgets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBudgets.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(postBudget.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postBudget.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(postBudget.pending, (state) => {
      state.loading = true;
    });
  },
});

export const postBudget = createAsyncThunk(
  "budget/post",

  async (data: IBudget, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guest } = (getState() as { userAuth: UserState }).userAuth;
    const { category, amount } = data;

    const response = await axios
      .post(
        `${import.meta.env.VITE_BASEURL}/budget/postbudget`,
        {
          guestId: guest._id,
          amount,
          category,
        },
        {
          headers: {
            token,
          },
        }
      )
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
    return response.data;
  }
);
export const getBudgets = createAsyncThunk(
  "budget/get",

  async (_, { getState }) => {
    const { token } = (getState() as { userAuth: UserState }).userAuth;
    const { guest } = (getState() as { userAuth: UserState }).userAuth;
    const response = await axios
      .get(`${import.meta.env.VITE_BASEURL}/budget/getbudget`, {
        headers: {
          token,
          guestid: guest._id,
        },
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
    return response.data;
  }
);

export default budgetSlice.reducer;

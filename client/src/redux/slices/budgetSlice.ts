import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./userAuthSlice";

interface BudgetState {
  budget: IBudget[];
  loading: boolean;
  error: string;
}

interface IBudget {
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
    // builder.addCase(getBudgets.fulfilled, (state, action) => {
    //   state.budget = action.payload.budget;
    //   state.loading = false;
    // });
    // builder.addCase(getBudgets.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(getBudgets.rejected, (state, action) => {
    //   state.error = action.payload as string;
    //   state.loading = false;
    // });
    builder.addCase(postBudget.fulfilled, (state, action) => {
      state.budget.push(action.payload);
      state.loading = false;
    });
    builder.addCase(postBudget.rejected, (state, action) => {
      state.error = action.payload as string;
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

    const response = await axios.post(
      `${import.meta.env.VITE_BASEURL}/budget/postBudget`,
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
    );
    return response.data;
  }
);

export default budgetSlice.reducer;

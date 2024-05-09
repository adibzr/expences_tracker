/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Icon {
  data: { data: number[] };
  iconColor: string;
  title: string;
  contentType: string;
}
export interface catInitialState {
  expenseCategories: { _id: string; title: string; icon: Icon }[];
  fundCategories: { _id: string; title: string; icon: Icon }[];
  loading: boolean;
}

const initialState: catInitialState = {
  expenseCategories: [],
  fundCategories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.expenseCategories = action.payload.expenseCategories;
      state.fundCategories = action.payload.fundCategories;
      state.loading = false;
    });
  },
});

export const getCategories = createAsyncThunk("categories/get", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASEURL}/category/getcategory`
  );
  return response.data;
});

export default categoriesSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Icon {
  data: { data: number[] };
  iconColor: string;
  title: string;
  contentType: string;
}

export interface cat {
  _id: string;
  title: string;
  icon: Icon;
  type: string;
}
export interface catInitialState {
  categories: cat[];
  loading: boolean;
}

const initialState: catInitialState = {
  categories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialState {
  categories: { _id: string; title: string; __v: number }[];
}

const initialState: initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
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

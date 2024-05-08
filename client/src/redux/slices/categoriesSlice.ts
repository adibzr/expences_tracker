/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Icon {
  data: { data: number[] };
  iconColor: string;
  title: string;
  contentType: string;
}
interface initialState {
  categories: { _id: string; title: string; icon: Icon }[];
  loading: boolean;
}

const initialState: initialState = {
  categories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
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

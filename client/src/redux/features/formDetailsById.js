import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  form: null,
  loading: "idle",
  error: null,
};

export const fetchFormDetailsById = createAsyncThunk(
  "form/fetchById",
  async (id) => {
    const response = await axios.get(
      `https://form-app-server.onrender.com/test/form/list/${id}`
    );
    return response.data.form;
  }
);

const formDetailsByIdSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormDetailsById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFormDetailsById.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.form = action.payload;
      })
      .addCase(fetchFormDetailsById.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default formDetailsByIdSlice.reducer;

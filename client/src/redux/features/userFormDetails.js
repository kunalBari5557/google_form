import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDynamicData = createAsyncThunk(
  "api/fetchDynamicData",
  async (apiEndpoint) => {
    const response = await fetch("http://localhost:4000/test/list");
    return response.json();
  }
);

export const userFormDetailsSlice = createSlice({
  name: "api",
  initialState: {
    loading: "idle",
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchDynamicData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDynamicData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default userFormDetailsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createByAdminForm = createAsyncThunk("api/fetchData", async () => {
  const response = await fetch("http://localhost:4000/test/form/list");
  return response.json();
});

const createByAdminFormSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createByAdminForm.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createByAdminForm.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(createByAdminForm.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message; // You can customize error handling here
      });
  },
});

export default createByAdminFormSlice.reducer;

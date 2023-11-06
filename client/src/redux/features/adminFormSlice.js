import { createSlice } from "@reduxjs/toolkit";

const addFormDataSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setData, setError } = addFormDataSlice.actions;

export default addFormDataSlice.reducer;

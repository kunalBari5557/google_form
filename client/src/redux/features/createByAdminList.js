// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const createByAdminForm = createAsyncThunk("users/createByAdminForm", async () => {
//   const response = await fetch("http://localhost:4000/test/form/list");
//   const data = await response.json();
//   return data;
// });

//  const createByAdminFormSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [], // Make sure to include an empty array here
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createByAdminForm.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createByAdminForm.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.users = action.payload;
//         console.log("Success response:", action.payload);
//       })
//       .addCase(createByAdminForm.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default createByAdminFormSlice.reducer;


// apiSlice.js
// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an asynchronous thunk for fetching data
export const createByAdminForm = createAsyncThunk('api/fetchData', async () => {
  const response = await fetch('http://localhost:4000/test/form/list');
  return response.json();
});

const createByAdminFormSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    loading: 'idle', // 'idle' is a special value in Redux Toolkit for initial state
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createByAdminForm.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createByAdminForm.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(createByAdminForm.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message; // You can customize error handling here
      });
  },
});

export default createByAdminFormSlice.reducer;


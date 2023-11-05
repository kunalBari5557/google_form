

// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   formData: {},
// };


// export const userAddFormData = createAsyncThunk(
//   'userFillFormDetails/userAddFormData',
//   async ({ formId, body }, thunkAPI) => {
//     try {
//       const response = await axios.post(`http://localhost:4000/test/add`, body);
//       return response.data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const userFillFormDetailsSlice = createSlice({
//   name: 'userFillFormDetails',
//   initialState,
//   reducers: {
//     setFormData: (state, action) => {
//       state.formData = action.payload;
//     },
//     setUserError: (state, action) => {
//         state.error = action.payload;
//       },
//   },
// });

// export const { setFormData,setUserError } = userFillFormDetailsSlice.actions;
// export default userFillFormDetailsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    formData: {},
    error: null, // Initialize error state
};

export const userAddFormData = createAsyncThunk(
    'userFillFormDetails/userAddFormData',
    async ({ formId, body }, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4000/test/add`, body);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userFillFormDetailsSlice = createSlice({
    name: 'userFillFormDetails',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { formId, value, responseId, optionValue } = action.payload;

            if (responseId) {
                if (!state.formData[formId]) state.formData[formId] = {};
                state.formData[formId][responseId] = optionValue;
            } else {
                state.formData[formId] = value;
            }
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setFormData, setUserError } = userFillFormDetailsSlice.actions;
export default userFillFormDetailsSlice.reducer;

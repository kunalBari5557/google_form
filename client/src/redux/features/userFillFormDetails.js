import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    formData: {
        title: '',
        description: '',
        responses: [
            {
                fieldType: '',
                question: '',
                options: [''],
                isRequired: false,
            },
        ],
    },
    displayedData: [],
    errors: {
        titleError: false,
        descriptionError: false,
        responsesError: [false],
    }
};

const API_BASE_URL = 'http://localhost:4000';

export const userAddFormData = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/test/add`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const userAddFormDataSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setDisplayedData: (state, action) => {
            state.displayedData.push(action.payload);
        },
        resetForm: (state) => {
            state.formData = initialState.formData;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
});

export const { setFormData, setDisplayedData, resetForm, setErrors } = userAddFormDataSlice.actions;
export default userAddFormDataSlice.reducer;

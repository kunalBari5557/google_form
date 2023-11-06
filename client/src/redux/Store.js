import { configureStore } from "@reduxjs/toolkit";
import addFormDataSlice from "./features/adminFormSlice";
import createByAdminFormSlice from "./features/createByAdminList";
import formDetailsByIdSlice from "./features/formDetailsById";
import userFormDetailsSlice from "./features/userFormDetails";

const store = configureStore({
  reducer: {
    addFormDataState: addFormDataSlice,
    createByAdminFormState: createByAdminFormSlice,
    formDetailsByIdState: formDetailsByIdSlice,
    userFormDetails: userFormDetailsSlice,
  },
});

export default store;

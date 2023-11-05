import { configureStore } from "@reduxjs/toolkit";
import addFormDataSlice from "./features/adminFormSlice";
import createByAdminFormSlice from "./features/createByAdminList";
import formDetailsByIdSlice from "./features/formDetailsById";
import userFillFormDetailsSlice from "./features/userFillFormDetails";

const store = configureStore({
  reducer: {
    addFormDataState: addFormDataSlice,
    userFillFormDetailsState: userFillFormDetailsSlice,
    createByAdminFormState: createByAdminFormSlice,
    formDetailsByIdState: formDetailsByIdSlice,
  },
});

export default store;
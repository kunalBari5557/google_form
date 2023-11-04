import { configureStore } from "@reduxjs/toolkit";
import addFormDataSlice  from "./features/adminFormSlice";
import createByAdminFormSlice  from "./features/createByAdminList";
import  formDetailsByIdSlice  from "./features/formDetailsById";

const store = configureStore({
  reducer: {
    addFormDataState: addFormDataSlice,
    createByAdminFormState: createByAdminFormSlice,
    formDetailsByIdState: formDetailsByIdSlice,
  },
});

export default store;
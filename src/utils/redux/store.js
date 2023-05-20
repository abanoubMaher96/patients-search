import { configureStore } from "@reduxjs/toolkit";
import patientsSlice from "./patientsSlice";
import patientsSearchSlice from "./patientsSearchSlice";
const store = configureStore({
  reducer: {
    patientsList: patientsSlice,
    patientsSearch: patientsSearchSlice,
  },
});

export default store;

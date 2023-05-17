import { configureStore } from "@reduxjs/toolkit";
import patientsSlice from "./patientsSlice";
import patientsSearchSlice from "./patientsSearchSlice";
const store = configureStore({
  reducer: {
    patientsList: patientsSlice.reducer,
    patientsSearch: patientsSearchSlice.reducer,
  },
});

export default store;

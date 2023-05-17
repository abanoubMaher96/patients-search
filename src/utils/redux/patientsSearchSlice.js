import { createSlice } from "@reduxjs/toolkit";

const patientsSearchSlice = createSlice({
  name: "patientsSearch",
  initialState: { patientInfo: "", age: "", sex: "", sorting: "1" },

  reducers: {
    setPatientInfo: (state, action) => {
      state.patientInfo = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setSex: (state, action) => {
      state.sex = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export default patientsSearchSlice;

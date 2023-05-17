import { createSlice } from "@reduxjs/toolkit";
import patientsMockData from "../../assets/mock_data.json";

let result = patientsMockData.map((a) => a.patient_id);
const patientsSlice = createSlice({
  name: "patientsList",
  initialState: {
    patientsListIds: [...result],
  },
  reducers: {
    removeFromList: (state, action) => {
      const indexOfId = state.patientsListIds.indexOf(action.payload);
      state.patientsListIds.splice(indexOfId, 1);
    },
    updateList: (state, action) => {
      state.patientsListIds = [action.payload];
    },
  },
});

export default patientsSlice;

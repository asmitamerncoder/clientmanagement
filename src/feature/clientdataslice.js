import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: []
  
};

export const dataSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
   showClientData: (state, action) => {
      state.rows = state.rows.push(action.payload);
    },
    setRows: (state, action) => {
      // console.log(action.payload);
      state.rows = [...action.payload];
    }

  }
});

export const { showData, setRows, setIndex } = dataSlice.actions;

export default dataSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import clientData from "../feature/clientdataslice";

export const store = configureStore({
  reducer:{
    client:clientData
  },
});

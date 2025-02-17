import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "web3",
  initialState: {
    account: null,
    network: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    resetWeb3: (state) => {
      state.account = null;
      state.network = null;
    },
  },
});

export const { setAccount, setNetwork, resetWeb3 } = web3Slice.actions;
export default web3Slice.reducer;

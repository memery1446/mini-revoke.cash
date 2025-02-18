import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "web3",
  initialState: {
    account: null,
    network: null,
    approvals: [], // New state to store approvals
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
      state.approvals = []; // Reset approvals on reset
    },
    addApproval: (state, action) => {
      // Add approval to the approvals array
      state.approvals.push(action.payload);
    },
    removeApproval: (state, action) => {
      // Remove approval from the approvals array
      state.approvals = state.approvals.filter(
        (approval) => approval.token !== action.payload.token
      );
    },
  },
});

// Export actions
export const { setAccount, setNetwork, resetWeb3, addApproval, removeApproval } = web3Slice.actions;

export default web3Slice.reducer;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js";
import ApprovalDashboard from "./components/ApprovalDashboard.js";
import BatchRevoke from "./components/BatchRevoke.js";
import NetworkSelector from "./components/NetworkSelector.js";
import ExistingApprovals from "./components/ExistingApprovals.js";
import { CONTRACT_ADDRESSES } from "./constants/abis";
import "bootstrap/dist/css/bootstrap.min.css";

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const wallet = useSelector((state) => state.web3.account);
  const network = useSelector((state) => state.web3.network);

  // Log Redux updates
  useEffect(() => {
    console.log("🔍 Redux Network:", network);
    console.log("🔍 Redux Account:", wallet);
  }, [network, wallet]);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold">Mini Revoke Cash</h1>

      <WalletConnect />
      <NetworkSelector />

      {wallet && network && (
        <>
          <ExistingApprovals />  {/* ✅ Ensures ERC-20 approvals show up */}
          <ApprovalDashboard />  {/* ✅ Fetches all approvals */}
          <TokenAllowanceManager />  {/* ✅ Allows managing token allowances */}
          <NFTApprovals contractAddress={CONTRACT_ADDRESSES.TestNFT} />  {/* ✅ Ensures NFT approvals load */}
          <ERC1155Approvals contractAddress={CONTRACT_ADDRESSES.TestERC1155} />  {/* ✅ Loads ERC-1155 approvals */}
        </>
      )}

      {wallet && (
        <button className="btn btn-danger btn-lg fw-bold">
          🚨 Revoke All Approvals
        </button>
      )}
    </div>
  );
};

export default App;

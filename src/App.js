import React from "react";
import { useSelector } from "react-redux";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js";
import ApprovalDashboard from "./components/ApprovalDashboard.js";
import BatchRevoke from "./components/BatchRevoke.js";
import NetworkSelector from "./components/NetworkSelector.js";
import ExistingApprovals from "./components/ExistingApprovals.js";
import { CONTRACT_ADDRESSES } from "./constants/abis";  // ✅ Import contract addresses
import "bootstrap/dist/css/bootstrap.min.css";

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const wallet = useSelector((state) => state.web3.account);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold">Mini Revoke Cash</h1>

      <WalletConnect />
      <NetworkSelector />

      {wallet && (
        <>
          <ExistingApprovals />
          <ApprovalDashboard />
        </>
      )}

      <TokenAllowanceManager />

      {wallet && CONTRACT_ADDRESSES?.erc721 && (
        <>
          <NFTApprovals contractAddress={CONTRACT_ADDRESSES.erc721} /> {/* ✅ Ensures address is passed */}
        </>
      )}

      {wallet && CONTRACT_ADDRESSES?.erc1155 && (
        <>
          <ERC1155Approvals contractAddress={CONTRACT_ADDRESSES.erc1155} /> {/* ✅ Ensures address is passed */}
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

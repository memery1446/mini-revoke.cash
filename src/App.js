import React, { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js";
import ApprovalDashboard from "./components/ApprovalDashboard.js";
import BatchRevoke from "./components/BatchRevoke.js";
import NetworkSelector from "./components/NetworkSelector.js";
import { CONTRACT_ADDRESSES, NETWORK_CONFIG } from "./constants/abis";
import "bootstrap/dist/css/bootstrap.min.css";

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const [wallet, setWallet] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [activeContracts, setActiveContracts] = useState(CONTRACT_ADDRESSES);

  useEffect(() => {
    if (selectedNetwork) {
      console.log(`🔄 Switching to network: ${selectedNetwork}`);
      setActiveContracts(NETWORK_CONFIG[selectedNetwork]?.contracts || CONTRACT_ADDRESSES);
    }
  }, [selectedNetwork]);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary fw-bold">Mini Revoke Cash</h1>

      <div className="d-flex justify-content-center mt-3">
        {wallet ? (
          <p className="alert alert-success text-center">
            ✅ Wallet Connected: <strong>{wallet}</strong>
          </p>
        ) : (
          <WalletConnect setWallet={setWallet} />
        )}
      </div>

      {/* Network Selector */}
      <NetworkSelector setSelectedNetwork={setSelectedNetwork} />

      {/* Approval Dashboard */}
      {wallet && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "900px" }}>
          <h2 className="text-secondary">Approval Dashboard</h2>
          <ApprovalDashboard wallet={wallet} contractAddresses={activeContracts} />
        </div>
      )}

      {/* ERC-20 Approvals */}
      <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-secondary">ERC-20 Token Approvals</h2>
        <TokenAllowanceManager wallet={wallet} />
      </div>

      {/* NFT Approvals (ERC-721) */}
      {wallet && activeContracts?.erc721 && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="text-secondary">NFT Approvals (ERC-721)</h2>
          <NFTApprovals contractAddress={activeContracts.erc721} />
        </div>
      )}

      {/* ERC-1155 Approvals */}
      {wallet && activeContracts?.erc1155 && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="text-secondary">ERC-1155 Approvals</h2>
          <ERC1155Approvals contractAddress={activeContracts.erc1155} />
        </div>
      )}

      {/* Batch Revoke Button */}
      {wallet && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-danger btn-lg fw-bold"
            onClick={() =>
              BatchRevoke({
                erc20Contracts: [activeContracts.tokenManager],
                erc721Contract: activeContracts.erc721,
                erc1155Contract: activeContracts.erc1155,
                signer: wallet,
              })
            }
          >
            🚨 Revoke All Approvals
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

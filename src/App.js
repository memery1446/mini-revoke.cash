import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js";
import ApprovalDashboard from "./components/ApprovalDashboard.js";
import BatchRevoke from "./components/BatchRevoke.js";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap styles

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const [wallet, setWallet] = useState(null);

  const contractAddresses = {
    erc20Tokens: ["0xToken1", "0xToken2"], // ✅ Replace with actual ERC-20 contract addresses
    erc721: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // ✅ Replace with actual ERC-721 contract address
    erc1155: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", // ✅ Replace with actual ERC-1155 contract address
  };

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

      {/* ERC-20 Approvals */}
      <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-secondary">ERC-20 Token Approvals</h2>
        <TokenAllowanceManager wallet={wallet} />
      </div>

      {/* Approval Dashboard */}
      {wallet && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "900px" }}>
          <h2 className="text-secondary">Approval Dashboard</h2>
          <ApprovalDashboard wallet={wallet} contractAddresses={contractAddresses} />
        </div>
      )}

      {/* NFT Approvals (ERC-721) */}
      {wallet && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="text-secondary">NFT Approvals (ERC-721)</h2>
          <NFTApprovals contractAddress={contractAddresses.erc721} />
        </div>
      )}

      {/* ERC-1155 Approvals */}
      {wallet && (
        <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="text-secondary">ERC-1155 Approvals</h2>
          <ERC1155Approvals contractAddress={contractAddresses.erc1155} />
        </div>
      )}

      {/* Batch Revoke Button */}
      {wallet && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-danger btn-lg fw-bold"
            onClick={() =>
              BatchRevoke({
                erc20Contracts: contractAddresses.erc20Tokens,
                erc721Contract: contractAddresses.erc721,
                erc1155Contract: contractAddresses.erc1155,
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

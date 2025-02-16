import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js";
import ERC1155Approvals from "./components/ERC1155Approvals.js"; // ✅ Import ERC-1155 Component

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const [wallet, setWallet] = useState(null); 

  const nftContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Replace with actual deployed ERC-721 address
  const erc1155ContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // Replace with actual deployed ERC-1155 address

  return (
    <ChakraProvider>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        MINI REVOKE CASH
      </h1>

      {/* Wallet Connection */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <WalletConnect setWallet={setWallet} />
      </div>

      {/* Token Allowance Manager */}
      <div style={{
        marginTop: "40px",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "10px",
        width: "400px",
        margin: "auto"
      }}>
        <TokenAllowanceManager wallet={wallet} />
      </div>

      {/* NFT Approvals (ERC-721) */}
      {wallet && (
        <div style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid blue",
          borderRadius: "10px",
          width: "400px",
          margin: "auto"
        }}>
          <h2 style={{ textAlign: "center" }}>NFT Approvals</h2>
          <NFTApprovals contractAddress={nftContractAddress} />
        </div>
      )}

      {/* ERC-1155 Approvals */}
      {wallet && (
        <div style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid green",
          borderRadius: "10px",
          width: "400px",
          margin: "auto"
        }}>
          <h2 style={{ textAlign: "center" }}>ERC-1155 Approvals</h2>
          <ERC1155Approvals contractAddress={erc1155ContractAddress} />
        </div>
      )}
    </ChakraProvider>
  );
};

export default App;

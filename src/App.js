import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";
import NFTApprovals from "./components/NFTApprovals.js"; // ✅ Import NFTApprovals

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const [wallet, setWallet] = useState(null); // ✅ Store wallet globally

  // ✅ Replace this with the actual deployed NFT contract address
  const nftContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 

  return (
    <ChakraProvider>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        MINI REVOKE CASH
      </h1>

      {/* Pass setWallet to WalletConnect */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <WalletConnect setWallet={setWallet} />
      </div>

      {/* Pass wallet state to TokenAllowanceManager */}
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

      {/* ✅ Show NFT approvals only if the wallet is connected */}
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
    </ChakraProvider>
  );
};

export default App;

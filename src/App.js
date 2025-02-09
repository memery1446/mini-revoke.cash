import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import WalletConnect from "./components/WalletConnect.js";
import TokenAllowanceManager from "./components/TokenAllowanceManager.js";

console.log("✅ App.js file has loaded");

const App = () => {
  console.log("✅ App component is rendering");

  const [wallet, setWallet] = useState(null); // ✅ Store wallet globally

  return (
    <ChakraProvider>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        🚀 Minimal React Test Works
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
    </ChakraProvider>
  );
};

export default App;

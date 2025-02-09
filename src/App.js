import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

console.log("✅ App.js file has loaded");

// Debugging: Check if WalletConnect is being imported correctly
console.log("📌 Importing WalletConnect module...");

import WalletConnect from "./components/WalletConnect.js"; // Ensure the path is correct

console.log("📌 WalletConnect module:", WalletConnect);

const App = () => {
  console.log("✅ App component is rendering");

  return (
    <ChakraProvider>
      <h1 style={{ textAlign: "center", marginTop: "20vh" }}>
        🚀 Minimal React Test Works
      </h1>

      {/* Debugging: Render the WalletConnect Component */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <WalletConnect />  
      </div>
    </ChakraProvider>
  );
};

export default App;

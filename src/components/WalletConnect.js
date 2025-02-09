import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { BrowserProvider } from "ethers";

console.log("✅ WalletConnect.js file has loaded"); // CONFIRM FILE IS LOADED

const WalletConnect = () => {
  console.log("✅ WalletConnect component is rendering"); // CONFIRM COMPONENT RENDER

  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      console.log("✅ Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("❌ Connection error:", error);
    }
  };

  return (
    <Button colorScheme="teal" onClick={connectWallet}>
      {walletAddress
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnect;

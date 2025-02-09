import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { BrowserProvider } from "ethers";

console.log("✅ WalletConnect.js file has loaded");

const WalletConnect = ({ setWallet }) => {  // ✅ Receive setWallet from App.js
  console.log("✅ WalletConnect component is rendering");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);  // ✅ Set wallet globally in App.js
      console.log("✅ Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("❌ Connection error:", error);
    }
  };

  return (
    <Button colorScheme="teal" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;

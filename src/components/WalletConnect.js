import React from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, setNetwork } from "../store/web3Slice";
import { ethers } from "ethers";

console.log("✅ WalletConnect.js file has loaded");

const WalletConnect = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.web3.account);

  console.log("🔍 Current account in Redux:", account); // ✅ LOGGING REDUX STATE

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      console.log("✅ Wallet connected:", address);
      console.log("🔄 Dispatching to Redux...");

      dispatch(setAccount(address));
      dispatch(setNetwork(network.chainId));

      console.log("✅ Redux should now have account:", address);
    } catch (error) {
      console.error("❌ Connection error:", error);
    }
  };

  return (
    <Button colorScheme="teal" onClick={connectWallet}>
      {account ? `Connected: ${account}` : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnect;

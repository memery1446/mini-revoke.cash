import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, setNetwork, resetWeb3 } from "../store/web3Slice";
import { ethers } from "ethers";

console.log("✅ WalletConnect.js file has loaded");

const WalletConnect = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.web3.account);
  const network = useSelector((state) => state.web3.network);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔄 Redux Account:", account);
    console.log("🔄 Redux Network:", network);
  }, [account, network]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("❌ MetaMask is required.");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      console.log("✅ Wallet Connected:", address);
      console.log("🔄 Dispatching to Redux...");

      dispatch(setAccount(address));
      dispatch(setNetwork(network.chainId));

      console.log("✅ Redux Updated -> Account:", address);
      console.log("✅ Redux Updated -> Network:", network.chainId);
    } catch (error) {
      console.error("❌ Connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    console.log("🔌 Disconnecting Wallet...");
    dispatch(resetWeb3());
  };

  return (
    <div className="text-center my-3">
      {account ? (
        <>
          <p className="text-success">✅ Connected: {account}</p>
          <p className="text-info">🌐 Network: {network}</p>
          <Button colorScheme="red" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button colorScheme="teal" onClick={connectWallet} isLoading={loading}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;

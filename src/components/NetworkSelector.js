import React from "react";
import { NETWORK_CONFIG } from "../constants/abis";

const supportedNetworks = {
  1: { chainId: "0x1", name: "Ethereum Mainnet", rpcUrl: "https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY", currency: { name: "Ether", symbol: "ETH", decimals: 18 } },
  56: { chainId: "0x38", name: "Binance Smart Chain", rpcUrl: "https://bsc-dataseed.binance.org/", currency: { name: "BNB", symbol: "BNB", decimals: 18 } },
  137: { chainId: "0x89", name: "Polygon", rpcUrl: "https://polygon-rpc.com/", currency: { name: "Matic Token", symbol: "MATIC", decimals: 18 } },
  97: { chainId: "0x61", name: "BSC Testnet", rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/", currency: { name: "BNB", symbol: "BNB", decimals: 18 } },
};

const switchNetwork = async (hexChainId) => {
  const networkDetails = Object.values(supportedNetworks).find(net => net.chainId === hexChainId);
  
  if (!networkDetails) {
    alert("Network not supported. Please add it manually in MetaMask.");
    return;
  }

  try {
    console.log(`🔄 Attempting to switch to chain: ${hexChainId}`);

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });

    console.log(`✅ Successfully switched to network ${hexChainId}`);
    return;

  } catch (error) {
    console.error("❌ Error switching network:", error);

    if (error.code === 4902) {
      console.log(`➕ Adding network: ${networkDetails.name}`);
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: networkDetails.chainId,
            chainName: networkDetails.name,
            rpcUrls: [networkDetails.rpcUrl],
            nativeCurrency: networkDetails.currency,
            blockExplorerUrls: networkDetails.explorer ? [networkDetails.explorer] : [],
          }],
        });

        console.log(`✅ Network ${networkDetails.name} added successfully!`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await switchNetwork(hexChainId);

      } catch (addError) {
        console.error("❌ Failed to add network:", addError);
        alert("Failed to add the network. Please try manually in MetaMask.");
      }
    }
  }
};

const NetworkSelector = ({ setSelectedNetwork }) => {
  return (
    <div className="text-center mt-4">
      <h5>Select Network:</h5>
      <select
        className="form-select w-50 mx-auto"
        onChange={(e) => switchNetwork(e.target.value)}
      >
        {Object.entries(supportedNetworks).map(([id, net]) => (
          <option key={id} value={net.chainId}>
            {net.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector;

import { ethers } from "ethers";

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    }

    // Use Infura if no local Hardhat node is running
    const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
    const infuraUrl = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

    try {
        return new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Hardhat local network
    } catch (error) {
        console.warn("⚠️ Hardhat node not found, using Infura...");
        return new ethers.providers.JsonRpcProvider(infuraUrl);
    }
};

export default getProvider;


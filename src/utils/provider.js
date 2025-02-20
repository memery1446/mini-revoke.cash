import { ethers } from "ethers";

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    }
    return new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Hardhat network
};

export default getProvider;

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || "873f1dfbc0294062843aadbe3d6afc9e";
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: INFURA_URL,
        blockNumber: process.env.FORK_BLOCK_NUMBER ? parseInt(process.env.FORK_BLOCK_NUMBER) : undefined, // Optional block number for stability
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337,
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
  mocha: {
    timeout: 200000,
  },
};

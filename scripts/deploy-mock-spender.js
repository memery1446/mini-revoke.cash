// Import dependencies
const { ethers, waffle } = require("hardhat");

async function main() {
    // Get the first signer (default deployer's account)
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the MockSpender contract
    const MockSpender = await ethers.getContractFactory("MockSpender");
    const mockSpender = await MockSpender.deploy();

    await mockSpender.deployed();

    console.log("MockSpender deployed to:", mockSpender.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


    
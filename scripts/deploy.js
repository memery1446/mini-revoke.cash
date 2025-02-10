const hre = require("hardhat");

async function main() {
  const [deployer, account1] = await hre.ethers.getSigners();

  console.log(`🚀 Deploying with: ${deployer.address}`);

  // Deploy Two ERC-20 Test Tokens
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const tk1 = await TestToken.deploy("Test Token 1", "TK1", 18);
  await tk1.waitForDeployment();
  console.log(`TK1 deployed at: ${await tk1.getAddress()}`);

  const tk2 = await TestToken.deploy("Test Token 2", "TK2", 18);
  await tk2.waitForDeployment();
  console.log(`TK2 deployed at: ${await tk2.getAddress()}`);

  // Mint tokens to the deployer BEFORE any transfers
  await tk1.mint(deployer.address, hre.ethers.parseUnits("5000", 18));
  await tk2.mint(deployer.address, hre.ethers.parseUnits("5000", 18));
  console.log(`Minted 5000 TK1 and TK2 to Deployer: ${deployer.address}`);

  // Now transfer tokens to other accounts
  await tk1.transfer(account1.address, hre.ethers.parseUnits("1000", 18));
  await tk2.transfer(account1.address, hre.ethers.parseUnits("1000", 18));
  console.log(`Sent 1000 TK1 and TK2 to ${account1.address}`);

  console.log("Deployment successful!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


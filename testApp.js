const { ethers } = require("ethers");
const { TOKEN_ABI, NFT_ABI, ERC1155_ABI, CONTRACT_ADDRESSES } = require("./src/constants/abis"); // ✅ Use require()

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Hardhat node

/** Function to fetch ERC-721 approvals */
async function getERC721Approvals(nftContractAddress, ownerAddress) {
    const abi = ["function isApprovedForAll(address owner, address operator) view returns (bool)"];
    const contract = new ethers.Contract(nftContractAddress, abi, provider);

    const operatorAddress = "0x0000000000000000000000000000000000000000"; // Replace with marketplace
    const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);

    console.log(`✅ ERC-721 Approval for All: ${isApproved}`);
    return isApproved;
}

/** Function to fetch ERC-1155 approvals */
async function getERC1155Approvals(nftContractAddress, ownerAddress) {
    const abi = ["function isApprovedForAll(address owner, address operator) view returns (bool)"];
    const contract = new ethers.Contract(nftContractAddress, abi, provider);

    const operatorAddress = "0x0000000000000000000000000000000000000000"; // Replace with marketplace
    const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);

    console.log(`✅ ERC-1155 Approval for All: ${isApproved}`);
    return isApproved;
}

/** Function to revoke ERC-721 approvals */
async function revokeERC721Approval(nftContractAddress, signer) {
    const abi = ["function approve(address to, uint256 tokenId)"];
    const contract = new ethers.Contract(nftContractAddress, abi, signer);

    console.log("⏳ Revoking ERC-721 approval...");
    
    // ✅ Use Zero Address to revoke approval for a specific token ID (assuming Token ID 1 exists)
    const tx = await contract.approve(ethers.ZeroAddress, 1);
    await tx.wait();

    console.log(`✅ ERC-721 Approval Revoked`);
}

/** Function to revoke ERC-1155 approvals */
async function revokeERC1155Approval(nftContractAddress, signer) {
    const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function setApprovalForAll(address operator, bool approved)"
    ];
    const contract = new ethers.Contract(nftContractAddress, abi, signer);

    console.log("⏳ Checking current ERC-1155 approval status...");

    // ✅ Find an operator that is currently approved (to avoid setting 0x0)
    const ownerAddress = await signer.getAddress();
    const operatorAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual marketplace if needed

    const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);

    if (!isApproved) {
        console.log(`✅ No active approvals found for ERC-1155 tokens. Skipping revocation.`);
        return;
    }

    console.log(`⏳ Revoking ERC-1155 approval for operator: ${operatorAddress}`);

    const tx = await contract.setApprovalForAll(operatorAddress, false); // ✅ Correct revocation
    await tx.wait();

    console.log(`✅ ERC-1155 Approval Revoked`);
}


/** Main Function to Run Tests */
async function main() {
    console.log("\n🚀 Running Node.js Smart Contract Tests...\n");

    const accounts = await provider.listAccounts(); // ✅ Get all test accounts
    const signer = await provider.getSigner(accounts[0].address); // ✅ Await the signer properly
    const ownerAddress = accounts[0]; // ✅ Assign owner address correctly

    console.log(`👤 Testing for account: ${ownerAddress}`);

    console.log("\n📌 Fetching Initial Approvals...");
    await getERC721Approvals(CONTRACT_ADDRESSES.TestNFT, ownerAddress);
    await getERC1155Approvals(CONTRACT_ADDRESSES.TestERC1155, ownerAddress);

    console.log("\n📌 Revoking Approvals...");
    await revokeERC721Approval(CONTRACT_ADDRESSES.TestNFT, signer);
    await revokeERC1155Approval(CONTRACT_ADDRESSES.TestERC1155, signer);

    console.log("\n📌 Fetching Approvals Again to Verify Revocation...");
    await getERC721Approvals(CONTRACT_ADDRESSES.TestNFT, ownerAddress);
    await getERC1155Approvals(CONTRACT_ADDRESSES.TestERC1155, ownerAddress);

    console.log("\n✅ All tests completed successfully!");
}

// Run the test script
main().catch((error) => {
    console.error("❌ Error running tests:", error);
});

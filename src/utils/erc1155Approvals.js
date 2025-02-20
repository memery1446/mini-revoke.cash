import { ethers } from "ethers";
import getProvider from "./provider"; // Ensure provider.js exists in utils
import { CONTRACT_ADDRESSES } from "../constants/abis"; // ✅ Correct import

export async function getERC1155Approvals(userAddress) {
    try {
        const provider = getProvider();
        const contractAddress = CONTRACT_ADDRESSES.TestERC1155;

        console.log("🔍 Fetching ERC-1155 approvals for contract:", contractAddress);

        if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
            throw new Error("🚨 Invalid ERC-1155 contract address!");
        }

        const contract = new ethers.Contract(
            contractAddress,
            ["function isApprovedForAll(address owner, address operator) view returns (bool)"],
            provider
        );

        const operatorAddress = CONTRACT_ADDRESSES.MockSpender;
        console.log("📌 Checking approval for operator:", operatorAddress);

        const isApproved = await contract.isApprovedForAll(userAddress, operatorAddress);
        console.log("✅ ERC-1155 Approval Status:", isApproved);
        return isApproved;
    } catch (error) {
        console.error("❌ Error fetching ERC-1155 approvals:", error.message);
        return false;
    }
}

export async function revokeERC1155Approval(userAddress) {
    try {
        const provider = getProvider();
        const signer = provider.getSigner();
        const contractAddress = CONTRACT_ADDRESSES.TestERC1155;
        const erc1155 = new ethers.Contract(contractAddress, [
            "function setApprovalForAll(address operator, bool approved) external"
        ], signer);
        
        const operatorAddress = CONTRACT_ADDRESSES.MockSpender;
        console.log("🛑 Revoking ERC-1155 Approval for:", operatorAddress);
        
        const tx = await erc1155.setApprovalForAll(operatorAddress, false);
        await tx.wait();
        console.log("✅ ERC-1155 Approval Revoked");
    } catch (error) {
        console.error("❌ Error revoking ERC-1155 approval:", error);
    }
}

export async function batchRevokeERC1155Approvals(userAddresses) {
    try {
        for (const userAddress of userAddresses) {
            await revokeERC1155Approval(userAddress);
        }
    } catch (error) {
        console.error("❌ Error in batch revocation of ERC-1155 approvals:", error);
    }
}

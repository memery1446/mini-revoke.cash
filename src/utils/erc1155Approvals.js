import { BrowserProvider, Contract } from "ethers"; // ✅ Correct import

/** Function to get ERC-1155 Approvals */
export async function getERC1155Approvals(nftContractAddress, ownerAddress, provider) {
    const abi = ["function isApprovedForAll(address owner, address operator) view returns (bool)"];
    const contract = new Contract(nftContractAddress, abi, provider);
    const operatorAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual marketplace

    const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);
    console.log(`✅ ERC-1155 Approval for All: ${isApproved}`);

    return isApproved;
}

/** Function to revoke ERC-1155 Approvals */
export async function revokeERC1155Approval(nftContractAddress) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const abi = ["function setApprovalForAll(address operator, bool approved)"];
    const contract = new Contract(nftContractAddress, abi, signer);

    const tx = await contract.setApprovalForAll("0x0000000000000000000000000000000000000000", false);
    await tx.wait();
    console.log(`✅ ERC-1155 Approval Revoked`);
}

/** Function to batch revoke ERC-1155 approvals */
export async function batchRevokeERC1155Approvals(nftContractAddress, signer) {
    const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function setApprovalForAll(address operator, bool approved)"
    ];
    const contract = new Contract(nftContractAddress, abi, signer);
    
    const ownerAddress = await signer.getAddress();
    const knownOperators = [
        "0xMarketplace1", "0xMarketplace2"
    ]; // ✅ Replace with known marketplace addresses

    console.log("⏳ Checking current ERC-1155 approvals...");

    const approvedOperators = [];
    for (let operator of knownOperators) {
        const isApproved = await contract.isApprovedForAll(ownerAddress, operator);
        if (isApproved) approvedOperators.push(operator);
    }

    if (approvedOperators.length === 0) {
        console.log("✅ No active approvals found for ERC-1155 tokens. Skipping revocation.");
        return;
    }

    console.log(`⏳ Revoking ERC-1155 approvals for: ${approvedOperators.join(", ")}`);

    for (let operator of approvedOperators) {
        const tx = await contract.setApprovalForAll(operator, false);
        await tx.wait();
        console.log(`✅ Revoked approval for: ${operator}`);
    }

    console.log("✅ All ERC-1155 approvals revoked!");
}


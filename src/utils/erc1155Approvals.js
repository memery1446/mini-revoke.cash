import { BrowserProvider, Contract } from "ethers"; // ✅ Correct import

/** Function to get ERC-1155 Approvals */
export async function getERC1155Approvals(nftContractAddress, ownerAddress, provider) {
    const abi = ["function isApprovedForAll(address owner, address operator) view returns (bool)"];

    const contract = new Contract(nftContractAddress, abi, provider);
    const operatorAddress = "0x0000000000000000000000000000000000000000"; // Replace later with actual marketplace

    const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);
    console.log(`✅ ERC-1155 Approval for All: ${isApproved}`);

    return isApproved;
}

/** Function to revoke ERC-1155 Approvals */
export async function revokeERC1155Approval(nftContractAddress) {
    const provider = new BrowserProvider(window.ethereum); // ✅ Corrected reference
    const signer = await provider.getSigner();
    
    const abi = ["function setApprovalForAll(address operator, bool approved)"];
    const contract = new Contract(nftContractAddress, abi, signer);

    const tx = await contract.setApprovalForAll("0x0000000000000000000000000000000000000000", false); // Revoke approval
    await tx.wait();
    console.log(`✅ ERC-1155 Approval Revoked`);
}

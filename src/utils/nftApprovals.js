import { BrowserProvider, Contract, ZeroAddress } from "ethers"; // ✅ Updated for Ethers v6

/** Function to get ERC-721 Approvals */
export async function getERC721Approvals(nftContractAddress, ownerAddress, provider) {
    const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function getApproved(uint256 tokenId) view returns (address)"
    ];
    
    const contract = new Contract(nftContractAddress, abi, provider);
    const marketplaceAddress = "0x0000000000000000000000000000000000000000"; // Temporary placeholder

    const isApprovedForAll = await contract.isApprovedForAll(ownerAddress, marketplaceAddress);
    console.log(`✅ Global Approval for All: ${isApprovedForAll}`);

    const approvedForToken = await contract.getApproved(1);
    console.log(`✅ Approved Address for Token ID 1: ${approvedForToken}`);

    return { isApprovedForAll, approvedForToken };
}

/** Function to revoke ERC-721 Approvals */
export async function revokeERC721Approval(nftContractAddress, tokenId) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const abi = ["function approve(address to, uint256 tokenId)"];
    const contract = new Contract(nftContractAddress, abi, signer);

    const tx = await contract.approve(ZeroAddress, tokenId);
    await tx.wait();
    console.log(`✅ Approval revoked for token ${tokenId}`);
}

/** Function to batch revoke ERC-721 approvals */
export async function batchRevokeERC721Approvals(nftContractAddress, signer, tokenIds) {
    const abi = ["function batchRevokeApprovals(uint256[] memory tokenIds)"];
    const contract = new Contract(nftContractAddress, abi, signer);

    console.log("⏳ Revoking multiple ERC-721 approvals...");
    
    const tx = await contract.batchRevokeApprovals(tokenIds);
    await tx.wait();

    console.log(`✅ ERC-721 Approvals Revoked for tokens: ${tokenIds.join(", ")}`);
}



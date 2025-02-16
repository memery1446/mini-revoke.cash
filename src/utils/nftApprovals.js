import { BrowserProvider, Contract, ZeroAddress } from "ethers"; // ✅ Updated for Ethers v6

/** Function to get ERC-721 Approvals */
export async function getERC721Approvals(nftContractAddress, ownerAddress, provider) {
    const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function getApproved(uint256 tokenId) view returns (address)"
    ];
    
    const contract = new Contract(nftContractAddress, abi, provider);

    // Replace with actual marketplace (e.g., OpenSea, Blur, etc.)
    const marketplaceAddress = "0x0000000000000000000000000000000000000000"; // Temporary placeholder

    // Check if the owner has globally approved a marketplace
    const isApprovedForAll = await contract.isApprovedForAll(ownerAddress, marketplaceAddress);
    console.log(`✅ Global Approval for All: ${isApprovedForAll}`);

    // Check approval for a specific NFT ID (assuming Token ID = 1 exists)
    const approvedForToken = await contract.getApproved(1);
    console.log(`✅ Approved Address for Token ID 1: ${approvedForToken}`);

    return { isApprovedForAll, approvedForToken };
}

/** Function to revoke ERC-721 Approvals */
export async function revokeERC721Approval(nftContractAddress, tokenId) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const abi = ["function approve(address to, uint256 tokenId)", "function setApprovalForAll(address operator, bool approved)"];
    const contract = new Contract(nftContractAddress, abi, signer);

    // ✅ Revoke approval by setting it to the zero address
    const tx = await contract.approve(ZeroAddress, tokenId);
    await tx.wait();
    console.log(`✅ Approval revoked for token ${tokenId}`);
}



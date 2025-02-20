import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const NFTApprovals = ({ contractAddress, spender }) => {
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    if (contractAddress && spender && window.ethereum) {
      fetchApprovals();
    }
  }, [contractAddress, spender]);

  const fetchApprovals = async () => {
    try {
      console.log("🔍 Fetching NFT approvals for contract:", contractAddress);
      
      if (!contractAddress) throw new Error("❌ Contract address is missing!");
      if (!spender) throw new Error("❌ Spender address is missing!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const owner = await signer.getAddress(); // Get the owner's address

      if (!owner) throw new Error("❌ Failed to fetch the owner's address!");

      console.log("Checking isApprovedForAll for:", owner, spender);

      const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function getApproved(uint256 tokenId) view returns (address)",
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const isApprovedForAll = await contract.isApprovedForAll(owner, spender);

      console.log("✅ NFT Approvals:", isApprovedForAll);
      setApprovals(isApprovedForAll);
    } catch (error) {
      console.error("❌ Error fetching approvals:", error.message);
      setApprovals(null);
    }
  };

  return (
    <div>
      <h3>NFT Approvals</h3>
      <p>{approvals !== null ? `Approved: ${approvals}` : "Fetching..."}</p>
    </div>
  );
};

export default NFTApprovals;

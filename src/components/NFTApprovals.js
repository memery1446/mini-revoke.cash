import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const NFTApprovals = ({ contractAddress }) => {
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    if (contractAddress && window.ethereum) {
      fetchApprovals();
    }
  }, [contractAddress]);

  const fetchApprovals = async () => {
    try {
      console.log("🔍 Fetching NFT approvals for contract:", contractAddress);
      if (!contractAddress) throw new Error("❌ Contract address is missing!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function getApproved(uint256 tokenId) view returns (address)",
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const isApprovedForAll = await contract.isApprovedForAll(
        await signer.getAddress(),
        "0x0000000000000000000000000000000000000000"
      );

      console.log("✅ NFT Approvals:", isApprovedForAll);
      setApprovals(isApprovedForAll);
    } catch (error) {
      console.error("❌ Error fetching approvals:", error);
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

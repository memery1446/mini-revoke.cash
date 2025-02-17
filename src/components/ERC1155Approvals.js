import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const ERC1155Approvals = ({ contractAddress }) => {
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    if (contractAddress && window.ethereum) {
      fetchApprovalStatus();
    }
  }, [contractAddress]);

  const fetchApprovalStatus = async () => {
    try {
      console.log("🔍 Fetching ERC-1155 approvals for contract:", contractAddress);
      if (!contractAddress) throw new Error("❌ Contract address is missing!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = ["function isApprovedForAll(address owner, address operator) view returns (bool)"];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const isApprovedForAll = await contract.isApprovedForAll(
        await signer.getAddress(),
        "0x0000000000000000000000000000000000000000"
      );

      console.log("✅ ERC-1155 Approvals:", isApprovedForAll);
      setApprovals(isApprovedForAll);
    } catch (error) {
      console.error("❌ Error fetching ERC-1155 approvals:", error);
    }
  };

  return (
    <div>
      <h3>ERC-1155 Approvals</h3>
      <p>{approvals !== null ? `Approved: ${approvals}` : "Fetching..."}</p>
    </div>
  );
};

export default ERC1155Approvals;

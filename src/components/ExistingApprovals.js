import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { getERC20Approvals } from "../utils/erc20Approvals";

const ExistingApprovals = () => {
  const wallet = useSelector((state) => state.web3.account);
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    if (wallet && window.ethereum) {
      fetchApprovals();
    }
  }, [wallet]);

  const fetchApprovals = async () => {
    try {
      console.log("🔍 Fetching existing approvals...");
      const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ Fixed
      const signer = provider.getSigner();

      const erc20Approvals = await getERC20Approvals(wallet, signer, provider); // ✅ Ensure provider is passed

      setApprovals(erc20Approvals);
      console.log("✅ ERC-20 Approvals:", erc20Approvals);
    } catch (error) {
      console.error("❌ Error fetching approvals:", error);
    }
  };

  return (
    <div>
      <h3>Existing Approvals</h3>
      {approvals.length > 0 ? (
        <ul>
          {approvals.map((approval, index) => (
            <li key={index}>{approval.spender}: {approval.amount}</li>
          ))}
        </ul>
      ) : (
        <p>No approvals found.</p>
      )}
    </div>
  );
};

export default ExistingApprovals;

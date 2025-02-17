import React, { useEffect, useState } from "react";
import { ethers } from "ethers"; // ✅ Corrected import
import { CONTRACT_ADDRESSES, TOKEN_ABI } from "../constants/abis";

const TokenAllowanceManager = ({ wallet }) => {
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(CONTRACT_ADDRESSES.TK1);
  const [customAmount, setCustomAmount] = useState(""); // ✅ Allow users to set an amount
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (wallet && selectedToken && spender) {
      console.log("🔄 Fetching allowance on component load...");
      checkAllowance();
    }
  }, [wallet, selectedToken, spender]);

  const checkAllowance = async () => {
    try {
      console.log("🔍 Checking allowance...");
      if (!wallet || !selectedToken || !spender) {
        alert("Please ensure wallet is connected and spender is set.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ Use ethers.providers.Web3Provider
      const tokenContract = new ethers.Contract(selectedToken, TOKEN_ABI, provider);

      const value = await tokenContract.allowance(wallet, spender);
      setAllowance(ethers.utils.formatUnits(value, 18)); // ✅ Corrected formatUnits usage
      console.log("✅ Allowance fetched:", ethers.utils.formatUnits(value, 18));
    } catch (err) {
      console.error("❌ Error fetching allowance:", err);
    }
  };

  const handleSetAllowance = async () => {
    try {
      if (!customAmount || isNaN(customAmount) || parseFloat(customAmount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      console.log(`🚀 Requesting token approval for ${customAmount} tokens...`);
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(selectedToken, TOKEN_ABI, signer);

      const tx = await tokenContract.approve(spender, ethers.utils.parseUnits(customAmount, 18)); // ✅ Corrected parseUnits usage
      await tx.wait();
      console.log("✅ Token approval confirmed!");

      checkAllowance();
    } catch (error) {
      console.error("❌ Error setting allowance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAllowance = async () => {
    try {
      console.log("🚨 Revoking allowance...");
      if (!spender) {
        alert("Please enter a spender address.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(selectedToken, TOKEN_ABI, signer);

      const tx = await tokenContract.approve(spender, 0);
      await tx.wait();
      console.log("✅ Allowance revoked!");

      checkAllowance();
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="p-3 border rounded bg-light">
      {wallet ? (
        <>
          <h3 className="text-primary">Wallet Connected: {wallet}</h3>
          <select
            className="form-select my-2"
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value={CONTRACT_ADDRESSES.TK1}>Test Token 1 (TK1)</option>
            <option value={CONTRACT_ADDRESSES.TK2}>Test Token 2 (TK2)</option>
          </select>

          <input
            type="text"
            className="form-control my-2"
            placeholder="Spender Address"
            onChange={(e) => setSpender(e.target.value)}
          />

          <button className="btn btn-secondary w-100 my-2" onClick={checkAllowance}>
            🔄 Refresh Allowance
          </button>

          {/* ✅ New: User-defined amount for approval */}
          <input
            type="number"
            className="form-control my-2"
            placeholder="Enter amount to approve"
            onChange={(e) => setCustomAmount(e.target.value)}
          />

          <button className="btn btn-primary w-100 my-2" onClick={handleSetAllowance} disabled={loading}>
            {loading ? "Processing..." : "Set Allowance"}
          </button>

          <button className="btn btn-danger w-100 my-2" onClick={handleRevokeAllowance}>
            🚨 Revoke Allowance
          </button>

          <p className="fw-bold">Allowance: {allowance !== null ? `${allowance} Tokens` : "N/A"}</p>
        </>
      ) : (
        <p className="text-danger">🔴 Please connect your wallet first.</p>
      )}
    </div>
  );
};

export default TokenAllowanceManager;

import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ALLOWANCE_MANAGER_ABI, TOKEN_ABI } from "../constants/abis";

const TokenAllowanceManager = ({ wallet }) => {
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(CONTRACT_ADDRESSES.TK1);
  const [error, setError] = useState("");
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
      console.log("Token:", selectedToken);
      console.log("Wallet:", wallet);
      console.log("Spender:", CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);

      if (!wallet || !selectedToken || !CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER) {
        alert("Enter a valid spender address.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, provider);

      const value = await contract.getAllowance(selectedToken, wallet, CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);
      console.log("✅ Allowance fetched:", formatUnits(value, 18));

      setAllowance(formatUnits(value, 18));
    } catch (err) {
      console.error("❌ Error fetching allowance:", err);
    }
  };

  const handleSetAllowance = async () => {
    try {
      console.log("🚀 Requesting token approval...");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(wallet);
      const tokenContract = new Contract(selectedToken, TOKEN_ABI, signer);

      // 🔥 Directly call approve() from the wallet
      const tx = await tokenContract.approve(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, parseUnits("100", 18));
      await tx.wait();
      console.log("✅ Token approval confirmed!");

      // 🔥 Now call `setAllowance()`
      const allowanceContract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, signer);
      await allowanceContract.setAllowance(selectedToken, CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, parseUnits("100", 18));
      console.log("✅ Allowance updated in contract!");

      checkAllowance();
    } catch (error) {
      console.error("❌ Error setting allowance:", error);
    }
  };

  const handleRevokeAllowance = async () => {
    try {
      console.log("🚨 Revoking allowance...");
      console.log("Token:", selectedToken);
      console.log("Wallet:", wallet);
      console.log("Spender:", CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);

      if (!wallet || !selectedToken || !CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER) {
        alert("Enter a valid spender address.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(wallet);
      const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, signer);

      const tx = await contract.revokeAllowance(selectedToken, CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);
      console.log("⏳ Transaction sent! Hash:", tx.hash);

      await tx.wait();
      console.log("✅ Allowance revoked!");

      alert("✅ Allowance successfully revoked!");
      checkAllowance();
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div>
      {wallet ? (
        <>
          <h3>Wallet Connected: {wallet}</h3>
          <select
            onChange={(e) => {
              setSelectedToken(e.target.value);
              console.log("Selected token:", e.target.value);
            }}
          >
            <option value={CONTRACT_ADDRESSES.TK1}>Test Token 1 (TK1)</option>
            <option value={CONTRACT_ADDRESSES.TK2}>Test Token 2 (TK2)</option>
          </select>

          <input type="text" placeholder="Spender Address" onChange={(e) => setSpender(e.target.value)} />
          <button onClick={checkAllowance}>🔄 Refresh Allowance</button>

          <div></div>
          <button onClick={handleSetAllowance} disabled={loading}>
            {loading ? "Processing..." : "Set Allowance (100 Tokens)"}
          </button>
          <button onClick={handleRevokeAllowance} style={{ backgroundColor: "red", color: "white" }}>
            🚨 Revoke Allowance
          </button>

          <p>Allowance: {allowance || "N/A"}</p>

          {error && <p style={{ color: "red" }}>❌ {error}</p>}
        </>
      ) : (
        <p>🔴 Please connect your wallet first.</p>
      )}
    </div>
  );
};

export default TokenAllowanceManager;

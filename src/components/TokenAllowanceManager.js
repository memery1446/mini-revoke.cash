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

    if (!wallet || !selectedToken) {
      alert("Please ensure wallet is connected and token is selected.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const tokenContract = new Contract(selectedToken, TOKEN_ABI, provider);

    const value = await tokenContract.allowance(wallet, CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);
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

    // Just do the direct token approval
    const tx = await tokenContract.approve(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, parseUnits("100", 18));
    await tx.wait();
    console.log("✅ Token approval confirmed!");

    // Remove the second call to setAllowance() and just check the result
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

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(wallet);
    const tokenContract = new Contract(selectedToken, TOKEN_ABI, signer);

    // Directly set allowance to 0
    const tx = await tokenContract.approve(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, 0);
    await tx.wait();
    console.log("✅ Allowance revoked!");

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

import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ALLOWANCE_MANAGER_ABI } from "../constants/abis";

const TokenAllowanceManager = ({ wallet }) => {  // ✅ Receive wallet from App.js
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(CONTRACT_ADDRESSES.TK1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔄 Track transaction state

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
    console.log("Spender (Corrected):", CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER); // ✅ Fix here

    if (!wallet || !selectedToken || !CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER) {
      alert("Enter a valid spender address.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, provider);

    const value = await contract.getAllowance(selectedToken, wallet, CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER);
    console.log("✅ Allowance fetched (Updated):", formatUnits(value, 18));

    setAllowance(formatUnits(value, 18)); // ✅ Update UI
  } catch (err) {
    console.error("❌ Error fetching allowance:", err);
  }
};



const setAllowanceAmount = async () => {
  try {
    console.log("🚀 setAllowance() called with:");
    console.log("Token:", selectedToken);
    console.log("Spender:", spender);
    console.log("Wallet:", wallet);

    if (!wallet || !spender || !selectedToken) {
      alert("Enter a valid spender address.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(wallet);
    const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, signer);

    console.log("⏳ Sending transaction...");
    const tx = await contract.setAllowance(
      selectedToken,
      spender,
      parseUnits("100", 18)
    );
    console.log("✅ Transaction sent! Hash:", tx.hash);

    await tx.wait(); // ✅ Wait for transaction to be mined
    console.log("✅ Transaction confirmed in block!");

    alert("✅ Allowance set to 100.");

    console.log("🔄 Checking updated allowance...");
    await checkAllowance();  // 🔄 Automatically refresh UI

    console.log("✅ UI should now be updated!");
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    alert("❌ Error: " + error.message);
  }
};





  return (
    <div>
      {/* ✅ Render only if wallet is connected */}
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
          <button onClick={setAllowanceAmount} disabled={loading}>
  {loading ? "Processing..." : "Set Allowance (100 Tokens)"}
</button>

          <p>Allowance: {allowance || "N/A"}</p>

          {error && <p style={{ color: "red" }}>❌ {error}</p>}
        </>
      ) : (
        <p>🔴 Please connect your wallet first.</p> // ✅ Display message when wallet is not connected
      )}
    </div>
  );
};

export default TokenAllowanceManager;

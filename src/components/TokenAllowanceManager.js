import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ALLOWANCE_MANAGER_ABI } from "../constants/abis";

const TokenAllowanceManager = ({ wallet }) => {  // ✅ Receive wallet from App.js
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(CONTRACT_ADDRESSES.TK1);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("✅ TokenAllowanceManager component is rendering");
    console.log("💡 Wallet state:", wallet);
  }, [wallet]); // ✅ Log when wallet updates

  const checkAllowance = async () => {
    try {
      if (!wallet || !selectedToken || !spender) {
        alert("Enter a spender address.");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, provider);
      const value = await contract.getAllowance(selectedToken, wallet, spender);
      setAllowance(formatUnits(value, 18));
    } catch (err) {
      setError(err.message);
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
          <button onClick={checkAllowance}>Check Allowance</button>
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

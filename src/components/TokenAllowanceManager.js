import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ALLOWANCE_MANAGER_ABI } from "../constants/abis";

const TokenAllowanceManager = () => {
  const [wallet, setWallet] = useState("");
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(CONTRACT_ADDRESSES.TK1);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  };

  const checkAllowance = async () => {
    if (!wallet || !selectedToken || !spender) return alert("Enter a spender address.");
    
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, provider);

    try {
      const value = await contract.getAllowance(selectedToken, wallet, spender);
      setAllowance(formatUnits(value, 18));
    } catch (error) {
      console.error("Error checking allowance:", error);
    }
  };

  const setAllowanceAmount = async () => {
    if (!wallet || !spender || !selectedToken) return alert("Enter a spender address.");
    
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, signer);

    try {
      const tx = await contract.setAllowance(selectedToken, spender, parseUnits("100", 18));
      await tx.wait();
      alert("Allowance set to 100.");
      checkAllowance();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const revokeAllowance = async () => {
    if (!wallet || !spender || !selectedToken) return alert("Enter a spender address.");

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESSES.TOKEN_ALLOWANCE_MANAGER, TOKEN_ALLOWANCE_MANAGER_ABI, signer);

    try {
      const tx = await contract.revokeAllowance(selectedToken, spender);
      await tx.wait();
      alert("Allowance revoked.");
      checkAllowance();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div>
      {!wallet ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <select onChange={(e) => setSelectedToken(e.target.value)}>
            <option value={CONTRACT_ADDRESSES.TK1}>Test Token 1 (TK1)</option>
            <option value={CONTRACT_ADDRESSES.TK2}>Test Token 2 (TK2)</option>
          </select>

          <input type="text" placeholder="Spender Address" onChange={(e) => setSpender(e.target.value)} />
          <button onClick={checkAllowance}>Check Allowance</button>
          <p>Allowance: {allowance || "N/A"}</p>
          <button onClick={setAllowanceAmount}>Set Allowance (100 Tokens)</button>
          <button onClick={revokeAllowance}>Revoke Allowance</button>
        </>
      )}
    </div>
  );
};

export default TokenAllowanceManager;

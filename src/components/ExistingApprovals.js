import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { getERC20Approvals } from "../utils/erc20Approvals";
import { CONTRACT_ADDRESSES } from "../constants/abis"; // Adjust the import to match your file structure

const ExistingApprovals = () => {
    const account = useSelector((state) => state.web3.account);
    const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
    const [approvals, setApprovals] = useState([]);

    if (!account) {
        console.error("❌ Wallet address is missing in Redux state!");
        return <div>Error: Wallet not connected.</div>;
    }

    if (!provider) {
        console.error("❌ Provider is missing!");
        return <div>Error: No provider available.</div>;
    }

    const fetchApprovals = async () => {
        try {
            console.log("✅ Wallet Address:", account);
            console.log("Contract Addresses:", CONTRACT_ADDRESSES); // Debugging line
            
            // Use addresses from the imported CONTRACT_ADDRESSES
            const tokenContracts = [
                CONTRACT_ADDRESSES.TK1,
                CONTRACT_ADDRESSES.TK2,
            ];

            const approvals = await getERC20Approvals(tokenContracts, account, provider);
            setApprovals(approvals);
        } catch (error) {
            console.error("❌ Error fetching approvals:", error);
        }
    };

    useEffect(() => {
        fetchApprovals();
    }, [account]);

    return (
        <div>
            <h2>Existing Approvals</h2>
            {approvals.length === 0 ? (
                <p>No approvals found.</p>
            ) : (
                <ul>
                    {approvals.map((approval, index) => (
                        <li key={index}>
                            {approval.contract} - Spender: {approval.spender} - Amount: {approval.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExistingApprovals;


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { getERC20Approvals } from "../utils/erc20Approvals";
import { CONTRACT_ADDRESSES, addApproval, removeApproval } from "../constants/abis"; // Import your actions
import { addApproval as addApprovalAction, removeApproval as removeApprovalAction } from "../store/web3Slice"; // Ensure correct import

const ExistingApprovals = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.web3.account);
    const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
    const approvals = useSelector((state) => state.web3.approvals); // Access current approvals
    const [fetchedApprovals, setFetchedApprovals] = useState([]);

    useEffect(() => {
        if (approvals.length === 0) { // Only fetch if no approvals in store
            fetchApprovals();
        }
    }, [account]);

    const fetchApprovals = async () => {
        try {
            const tokenContracts = [
                CONTRACT_ADDRESSES.TK1,
                CONTRACT_ADDRESSES.TK2,
            ];

            const fetched = await getERC20Approvals(tokenContracts, account, provider);

            fetched.forEach((approval) => {
                // Dispatch add approval for each fetched approval
                dispatch(addApprovalAction(approval));
            });

            setFetchedApprovals(fetched);
        } catch (error) {
            console.error("❌ Error fetching approvals:", error);
        }
    };

    const revokeApproval = async (token) => {
        // Implement logic to revoke approval using the token address
        // Once revoked, dispatch removeApproval
        dispatch(removeApprovalAction({ token }));
    };

    return (
        <div>
            <h2>Existing Approvals</h2>
            {fetchedApprovals.length === 0 ? (
                <p>No approvals found.</p>
            ) : (
                <ul>
                    {fetchedApprovals.map((approval, index) => (
                        <li key={index}>
                            {approval.contract} - Spender: {approval.spender} - Amount: {approval.amount}
                            <button onClick={() => revokeApproval(approval.token)}>Revoke</button> {/* Add revoke button */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExistingApprovals;


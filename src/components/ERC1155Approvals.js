import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers"; // ✅ Correct import for Ethers v6
import { getERC1155Approvals, revokeERC1155Approval } from "../utils/erc1155Approvals"; // ✅ Import utility functions

const ERC1155Approvals = ({ contractAddress }) => {
    const [isApproved, setIsApproved] = useState(null);

    useEffect(() => {
        const fetchApprovalStatus = async () => {
            if (!window.ethereum) {
                console.error("❌ MetaMask (or another wallet) is not installed!");
                return;
            }

            try {
                const provider = new BrowserProvider(window.ethereum); // ✅ Corrected reference
                const signer = await provider.getSigner();
                const ownerAddress = await signer.getAddress();

                const approvalStatus = await getERC1155Approvals(contractAddress, ownerAddress, provider);
                setIsApproved(approvalStatus);
            } catch (error) {
                console.error("❌ Error fetching ERC-1155 approvals:", error);
            }
        };

        fetchApprovalStatus();
    }, [contractAddress]);

    /** Handle Revoking Approval */
    const handleRevoke = async () => {
        await revokeERC1155Approval(contractAddress);
        alert("Approval Revoked! Refreshing data...");
        window.location.reload();
    };

    return (
        <div>
            <h2>ERC-1155 Approvals</h2>
            {isApproved !== null ? (
                <ul>
                    <li>Global Approval: {isApproved ? "✅ Yes" : "❌ No"}</li>
                </ul>
            ) : (
                <p>Loading approvals...</p>
            )}

            {isApproved && (
                <button onClick={handleRevoke} style={{ marginTop: "10px", padding: "10px" }}>
                    Revoke Approval
                </button>
            )}
        </div>
    );
};

export default ERC1155Approvals;


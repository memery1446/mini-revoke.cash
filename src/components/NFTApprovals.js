import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, ZeroAddress } from "ethers"; // ✅ Ensure correct import
import { getERC721Approvals, revokeERC721Approval } from "../utils/nftApprovals"; // ✅ Import functions

const NFTApprovals = ({ contractAddress }) => {
    const [approvals, setApprovals] = useState(null);

    useEffect(() => {
        const fetchApprovals = async () => {
            if (!window.ethereum) {
                console.error("❌ MetaMask (or another wallet) is not installed!");
                return;
            }

            try {
                const provider = new BrowserProvider(window.ethereum); // ✅ Corrected reference
                const signer = await provider.getSigner();
                const ownerAddress = await signer.getAddress();

                const approvalsData = await getERC721Approvals(contractAddress, ownerAddress, provider);
                setApprovals(approvalsData);
            } catch (error) {
                console.error("❌ Error fetching approvals:", error);
            }
        };

        fetchApprovals();
    }, [contractAddress]);

    /** Handle Revoking Approval */
    const handleRevoke = async () => {
        await revokeERC721Approval(contractAddress, 1); // ✅ Example with Token ID 1
        alert("Approval Revoked! Refreshing data...");
        window.location.reload(); // ✅ Quick way to refresh UI state
    };

    return (
        <div>
            <h2>NFT Approvals</h2>
            {approvals ? (
                <ul>
                    <li>Global Approval: {approvals.isApprovedForAll ? "✅ Yes" : "❌ No"}</li>
                    <li>Token ID 1 Approval: {approvals.approvedForToken || "None"}</li>
                </ul>
            ) : (
                <p>Loading approvals...</p>
            )}

            {/* ✅ Add button to revoke approval */}
            {approvals && approvals.approvedForToken && (
                <button onClick={handleRevoke} style={{ marginTop: "10px", padding: "10px" }}>
                    Revoke Approval for Token ID 1
                </button>
            )}
        </div>
    );
};

export default NFTApprovals;



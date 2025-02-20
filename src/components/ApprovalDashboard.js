import React, { useState, useEffect } from "react";
import { batchRevokeERC20Approvals } from "../components/BatchRevoke";
import { batchRevokeERC721Approvals } from "../utils/nftApprovals";
import { batchRevokeERC1155Approvals } from "../utils/erc1155Approvals";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ABI } from "../constants/abis";
import { getERC20Approvals } from "../utils/erc20Approvals";


const ApprovalDashboard = ({ wallet, contractAddresses }) => {
    const [approvals, setApprovals] = useState([]);
    const [selectedApprovals, setSelectedApprovals] = useState([]);

    useEffect(() => {
        // Load approvals when component mounts
        fetchApprovals();
    }, []);

    const fetchApprovals = async () => {
        console.log("🔄 Fetching approvals...");
        const erc20Approvals = await getERC20Approvals(wallet);
        setApprovals(erc20Approvals);
    };

    const handleSelectApproval = (approval) => {
        setSelectedApprovals((prev) =>
            prev.includes(approval)
                ? prev.filter((a) => a !== approval)
                : [...prev, approval]
        );
    };

    const handleBatchRevoke = async () => {
        console.log("🚨 Revoking selected approvals...");
        await batchRevokeERC20Approvals(selectedApprovals.filter(a => a.type === "ERC-20").map(a => a.contract));
        await batchRevokeERC721Approvals(contractAddresses.erc721, selectedApprovals.filter(a => a.type === "ERC-721").map(a => a.tokenId));
        await batchRevokeERC1155Approvals(contractAddresses.erc1155);
        alert("Batch revocation complete!");
        fetchApprovals(); // Refresh approvals
    };

    const handleRevokeSingle = async (approval) => {
        console.log(`🚨 Revoking approval for ${approval.contract}...`);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(approval.contract, TOKEN_ABI, signer);

            const tx = await tokenContract.approve(approval.spender, 0);
            await tx.wait();
            console.log("✅ Single approval revoked!");

            fetchApprovals(); // Refresh approvals after revocation
        } catch (error) {
            console.error("❌ Error revoking approval:", error);
            alert("Error revoking approval: " + error.message);
        }
    };

    return (
        <div>
            <h2>Approval Dashboard</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Contract</th>
                        <th>Type</th>
                        <th>Spender</th>
                        <th>Approved Amount</th>
                        <th>Action</th> {/* New Column for Revoke Button */}
                    </tr>
                </thead>
                <tbody>
                    {approvals.map((approval, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" onChange={() => handleSelectApproval(approval)} />
                            </td>
                            <td>{approval.contract}</td>
                            <td>{approval.type}</td>
                            <td>{approval.spender}</td>
                            <td>{approval.amount}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleRevokeSingle(approval)}>
                                    🚨 Revoke
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedApprovals.length > 0 && (
                <button className="btn btn-warning" onClick={handleBatchRevoke}>
                    🚨 Revoke Selected Approvals
                </button>
            )}
        </div>
    );
};

export default ApprovalDashboard;



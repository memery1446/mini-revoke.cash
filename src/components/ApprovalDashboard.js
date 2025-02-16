import React, { useState, useEffect } from "react";
import { getERC20Approvals } from "../utils/erc20Approvals";
import { getERC721Approvals } from "../utils/nftApprovals";
import { getERC1155Approvals } from "../utils/erc1155Approvals";

const ApprovalDashboard = ({ wallet, contractAddresses }) => {
    const [approvals, setApprovals] = useState([]);
    const [selectedApprovals, setSelectedApprovals] = useState([]);

    const handleSelectApproval = (approval) => {
        setSelectedApprovals((prev) =>
            prev.includes(approval)
                ? prev.filter((a) => a !== approval)
                : [...prev, approval]
        );
    };

    const handleBatchRevoke = async () => {
        await batchRevokeERC20Approvals(selectedApprovals.filter(a => a.type === "ERC-20").map(a => a.contract));
        await batchRevokeERC721Approvals(contractAddresses.erc721, selectedApprovals.filter(a => a.type === "ERC-721").map(a => a.tokenId));
        await batchRevokeERC1155Approvals(contractAddresses.erc1155);
        alert("Batch revocation complete!");
    };

    return (
        <div>
            <h2>Approval Dashboard</h2>

            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Contract</th>
                        <th>Type</th>
                        <th>Spender</th>
                        <th>Approved Amount</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedApprovals.length > 0 && (
                <button onClick={handleBatchRevoke}>Revoke Selected Approvals</button>
            )}
        </div>
    );
};


export default ApprovalDashboard;

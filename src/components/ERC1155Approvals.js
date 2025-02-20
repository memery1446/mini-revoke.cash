import React, { useEffect, useState } from "react"; // Import React and Hooks
import { getERC1155Approvals } from "../utils/erc1155Approvals"; // Importing the function to get approvals

const ERC1155Approvals = ({ contractAddress, owner }) => {
    const [approvals, setApprovals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovals = async () => {
            try {
                // Log the contract address and owner before proceeding
                console.log("Fetching approvals using contract address:", contractAddress);
                console.log("Fetching approvals for owner:", owner);

                if (!contractAddress || !owner) {
                    throw new Error("Missing contract address or owner address");
                }

                const approvalsData = await getERC1155Approvals(owner); // Call with owner
                setApprovals(approvalsData || []);
            } catch (err) {
                console.error("❌ Error fetching ERC-1155 approvals:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovals();
    }, [contractAddress, owner]);

    return (
        <div>
            <h3>ERC-1155 Approvals</h3>
            {loading ? (
                <p>Loading approvals...</p>
            ) : error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : approvals.length === 0 ? (
                <p>No approvals found.</p>
            ) : (
                <ul>
                    {approvals.map((approval, index) => (
                        <li key={index}>
                            Spender: {approval.spender} | Approved: {approval.isApproved ? "✅" : "❌"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ERC1155Approvals; 
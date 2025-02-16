import React from "react";
import { batchRevokeERC20Approvals } from "../utils/erc20Approvals";
import { batchRevokeERC721Approvals } from "../utils/nftApprovals";
import { batchRevokeERC1155Approvals } from "../utils/erc1155Approvals";

const BatchRevoke = ({ erc20Contracts, erc721Contract, erc1155Contract, signer }) => {
    const handleBatchRevoke = async () => {
        await batchRevokeERC20Approvals(erc20Contracts, signer);
        await batchRevokeERC721Approvals(erc721Contract, signer, [1, 2, 3]); // Example token IDs
        await batchRevokeERC1155Approvals(erc1155Contract, signer);
        alert("All approvals revoked!");
    };

    return (
        <button onClick={handleBatchRevoke} style={{ marginTop: "10px", padding: "10px" }}>
            Revoke All Approvals
        </button>
    );
};

export default BatchRevoke;

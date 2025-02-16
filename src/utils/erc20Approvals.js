import { BrowserProvider, Contract } from "ethers";

/** Function to get ERC-20 Approvals */
export async function getERC20Approvals(tokenContracts, ownerAddress, provider) {
    const abi = ["function allowance(address owner, address spender) view returns (uint256)"];

    let approvals = [];

    for (let tokenAddress of tokenContracts) {
        const contract = new Contract(tokenAddress, abi, provider);
        
        const spenderAddresses = [
            "0xMarketplace1", // Example marketplace or contract using approvals
            "0xMarketplace2"
        ]; // ✅ Replace with known spender addresses

        for (let spender of spenderAddresses) {
            const allowance = await contract.allowance(ownerAddress, spender);
            if (allowance > 0) {
                approvals.push({
                    contract: tokenAddress,
                    type: "ERC-20",
                    spender: spender,
                    amount: allowance.toString()
                });
            }
        }
    }

    console.log("✅ ERC-20 Approvals Fetched:", approvals);
    return approvals;
}

/** Function to batch revoke ERC-20 approvals */
export async function batchRevokeERC20Approvals(tokenContracts, signer) {
    const abi = ["function approve(address spender, uint256 amount)"];

    console.log("⏳ Revoking multiple ERC-20 approvals...");

    for (let tokenAddress of tokenContracts) {
        const contract = new Contract(tokenAddress, abi, signer);

        const tx = await contract.approve("0x0000000000000000000000000000000000000000", 0); // ✅ Set allowance to zero
        await tx.wait();

        console.log(`✅ ERC-20 Approval Revoked for: ${tokenAddress}`);
    }

    console.log("✅ All ERC-20 approvals revoked!");
}


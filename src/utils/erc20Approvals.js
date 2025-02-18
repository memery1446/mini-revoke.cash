import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "../constants/abis"; // Adjust the import path as per your project structure

/** Function to get ERC-20 Approvals */
export async function getERC20Approvals(tokenContracts, ownerAddress, provider) {
    const abi = ["function allowance(address owner, address spender) view returns (uint256)"];
    let approvals = [];

    // Assuming you want to use the deployed token contracts for approvals
    const spenderAddresses = [
        CONTRACT_ADDRESSES.TK1, // Adding the token address itself or other valid spender addresses as needed
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" // This can stay as the test wallet
    ];

    try {
        // Validate owner address
        if (!ethers.utils.isAddress(ownerAddress)) {
            throw new Error(`Invalid owner address: ${ownerAddress}`);
        }
        const owner = ethers.utils.getAddress(ownerAddress);

        console.log("🔍 Debug: Token Contracts Input:", tokenContracts);

        for (let tokenAddress of tokenContracts) {
            if (!ethers.utils.isAddress(tokenAddress)) {
                console.error(`❌ Invalid token address: ${tokenAddress}`);
                continue;
            }

            // Create contract instance with the provider
            const contract = new ethers.Contract(tokenAddress, abi, provider); 

            for (let spender of spenderAddresses) {
                console.log(`🛠️ Checking allowance for spender: ${spender}`);
                try {
                    const allowance = await contract.allowance(owner, spender);
                    if (allowance.gt(0)) {
                        approvals.push({
                            contract: tokenAddress,
                            type: "ERC-20",
                            spender: spender,
                            amount: allowance.toString(),
                        });
                    }
                } catch (error) {
                    console.error(`❌ Error fetching allowance for spender: ${spender} on token: ${tokenAddress}`, error);
                }
            }
        }
    } catch (error) {
        console.error("❌ Error in getERC20Approvals function:", error);
    }

    return approvals;
}

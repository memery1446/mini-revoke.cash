import { ethers } from "ethers";

/** Function to get ERC-20 Approvals */
export async function getERC20Approvals(tokenContracts, ownerAddress, provider) {
    const abi = ["function allowance(address owner, address spender) view returns (uint256)"];
    let approvals = [];

    // Hardcoded spender address (update if necessary)
    const spenderAddresses = ["0x000000000000000000000000000000000000dead"];

    try {
        if (!ethers.utils.isAddress(ownerAddress)) {
            throw new Error(`Invalid owner address: ${ownerAddress}`);
        }
        const owner = ethers.utils.getAddress(ownerAddress);
        const signer = provider.getSigner();

        console.log("🔍 Debug: Token Contracts Input:", tokenContracts);

        for (let tokenAddress of tokenContracts) {
            if (!ethers.utils.isAddress(tokenAddress)) {
                console.error(`❌ Invalid token address: ${tokenAddress}`);
                continue;
            }

            try {
                const contract = new ethers.Contract(tokenAddress, abi, signer);

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
            } catch (error) {
                console.error(`❌ Error creating contract for token: ${tokenAddress}`, error);
            }
        }
    } catch (error) {
        console.error("❌ Error in getERC20Approvals function:", error);
    }

    return approvals;
}

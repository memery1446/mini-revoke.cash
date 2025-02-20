import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ABI } from "../../src/constants/abis"; // ✅ Fixed import structure

// ✅ Ensure the correct provider is always used
const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // ✅ Fallback to localhost

/** Function to get ERC-20 Approvals */
export async function getERC20Approvals(tokenContracts, ownerAddress, passedProvider = provider) {
    let approvals = [];

    // ✅ List of spender addresses to check
    const spenderAddresses = [
        CONTRACT_ADDRESSES.TK1, // ✅ Token contract itself
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" // ✅ Test wallet
    ];

    try {
        // ✅ Validate the owner address
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

            // ✅ Create contract instance with the correct provider
            const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, passedProvider);

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

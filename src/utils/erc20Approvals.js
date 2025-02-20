import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, TOKEN_ABI } from "../../src/constants/abis"; // ✅ Fixed import structure

// ✅ Ensure the correct provider is always used
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // ✅ Forces Hardhat fork
// ✅ Fallback to localhost

/** Function to get ERC-20 Approvals */
export async function getERC20Approvals(tokenContracts, ownerAddress, passedProvider = provider) {
    let approvals = [];

    // ✅ List of spender addresses to check
    const spenderAddresses = [
        CONTRACT_ADDRESSES.TK1, // ✅ Token contract itself
        "0x43c5df0c482c88cef8005389f64c362ee720a5bc" // ✅ Test wallet
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
console.log("🔍 Fetching ABI Methods...");
const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
console.log("✅ Contract ABI Methods:", contract.interface.fragments.map(f => f.name));

            for (let spender of spenderAddresses) {
                console.log("🔍 Checking ERC-20 Allowance...");
console.log("📌 Using Provider:", provider.connection.url);
console.log("📌 Token Address:", tokenAddress);
console.log("📌 Spender Address:", spender);
console.log("📌 Owner Address:", owner);
console.log("📌 Expected Network:", await provider.getNetwork());

                console.log(`🛠️ Checking allowance for spender: ${spender}`);
                console.log("🔍 Checking Provider Network...");
                const network = await provider.getNetwork();
                console.log("✅ Connected to Network ID:", network.chainId);

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

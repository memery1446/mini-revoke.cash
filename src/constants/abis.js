const { abi: tokenAllowanceManagerABI } = require('../artifacts/contracts/TokenAllowanceManager.sol/TokenAllowanceManager.json');
const { abi: testTokenABI } = require('../artifacts/contracts/TestToken.sol/TestToken.json');

export const TOKEN_ALLOWANCE_MANAGER_ABI = tokenAllowanceManagerABI;
export const TOKEN_ABI = testTokenABI;

export const CONTRACT_ADDRESSES = {
    TOKEN_ALLOWANCE_MANAGER: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    TK1: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    TK2: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
};


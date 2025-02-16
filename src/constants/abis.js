const { abi: testTokenABI } = require('../artifacts/contracts/TestToken.sol/TestToken.json');
const { abi: testNFTABI } = require('../artifacts/contracts/TestNFT.sol/TestNFT.json');
const { abi: testERC1155ABI } = require('../artifacts/contracts/TestERC1155.sol/TestERC1155.json');

module.exports = {
    TOKEN_ABI: testTokenABI,
    NFT_ABI: testNFTABI,
    ERC1155_ABI: testERC1155ABI,
    CONTRACT_ADDRESSES: {
        TK1: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        TK2: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        TestNFT: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        TestERC1155: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    }
};


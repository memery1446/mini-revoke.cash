const { abi: testTokenABI } = require('../artifacts/contracts/TestToken.sol/TestToken.json');
const { abi: testNFTABI } = require('../artifacts/contracts/TestNFT.sol/TestNFT.json');
const { abi: testERC1155ABI } = require('../artifacts/contracts/TestERC1155.sol/TestERC1155.json');

module.exports = {
    TOKEN_ABI: testTokenABI,
    NFT_ABI: testNFTABI,
    ERC1155_ABI: testERC1155ABI,
    
    CONTRACT_ADDRESSES: {
        TK1: "0xeF66010868Ff77119171628B7eFa0F6179779375",  // ✅ Updated TK1
        TK2: "0xd544d7A5EF50c510f3E90863828EAba7E392907A",  // ✅ Updated TK2
        TestNFT: "0x103416cfCD0D0a32b904Ab4fb69dF6E5B5aaDf2b",  // ✅ Updated NFT
        TestERC1155: "0x1F585372F116E1055AF2bED81a808DDf9638dCCD",  // ✅ Updated ERC1155
        MockSpender: "0x43c5DF0c482c88Cef8005389F64c362eE720A5bC"
    },

    NETWORK_CONFIG: {
        31337: {
            name: "Hardhat Local Fork",
            rpcUrl: "http://127.0.0.1:8545",
            contracts: {
                tokenManager: "0xeF66010868Ff77119171628B7eFa0F6179779375",  // ✅ TK1
                secondToken: "0xd544d7A5EF50c510f3E90863828EAba7E392907A",  // ✅ TK2
                erc721: "0x103416cfCD0D0a32b904Ab4fb69dF6E5B5aaDf2b",  // ✅ Updated NFT
                erc1155: "0x1F585372F116E1055AF2bED81a808DDf9638dCCD",   // ✅ Updated ERC1155
                MockSpender: "0x43c5DF0c482c88Cef8005389F64c362eE720A5bC"
            }
        },
        1: {
            name: "Ethereum Mainnet",
            rpcUrl: "https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY",
            contracts: {
                tokenManager: "0xYourEthereumTokenManager",
                erc721: "0xYourEthereumERC721",
                erc1155: "0xYourEthereumERC1155"
            }
        },
        56: {
            name: "Binance Smart Chain",
            rpcUrl: "https://bsc-dataseed.binance.org/",
            contracts: {
                tokenManager: "0xYourBSCManager",
                erc721: "0xYourBSCERC721",
                erc1155: "0xYourBSCERC1155"
            }
        },
        137: {
            name: "Polygon",
            rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
            contracts: {
                tokenManager: "0xYourPolygonTokenManager",
                erc721: "0xYourPolygonERC721",
                erc1155: "0xYourPolygonERC1155"
            }
        }
    }
};

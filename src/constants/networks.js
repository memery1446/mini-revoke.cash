export const NETWORK_CONFIG = {
  31337: {
    name: "Hardhat Local Fork",
    rpcUrl: "http://127.0.0.1:8545",
    contracts: {
      tokenManager: "0xeF66010868Ff77119171628B7eFa0F6179779375",  // ✅ TK1
      secondToken: "0xd544d7A5EF50c510f3E90863828EAba7E392907A",  // ✅ TK2
      erc721: "0x103416cfCD0D0a32b904Ab4fb69dF6E5B5aaDf2b",  // ✅ Updated NFT
      erc1155: "0x1F585372F116E1055AF2bED81a808DDf9638dCCD"   // ✅ Updated ERC1155
    }
  },
  1: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY",
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
    rpcUrl: "https://polygon-rpc.com/",
    contracts: {
      tokenManager: "0xYourPolygonTokenManager",
      erc721: "0xYourPolygonERC721",
      erc1155: "0xYourPolygonERC1155"
    }
  }
};


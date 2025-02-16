// contracts/TestNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNFT is ERC721 {
    constructor() ERC721("TestNFT", "TNFT") {
        // Mint an NFT to test with
        _mint(msg.sender, 1);
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol, uint8 decimals) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10**decimals); // Initial mint to deployer
    }

    // 🔥 Allow only the owner to mint new tokens
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Not authorized");
        _mint(to, amount);
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
}

}


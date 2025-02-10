// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenAllowanceManager {
    event AllowanceUpdated(address indexed token, address indexed owner, address indexed spender, uint256 amount);

    function getAllowance(address token, address owner, address spender) external view returns (uint256) {
        return IERC20(token).allowance(owner, spender);
    }

function setAllowance(address token, address spender, uint256 amount) external {
    IERC20 erc20 = IERC20(token);

    require(erc20.balanceOf(msg.sender) >= amount, "Insufficient token balance");
    
    // 🔥 Emit an event instead of calling `approve()`
    emit AllowanceUpdated(token, msg.sender, spender, amount);
}



function revokeAllowance(address token, address spender) external {
    // 🔥 Emit an event instead of calling `approve()`
    emit AllowanceUpdated(token, msg.sender, spender, 0);
}


}

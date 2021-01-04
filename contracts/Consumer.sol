// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "./IOracle.sol";

contract Consumer {
    IOracle public oracle;

    constructor(address _oracle) {
        oracle = IOracle(_oracle);
    }

    function foo() external view {
        bytes32 key = keccak256(abi.encodePacked("BTC/USD"));

        (bool result, uint256 timestamp, uint256 data) = oracle.getData(key);
        require(result == true, "could not get price");
        require(timestamp >= block.timestamp - 2 minutes, "price too old");
        // do something with price
    }
}

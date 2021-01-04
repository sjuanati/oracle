// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

interface IOracle {
    function getData(bytes32 key)
        external
        view
        returns (
            bool result,
            uint256 date,
            uint256 payload
        );
}

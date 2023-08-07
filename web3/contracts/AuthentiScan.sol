// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Types.sol";
import "./Verify.sol";
import "./Utils.sol";

// TODO: add mappings utils

contract AuthentiScan {
    mapping (address => Manufacturer) public manufacturers;

    constructor() {}

    function registerManufacturer(string memory _name) public {
        require(manufacturers[msg.sender].id == address(0), "Manufacturer already registerd");

        Manufacturer memory manufacturer;

        manufacturer.id = msg.sender;
        manufacturer.name = _name;
        manufacturer.isVerified = false;

        manufacturers[msg.sender] = manufacturer;

        // TODO: add manufacturer to unverified manufacturers mempool
        // TODO: impliment and emit events when manufacturer is added
    }
}
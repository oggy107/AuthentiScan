// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Utils.sol";
import "./Types.sol";

contract Verify is Ownable {
    address[] public trustedEntities;

    mapping (address => Manufacturer) public unverifiedManufacturers;

    // TODO: suggestion: we can also use opeenzeppelins Access Control contracts to impliement this
    function addTrustedEntity(address trustedEntityAddress) external onlyOwner {
        require(!Array.exists(trustedEntities, trustedEntityAddress), "This entity is already trusted");

        trustedEntities.push(trustedEntityAddress);
    }

    function removeTrustedEntity(address trustedEntityAddress) external onlyOwner {
        require(Array.exists(trustedEntities, trustedEntityAddress), "This enity is already not trusted");

        Array.remove(trustedEntities, trustedEntityAddress);
    }

    // TODO: return all unverified manufacturers
    function getUnverifiedManufacturers() external {
        
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Types.sol";
import "./Verify.sol";
import "./Utils.sol";

contract AuthentiScan {
    mapping (address => Manufacturer) public manufacturers;
    Verify verify;

    constructor() {
        verify = new Verify(msg.sender, address(this));
    }

    /**
     * Checks if manufacturer is registered on the platform or not
     * @param id if of the manufacturer
     * @return bool true if manufacturer is registered else false
     */
    function exists(address id) internal view returns (bool) {
        return manufacturers[id].id != address(0) ? true : false;
    }

    // TODO: impliment and emit events when manufacturer is added

    /**
     * @dev Register a new manufacturer
     * @param _name Name of the manufacturer
     */
    function registerManufacturer(string memory _name) external  {
        require(!exists(msg.sender), "Manufacturer already registerd");

        Manufacturer memory manufacturer;

        manufacturer.id = msg.sender;
        manufacturer.name = _name;
        manufacturer.isVerified = false;

        manufacturers[msg.sender] = manufacturer;

        // verify.addManufacturerToUnverifiedMempool(manufacturer);
        verify.addManufacturerToUnverifiedMempool(msg.sender);
    }

    /**
     * @dev Returns true if manufacturer is verified else false
     * @param id id of the manufacturer to verify
     * @return bool true if manufacturer is verified else false
     */
    function isVerified(address id) external view returns (bool) {
        require(exists(id), "Manufacturer is not registered. Please register manufacturer first");

        return manufacturers[id].isVerified;
    }

    /**
     * @dev Verifies the manufacturer and marks it as legitimate. This method can only be called by Verify contract after the voting from trusted entities
     * @param id id of the manufacturer to verify
     */
    function setVerificationTrue(address id) external {
        require(msg.sender == getVerifyContractAddress(), "Verification can only be set by Verify contract");

        manufacturers[id].isVerified = true;
    }

    function getUnverifiedManufacturers(address[] memory unverifiedManufacturers) public view returns (Manufacturer[] memory) {
        require(msg.sender == getVerifyContractAddress(), "This method can only be called by Verify contract");

        Manufacturer[] memory ret = new Manufacturer[](unverifiedManufacturers.length);

        for (uint i = 0; i < unverifiedManufacturers.length; i++) {
            ret[i] = manufacturers[unverifiedManufacturers[i]];
        }

        return ret;
    }

    /**
     * @dev Returns address of Verify contract
     * @return address address of Verify contract
     */
    function getVerifyContractAddress() public view returns (address) {
        return address(verify);
    }

    // TODO: Roadmap goes here after the verification of manufacturer is done
    // 1. Allow manufacturer to register product
}
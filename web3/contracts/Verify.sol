// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Utils.sol";
import "./Types.sol";
import "./AuthentiScan.sol";

contract Verify is Ownable {
    // array of trusted entities. Trusted entity can cast vote (once) to contribute to the process of making manufacturer verified.
    address[] trustedEntities;

    // mempool for unverified manufacturers
    mapping (address => Manufacturer) unverifiedManufacturers;
    address[] unverifiedManufacturersKeys;
    uint256 unverifiedManufacturersCount;

    // number of votes (manufacturer id => array of trusted entities who voted)
    mapping (address => address[]) votes;

    AuthentiScan authentiScan;

    constructor(address ownerAddress, address authentiScanAddress) {
        transferOwnership(ownerAddress);
        authentiScan = AuthentiScan(authentiScanAddress);
    }


    /**
     * @dev Add manufacturer to unverified mempool
     * @param manufacturer Manufacturer to add
     */
    function addManufacturerToUnverifiedMempool(Manufacturer memory manufacturer) public {
        require(!Array.exists(unverifiedManufacturersKeys, manufacturer.id), "This manufacturer has already been added to mempool");
        require(msg.sender == address(authentiScan), "This method can only be called by AuthentiScan Contract");

        unverifiedManufacturers[manufacturer.id] = manufacturer;
        unverifiedManufacturersKeys.push(manufacturer.id);
        unverifiedManufacturersCount++;
    }

    /**
     * @dev Remove manufacturer from unverified mempool
     * @param id id of manufacturer to remove
     */
    function removeManufacturerFromMemPool(address id) internal {
        require(Array.exists(unverifiedManufacturersKeys, id), "This manufacturer is not in unverfied mempool");
        Manufacturer memory manufacturer = unverifiedManufacturers[id];

        if (!manufacturer.isVerified) {
            manufacturer.isVerified = true;
        }

        delete unverifiedManufacturers[manufacturer.id];
        Array.remove(unverifiedManufacturersKeys, manufacturer.id);
        unverifiedManufacturersCount--;
    }

    /**
     * @dev Verifies manufacturer and removed it from unverified mempool
     * @param id id of manufacturer to verify
     */
    function markAsVerify(address id) internal {
        require(Array.exists(unverifiedManufacturersKeys, id), "This manufacturer is not in unverfied mempool");

        authentiScan.setVerificationTrue(id);
        removeManufacturerFromMemPool(id);
    }

    /**
     * @dev Evaluates the votes for the manufacturer casted by trusted entites. Marks the manufacturer as verified if casted votes are more than 50% of total trusted entites
     * @param id id of manufacturer whos votes have to be evaluated
     */
    function evaluateVotes(address id) internal {
        uint256 numberOfTrustedEntites = trustedEntities.length;
        uint256 totalNumberOfVotes = votes[id].length;

        if (totalNumberOfVotes > numberOfTrustedEntites / 2) {
            markAsVerify(id);
        }
    }

    /**
     * @dev Cast vote for a particular manufacturer to contribute to manufacturer verification
     * @param id id of manufacturer to cast vote for
     */
    function vote(address id) external {
        require(Array.exists(unverifiedManufacturersKeys, id), "This manufacturer is not in unverified pool. Hence you can not cast vote for it");
        require(Array.exists(trustedEntities, msg.sender), "This entity is not trusted. Hence it can not cast a vote");
        require(!Array.exists(votes[id], msg.sender), "This entity has already casted a vote");

        votes[id].push(msg.sender);
        evaluateVotes(id);
    }

    /**
     * @dev Returns all unverfied manufacturers (from unverified mempool).
     * @return Manufacturer[] unverified manufacturers array
     */
    function getUnverifiedManufacturers() external view returns (Manufacturer[] memory) {
        Manufacturer[] memory ret = new Manufacturer[](unverifiedManufacturersCount);

        for (uint i = 0; i < unverifiedManufacturersCount; i++) {
            ret[i] = unverifiedManufacturers[unverifiedManufacturersKeys[i]];
        }

        return ret;
    }

    // TODO: suggestion: we can also use opeenzeppelins Access Control contracts to impliement this

    /**
     * Mark entity as trusted
     * @param trustedEntityAddress public address of trusted entity
     */
    function addTrustedEntity(address trustedEntityAddress) external onlyOwner {
        require(!Array.exists(trustedEntities, trustedEntityAddress), "This entity is already trusted");

        trustedEntities.push(trustedEntityAddress);
    }

    /**
     * Mark entity as not trusted
     * @param trustedEntityAddress public address of trusted entity
     */
    function removeTrustedEntity(address trustedEntityAddress) external onlyOwner {
        require(Array.exists(trustedEntities, trustedEntityAddress), "This enity is already not trusted");

        Array.remove(trustedEntities, trustedEntityAddress);
    }
}
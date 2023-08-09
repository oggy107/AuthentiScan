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
    address[] unverifiedManufacturers;

    // number of votes (manufacturer id => array of trusted entities who voted)
    mapping (address => address[]) votes;

    AuthentiScan authentiScan;

    constructor(address ownerAddress, address authentiScanAddress) {
        transferOwnership(ownerAddress);
        authentiScan = AuthentiScan(authentiScanAddress);
    }

    /**
     * @dev Add manufacturer to unverified mempool
     * @param id id of manufacturer to add
     */
    function addManufacturerToUnverifiedMempool(address id) public {
        require(!Array.exists(unverifiedManufacturers, id), "This manufacturer has already been added to mempool");
        require(msg.sender == address(authentiScan), "This method can only be called by AuthentiScan Contract");

        unverifiedManufacturers.push(id);
    }

    /**
     * @dev Remove manufacturer from unverified mempool
     * @param id id of manufacturer to remove
     */
    function removeManufacturerFromMemPool(address id) internal {
        require(Array.exists(unverifiedManufacturers, id), "This manufacturer is not in unverfied mempool");
        Array.remove(unverifiedManufacturers, id);
    }

    /**
     * @dev Evaluates the votes for the manufacturer casted by trusted entites. Marks the manufacturer as verified if casted votes are more than 50% of total trusted entites
     * @param id id of manufacturer whos votes have to be evaluated
     */
    function evaluateVotes(address id) internal {
        uint256 numberOfTrustedEntites = trustedEntities.length;
        uint256 totalNumberOfVotes = votes[id].length;

        if (totalNumberOfVotes > numberOfTrustedEntites / 2) {
            authentiScan.setVerificationTrue(id);
            removeManufacturerFromMemPool(id);
        }
    }

    /**
     * @dev Cast vote for a particular manufacturer to contribute to manufacturer verification
     * @param id id of manufacturer to cast vote for
     */
    function vote(address id) external {
        require(Array.exists(unverifiedManufacturers, id), "This manufacturer is not in unverified pool. Hence you can not cast vote for it");
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
        return authentiScan.getUnverifiedManufacturers(unverifiedManufacturers);
    }

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
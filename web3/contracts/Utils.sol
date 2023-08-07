// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

library Array {
    /**
     * Returns true if address exists in array of addresses, false otherwise
     * @param array array of addresses
     * @param _address address which is to be searched
     * @return bool true if _address exists in array, false otherwise
     */
    function exists(address[] memory array, address _address) pure internal returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == _address) {
                return true;
            }
        }

        return false;
    }

    /**
     * @dev Returns the index of address from array of addresses, -1 if not found
     * @param array array of addresses
     * @param _address address to find index of
     * @return int index of address, -1 if not found
     */
    function indexOf(address[] memory array, address _address) internal pure returns (int256) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == _address) {
                return int256(i);
            }
        }

        return -1;
    }

    /**
     * @dev Removes the address from array of addresses
     * @param array array from which address has to be removed
     * @param _address address which is to be removed
     */
    function remove(address[] storage array, address _address) internal {
        int256 index = indexOf(array, _address);

        require(index != -1, "address provided does not exist as element in array");

        for (uint i = uint(index); i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }

        array.pop();
    }
}
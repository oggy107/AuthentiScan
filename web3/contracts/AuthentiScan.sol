// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Types.sol";
import "./Verify.sol";
import "./Utils.sol";

// TODO: impliment and emit events

contract AuthentiScan {
    using String for string;

    // manufacturer id => Manufacturer
    mapping (address => Manufacturer) public manufacturers;
    Verify verify;

    // manufacturer id => array of Product
    mapping (address => Product[]) products;
    // manufacturer id => array of product ids
    mapping (address => string[]) productIds;

    modifier onlyVerified {
        require(isVerified(msg.sender), "Only verified Manufacturers can call this method");

        _;
    }

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

        verify.addManufacturerToUnverifiedMempool(msg.sender);
    }

    /**
     * @dev Returns true if manufacturer is verified else false
     * @param id id of the manufacturer to verify
     * @return bool true if manufacturer is verified else false
     */
    function isVerified(address id) public view returns (bool) {
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
    // 1. Allow manufacturer to register product :DONE
    // 2. Do not allow the products with same id to be added more than once: DONE

    // ok so user will input product id to verify the product. But user has no concern with the manufacturer id
    // but we need manufacturer id to search and verify the product, because each manufacturer stores their own products.
    // proposed solutions:
    // #1: we make the manufacturer to include their manufacturer id on their website or on product itself and user need to enter manufacturer id as well as product id for verification
    // #2: idk??

    /**
     * @dev Register products
     * @param _products array of Product to be registerd
     */
    function registerProducts(Product[] memory _products) external onlyVerified {
        require(_products.length > 0, "products array must include at least one product");

        for (uint i = 0; i < _products.length; i++) {
            require(!ProductUtils.exists(productIds[msg.sender], _products[i].id), "Can not register multiple products with same id");

            products[msg.sender].push(_products[i]);
            productIds[msg.sender].push(_products[i].id);
        }
    }

    /**
     * @dev Get products registred by the manufacturer
     * @return Product[] array of registred products
     */
    function getProducts() external view onlyVerified returns (Product[] memory) {
        return products[msg.sender];
    }

    // TODO: write tests for the following

    /**
     * @dev Verify that the product is infact manufactured and registred by the manufacturer
     * @param manufacturerId manufacturer id
     * @param productId product id
     * @return (bool, Product) true and verified product if product is indeed verified, else false and empty product object
     */
    function verifyProduct(address manufacturerId, string memory productId) external view returns (Product memory) {
        require(exists(manufacturerId), "Manufacturer is not registered");

        Product[] memory _products = products[manufacturerId];

        for (uint i = 0; i < _products.length; i++) {
            if (_products[i].id.equals(productId)) {
                return _products[i];
            }
        }

        revert("Product is not register with by this manufacturer");
    }
}
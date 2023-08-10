// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

struct Manufacturer {
    address id;
    string name;
    bool isVerified;
}

struct Product {
    string id;
    string name;
}
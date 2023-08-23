// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

struct Manufacturer {
    address id;
    bool isVerified;
    string name;
    string registrationNo;
    string logo;
    string companyAddress;
    string email;
    string registrarName;
    string registrarId;
    string taxId;
}

struct Product {
    string id;
    string name;
}
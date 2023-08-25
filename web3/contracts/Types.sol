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
    uint regTime;
}

/** Product to be sent to externally */
struct ProductExternal {
    string id;
    string name;
    string description;
    string MFDDate;
    string EXPDate;
}

/** Internal Product implimentation */
struct Product {
    string id;
    string name;
    string description;
    string MFDDate;
    string EXPDate;
    uint regTime;
}
// deploy contracts on local chain i.e http://127.0.0.1:8545 and change folowing addresses

// local (form just me :>)
// 9b1f7F645351AF3631a656421eD2e40f2802E6c0 : authentiscan
// 4C65804f4b00a50e0750293973D7EAf32602587E : verify

// sepolia
// 61A6b6508C909DAA9A4B4f792A5C1ADb6C8D096c : authentiscan
// 49C39c6AFe4E41777B2B80A06a5F882292398E92 : verify

const config = {
    authentiscanContract: {
        address: "61A6b6508C909DAA9A4B4f792A5C1ADb6C8D096c",
        abi: [
            {
                inputs: [],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                ],
                name: "getManufacturer",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "id",
                                type: "address",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrationNo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "logo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "companyAddress",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "email",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarName",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarId",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "taxId",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Manufacturer",
                        name: "",
                        type: "tuple",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "getProducts",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "string",
                                name: "id",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "description",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "MFDDate",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "EXPDate",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Product[]",
                        name: "",
                        type: "tuple[]",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address[]",
                        name: "unverifiedManufacturers",
                        type: "address[]",
                    },
                ],
                name: "getUnverifiedManufacturers",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "id",
                                type: "address",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrationNo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "logo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "companyAddress",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "email",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarName",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarId",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "taxId",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Manufacturer[]",
                        name: "",
                        type: "tuple[]",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "getVerifiedManufacturers",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "id",
                                type: "address",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrationNo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "logo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "companyAddress",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "email",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarName",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarId",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "taxId",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Manufacturer[]",
                        name: "",
                        type: "tuple[]",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "getVerifyContractAddress",
                outputs: [
                    {
                        internalType: "address",
                        name: "",
                        type: "address",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                ],
                name: "isVerified",
                outputs: [
                    {
                        internalType: "bool",
                        name: "",
                        type: "bool",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "",
                        type: "address",
                    },
                ],
                name: "manufacturers",
                outputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                    {
                        internalType: "bool",
                        name: "isVerified",
                        type: "bool",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "registrationNo",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "logo",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "companyAddress",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "registrarName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "registrarId",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "taxId",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "regTime",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "string",
                        name: "_name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_registrationNo",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_logo",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_address",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_registrarName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_registrarId",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "_taxId",
                        type: "string",
                    },
                ],
                name: "registerManufacturer",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        components: [
                            {
                                internalType: "string",
                                name: "id",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "description",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "MFDDate",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "EXPDate",
                                type: "string",
                            },
                        ],
                        internalType: "struct ProductExternal[]",
                        name: "_products",
                        type: "tuple[]",
                    },
                ],
                name: "registerProducts",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                ],
                name: "setVerificationTrue",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "manufacturerId",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "productId",
                        type: "string",
                    },
                ],
                name: "verifyProduct",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "string",
                                name: "id",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "description",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "MFDDate",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "EXPDate",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Product",
                        name: "",
                        type: "tuple",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
        ] as const,
    },

    verifyContract: {
        address: "49C39c6AFe4E41777B2B80A06a5F882292398E92",
        abi: [
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "ownerAddress",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "authentiScanAddress",
                        type: "address",
                    },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "previousOwner",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "newOwner",
                        type: "address",
                    },
                ],
                name: "OwnershipTransferred",
                type: "event",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                ],
                name: "addManufacturerToUnverifiedMempool",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "trustedEntityAddress",
                        type: "address",
                    },
                ],
                name: "addTrustedEntity",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "getUnverifiedManufacturers",
                outputs: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "id",
                                type: "address",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
                            },
                            {
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrationNo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "logo",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "companyAddress",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "email",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarName",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "registrarId",
                                type: "string",
                            },
                            {
                                internalType: "string",
                                name: "taxId",
                                type: "string",
                            },
                            {
                                internalType: "uint256",
                                name: "regTime",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Manufacturer[]",
                        name: "",
                        type: "tuple[]",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "owner",
                outputs: [
                    {
                        internalType: "address",
                        name: "",
                        type: "address",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "trustedEntityAddress",
                        type: "address",
                    },
                ],
                name: "removeTrustedEntity",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "renounceOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "newOwner",
                        type: "address",
                    },
                ],
                name: "transferOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "id",
                        type: "address",
                    },
                ],
                name: "vote",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ] as const,
    },
};

export default config;

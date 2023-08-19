// deploy contracts on local chain i.e http://127.0.0.1:8545 and change folowing addresses

const config = {
    authentiscanContract: {
        address: "e78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab",
        abi: [
            {
                inputs: [],
                stateMutability: "nonpayable",
                type: "constructor",
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
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
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
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "isVerified",
                        type: "bool",
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
                        ],
                        internalType: "struct Product[]",
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
        address: "cC5f0a600fD9dC5Dd8964581607E5CC0d22C5A78",
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
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                internalType: "bool",
                                name: "isVerified",
                                type: "bool",
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

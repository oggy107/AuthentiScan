import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.21",

    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            chainId: 1337,
        },
        ganacheCli: {
            url: "http://127.0.0.1:8545",
            chainId: 1337,
        },
        sepolia: {
            url:
                "https://eth-sepolia.g.alchemy.com/v2/" +
                process.env.ALCHEMY_API_KEY,
            chainId: 11155111,
            accounts: [process.env.PRIVATE_KEY!],
        },
    },

    gasReporter: {
        enabled: true,
    },
};

export default config;

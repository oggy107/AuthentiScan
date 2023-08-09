import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.21",

    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            chainId: 1337,
        },
    },
};

export default config;

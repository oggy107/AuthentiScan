import { ethers } from "hardhat";

async function main() {
    const authentiScan = await ethers.deployContract("AuthentiScan");

    console.log(`AuthentiScan deployed to ${authentiScan.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

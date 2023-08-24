import { ethers } from "hardhat";

async function main() {
    const authentiScan = await ethers.deployContract("AuthentiScan");

    console.log(`AuthentiScan deployed to ${authentiScan.target}`);
    console.log(
        `Verify deployed to ${await authentiScan.getVerifyContractAddress()}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

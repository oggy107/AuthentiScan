import { ethers } from "hardhat";

async function main() {
    let authentiScan = await ethers.deployContract("AuthentiScan");

    authentiScan = await authentiScan.waitForDeployment();

    console.log(`AuthentiScan deployed to ${authentiScan.target}`);
    console.log(
        `Verify deployed to ${await authentiScan.getVerifyContractAddress()}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

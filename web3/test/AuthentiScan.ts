import { ethers } from "hardhat";
import chai from "chai";
import { AuthentiScan, Verify } from "../typechain-types";

describe("AuthentiScan", () => {
    const deploy = async () => {
        return await ethers.deployContract("AuthentiScan");
    };

    const deployVerify = async (authentiScanAddress: string) => {
        return await ethers.getContractAt("Verify", authentiScanAddress);
    };

    describe("Deployment", () => {
        it("Should deploy successfully", async () => {
            const authentiScan = await deploy();
            chai.expect(await authentiScan.getAddress()).to.not.be.null;
        });

        it("should deploy a verify contract", async () => {
            const authentiScan = await deploy();
            const verify = await deployVerify(
                await authentiScan.getVerifyContractAddress()
            );

            chai.expect(await verify.getAddress()).to.not.be.null;
        });
    });

    describe("Manufacturer Registration", () => {
        let authentiScan: AuthentiScan;
        let verify: Verify;

        const MANUFACTURER_NAME = "Toei";

        before(async () => {
            authentiScan = await deploy();
            verify = await deployVerify(
                await authentiScan.getVerifyContractAddress()
            );
        });

        it("should register a new manufacturer", async () => {
            const tx = await authentiScan.registerManufacturer(
                MANUFACTURER_NAME
            );
            const receipt = await tx.wait();
            chai.expect(receipt).to.not.be.null;

            if (receipt) {
                chai.expect(receipt.status).to.equal(1);
            }
        });

        it("should add manufacturer to unverified mempool", async () => {
            const manufacturers = await verify.getUnverifiedManufacturers();

            chai.expect(manufacturers.length).to.equal(1);
            chai.expect(manufacturers[0][1]).to.equal(MANUFACTURER_NAME);
        });

        it("should revert when trying to add same manufacturer twice", () => {
            chai.expect(
                authentiScan.registerManufacturer(MANUFACTURER_NAME)
            ).to.be.revertedWith("manufacturer already exists");
        });
    });

    describe("Manufacturer Verification", () => {
        let authentiScan: AuthentiScan;
        let verify: Verify;
        let accounts: Array<string> = [];

        const MANUFACTURER_NAME = "Toei";

        const cleanDeploy = async () => {
            const authentiScan = await deploy();
            const verify = await deployVerify(
                await authentiScan.getVerifyContractAddress()
            );

            return {
                authentiScan,
                verify,
            };
        };

        const registerManufacturer = async (authentiScan: AuthentiScan) => {
            const tx = await authentiScan.registerManufacturer(
                MANUFACTURER_NAME
            );

            await tx.wait();
        };

        before(async () => {
            authentiScan = await deploy();
            verify = await ethers.getContractAt(
                "Verify",
                await authentiScan.getVerifyContractAddress()
            );

            (await ethers.getSigners()).forEach((signer) => {
                accounts.push(signer.address);
            });

            const tx = await authentiScan.registerManufacturer(
                MANUFACTURER_NAME
            );

            await tx.wait();
        });

        it("should add trusted entity (once) and only by owner", async () => {
            const tx = await verify.addTrustedEntity(accounts[0]);

            const receipt = await tx.wait();
            chai.expect(receipt).to.not.be.null;

            if (receipt) {
                chai.expect(receipt.status).to.equal(1);
            }

            chai.expect(
                verify.addTrustedEntity(accounts[0])
            ).to.be.revertedWith("This entity is already trusted");

            chai.expect(
                verify
                    .connect(await ethers.getSigner(accounts[1]))
                    .addTrustedEntity(accounts[2])
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("should only allow trusted entities to vote and only once", async () => {
            const { authentiScan, verify } = await cleanDeploy();
            await registerManufacturer(authentiScan);
            const manufacturerId = accounts[0];

            await verify.addTrustedEntity(accounts[0]);

            const tx = await verify.vote(manufacturerId);

            const receipt = await tx.wait();
            chai.expect(receipt).to.not.be.null;

            if (receipt) {
                chai.expect(receipt.status).to.equal(1);
            }

            chai.expect(verify.vote(manufacturerId)).to.be.revertedWith(
                "This entity has already casted a vote"
            );

            chai.expect(
                verify
                    .connect(await ethers.getSigner(accounts[1]))
                    .vote(manufacturerId)
            ).to.be.revertedWith(
                "This entity is not trusted. Hence it can not cast a vote"
            );
        });

        it("should automatically verify manufacturer when more than 51% trusted entites vote", async () => {
            const { authentiScan, verify } = await cleanDeploy();
            await registerManufacturer(authentiScan);
            const manufacturerId = accounts[0];

            await verify.addTrustedEntity(accounts[0]);
            await verify.addTrustedEntity(accounts[1]);
            await verify.addTrustedEntity(accounts[2]);
            await verify.addTrustedEntity(accounts[3]);
            await verify.addTrustedEntity(accounts[4]);

            await verify
                .connect(await ethers.getSigner(accounts[0]))
                .vote(manufacturerId);

            chai.expect(await authentiScan.isVerified(manufacturerId)).to.be
                .false;

            await verify
                .connect(await ethers.getSigner(accounts[1]))
                .vote(manufacturerId);

            chai.expect(await authentiScan.isVerified(manufacturerId)).to.be
                .false;

            await verify
                .connect(await ethers.getSigner(accounts[2]))
                .vote(manufacturerId);

            chai.expect(await authentiScan.isVerified(manufacturerId)).to.be
                .true;
        });
    });
});

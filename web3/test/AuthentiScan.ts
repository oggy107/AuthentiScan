import { ethers } from "hardhat";
import chai from "chai";
import { AuthentiScan, Verify } from "../typechain-types";
import {
    ProductStruct,
    ProductStructOutput,
} from "../typechain-types/contracts/AuthentiScan";

describe("AuthentiScan", () => {
    const MANUFACTURER_NAME = "Toei";

    const deploy = async () => {
        return await ethers.deployContract("AuthentiScan");
    };

    const deployVerify = async (authentiScanAddress: string) => {
        return await ethers.getContractAt("Verify", authentiScanAddress);
    };

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

    const registerManufacturer = async (
        authentiScan: AuthentiScan,
        manufacturerId: string
    ) => {
        const tx = await authentiScan
            .connect(await ethers.getSigner(manufacturerId))
            .registerManufacturer(MANUFACTURER_NAME);

        await tx.wait();
    };

    const verifyManufacturer = async (
        verify: Verify,
        manufacturerId: string,
        trustedEntity: string,
        alreadyTrusted = false
    ) => {
        if (!alreadyTrusted) await verify.addTrustedEntity(trustedEntity);

        await verify
            .connect(await ethers.getSigner(trustedEntity))
            .vote(manufacturerId);
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
            await registerManufacturer(authentiScan, accounts[0]);
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
            await registerManufacturer(authentiScan, accounts[0]);
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

    describe("Product registraction", () => {
        let authentiScan: AuthentiScan;
        let verify: Verify;
        let accounts: Array<string> = [];

        before(async () => {
            (await ethers.getSigners()).forEach((signer) => {
                accounts.push(signer.address);
            });
        });

        beforeEach(async () => {
            const deployedContracts = await cleanDeploy();
            authentiScan = deployedContracts.authentiScan;
            verify = deployedContracts.verify;
        });

        it("should allow only verified manufacturer to register a products", async () => {
            const products_1: Array<ProductStruct> = [
                {
                    id: "101",
                    name: "toy",
                },
                {
                    id: "102",
                    name: "sky walker",
                },
                {
                    id: "103",
                    name: "fish",
                },
            ];

            const products_2: Array<ProductStruct> = [
                {
                    id: "104",
                    name: "bird",
                },
                {
                    id: "105",
                    name: "sky walker",
                },
                {
                    id: "106",
                    name: "dolphin",
                },
            ];

            chai.expect(
                authentiScan.registerProducts(products_1)
            ).to.be.revertedWith(
                "Manufacturer is not registered. Please register manufacturer first"
            );

            await registerManufacturer(authentiScan, accounts[0]);

            chai.expect(
                authentiScan.registerProducts(products_1)
            ).to.be.revertedWith(
                "Only verified Manufacturers can call this method"
            );

            await verifyManufacturer(verify, accounts[0], accounts[1]);

            const tx_1 = await authentiScan.registerProducts(products_1);

            const receipt_1 = await tx_1.wait();
            chai.expect(receipt_1).to.not.be.null;

            if (receipt_1) {
                chai.expect(receipt_1.status).to.equal(1);
            }

            const tx_2 = await authentiScan.registerProducts(products_2);

            const receipt_2 = await tx_2.wait();
            chai.expect(receipt_2).to.not.be.null;

            if (receipt_2) {
                chai.expect(receipt_2.status).to.equal(1);
            }
        });

        it("should not allow duplicate product and empty products array registration", async () => {
            const products: Array<ProductStruct> = [
                {
                    id: "101",
                    name: "toy",
                },
                {
                    id: "102",
                    name: "toy",
                },
                {
                    id: "103",
                    name: "toy",
                },
                {
                    id: "104",
                    name: "toy",
                },
            ];

            const duplicateProducts: Array<ProductStruct> = [
                {
                    id: "104",
                    name: "toy",
                },
                {
                    id: "105",
                    name: "toy",
                },
            ];

            await registerManufacturer(authentiScan, accounts[0]);
            await verifyManufacturer(verify, accounts[0], accounts[1]);

            await authentiScan.registerProducts(products);

            chai.expect(
                authentiScan.registerProducts(duplicateProducts)
            ).to.be.revertedWith(
                "Can not register multiple products with same id"
            );

            chai.expect(authentiScan.registerProducts([])).to.be.revertedWith(
                "products array must include at least one product"
            );
        });

        it("should only allow verified manufacturers to fetch their own products", async () => {
            const firstManufacturerProducts: Array<ProductStruct> = [
                {
                    id: "101",
                    name: "toy",
                },
                {
                    id: "102",
                    name: "toy",
                },
            ];

            const firstManufacturerOutput = [
                ["101", "toy"],
                ["102", "toy"],
            ];

            const secondManufacturerProducts: Array<ProductStruct> = [
                {
                    id: "abc",
                    name: "book",
                },
                {
                    id: "cde",
                    name: "cup",
                },
                {
                    id: "xyz",
                    name: "pen",
                },
            ];

            const secondManufacturerOutput = [
                ["abc", "book"],
                ["cde", "cup"],
                ["xyz", "pen"],
            ];

            const firstManufacturerId = accounts[0];
            const secondManufacturerId = accounts[3];

            await registerManufacturer(authentiScan, firstManufacturerId);
            await verifyManufacturer(verify, firstManufacturerId, accounts[1]);

            await registerManufacturer(authentiScan, secondManufacturerId);
            await verifyManufacturer(
                verify,
                secondManufacturerId,
                accounts[1],
                true
            );

            let registredProductsByFirstManufacturer = await authentiScan
                .connect(await ethers.getSigner(firstManufacturerId))
                .getProducts();

            chai.expect(registredProductsByFirstManufacturer).to.be.empty;

            await authentiScan
                .connect(await ethers.getSigner(firstManufacturerId))
                .registerProducts(firstManufacturerProducts);

            registredProductsByFirstManufacturer = await authentiScan
                .connect(await ethers.getSigner(firstManufacturerId))
                .getProducts();

            chai.expect(registredProductsByFirstManufacturer).to.deep.equal(
                firstManufacturerOutput
            );

            await authentiScan
                .connect(await ethers.getSigner(secondManufacturerId))
                .registerProducts(secondManufacturerProducts);

            chai.expect(
                await authentiScan
                    .connect(await ethers.getSigner(secondManufacturerId))
                    .getProducts()
            ).to.deep.equal(secondManufacturerOutput);
        });
    });
});

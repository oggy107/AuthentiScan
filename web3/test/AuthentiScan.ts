import { ethers } from "hardhat";
import chai from "chai";
import { AuthentiScan, Verify } from "../typechain-types";
import {
    ProductExternalStruct,
    ProductStruct,
    ProductStructOutput,
} from "../typechain-types/contracts/AuthentiScan";

describe("AuthentiScan", () => {
    const manufacturer = {
        name: "Toei",
        registrationNo: "101",
        logo: "https://dog.com/dog.png",
        address: "India punjab",
        email: "toei111@gmail.com",
        registrarName: "ABC",
        registrarId: "ABC_101",
        taxId: "toei_107101",
    };

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
            .registerManufacturer(
                manufacturer.name,
                manufacturer.registrationNo,
                manufacturer.logo,
                manufacturer.address,
                manufacturer.email,
                manufacturer.registrarName,
                manufacturer.registrarId,
                manufacturer.taxId
            );

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

        before(async () => {
            authentiScan = await deploy();
            verify = await deployVerify(
                await authentiScan.getVerifyContractAddress()
            );
        });

        it("should register a new manufacturer", async () => {
            const tx = await authentiScan.registerManufacturer(
                manufacturer.name,
                manufacturer.registrationNo,
                manufacturer.logo,
                manufacturer.address,
                manufacturer.email,
                manufacturer.registrarName,
                manufacturer.registrarId,
                manufacturer.taxId
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
            chai.expect(manufacturers[0][1]).to.equal(false);
            chai.expect(manufacturers[0][2]).to.equal("Toei");
            chai.expect(manufacturers[0][4]).to.equal(
                "https://dog.com/dog.png"
            );
            chai.expect(manufacturers[0][6]).to.equal("toei111@gmail.com");
            chai.expect(manufacturers[0][7]).to.equal("ABC");
            chai.expect(manufacturers[0][9]).to.equal("toei_107101");
        });

        it("should revert when trying to add same manufacturer twice", () => {
            chai.expect(
                authentiScan.registerManufacturer(
                    manufacturer.name,
                    manufacturer.registrationNo,
                    manufacturer.logo,
                    manufacturer.address,
                    manufacturer.email,
                    manufacturer.registrarName,
                    manufacturer.registrarId,
                    manufacturer.taxId
                )
            ).to.be.revertedWith("manufacturer already exists");
        });

        it("should return details of manufacturer", async () => {
            const a = (await ethers.getSigners())[0].address;
            const returnedManufacturer = await authentiScan.getManufacturer(a);

            chai.expect(returnedManufacturer[0]).to.equal(a);
            chai.expect(returnedManufacturer[1]).to.be.false;
            chai.expect(returnedManufacturer[2]).to.equal(manufacturer.name);
            chai.expect(returnedManufacturer[3]).to.equal(
                manufacturer.registrationNo
            );
            chai.expect(returnedManufacturer[4]).to.equal(manufacturer.logo);
            chai.expect(returnedManufacturer[5]).to.equal(manufacturer.address);
            chai.expect(returnedManufacturer[6]).to.equal(manufacturer.email);
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
                manufacturer.name,
                manufacturer.registrationNo,
                manufacturer.logo,
                manufacturer.address,
                manufacturer.email,
                manufacturer.registrarName,
                manufacturer.registrarId,
                manufacturer.taxId
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

        it("should return only verified manufacturers", async () => {
            const { authentiScan, verify } = await cleanDeploy();
            await registerManufacturer(authentiScan, accounts[0]);
            await registerManufacturer(authentiScan, accounts[1]);
            await registerManufacturer(authentiScan, accounts[2]);
            await registerManufacturer(authentiScan, accounts[3]);

            await verify.addTrustedEntity(accounts[4]);

            await verify
                .connect(await ethers.getSigner(accounts[4]))
                .vote(accounts[1]);

            await verify
                .connect(await ethers.getSigner(accounts[4]))
                .vote(accounts[2]);

            const returnedVerifiedManufacturers =
                await authentiScan.getVerifiedManufacturers();

            chai.expect(returnedVerifiedManufacturers).to.have.lengthOf(2);
            chai.expect(returnedVerifiedManufacturers[0][0]).to.equal(
                accounts[1]
            );
            chai.expect(returnedVerifiedManufacturers[1][0]).to.equal(
                accounts[2]
            );
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
            const products_1: Array<ProductExternalStruct> = [
                {
                    id: "101",
                    name: "toy",
                    description: "toy description",
                    MFDDate: "27-8-2021",
                    EXPDate: "",
                },
                {
                    id: "102",
                    name: "sky walker",
                    description: "this is luke baby",
                    MFDDate: "7-2-2020",
                    EXPDate: "",
                },
                {
                    id: "103",
                    name: "fish",
                    description: "my fish sank",
                    MFDDate: "7-2-2022",
                    EXPDate: "3-6-2023",
                },
            ];

            const products_2: Array<ProductExternalStruct> = [
                {
                    id: "104",
                    name: "bird",
                    description: "red bird",
                    MFDDate: "7-9-2022",
                    EXPDate: "3-6-2023",
                },
                {
                    id: "105",
                    name: "sky walker",
                    description: "walking the sky",
                    MFDDate: "7-1-2022",
                    EXPDate: "",
                },
                {
                    id: "106",
                    name: "dolphin",
                    description: "my dolphin is big",
                    MFDDate: "23-2-2022",
                    EXPDate: "3-7-2026",
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
            const products: Array<ProductExternalStruct> = [
                {
                    id: "101",
                    name: "toy",
                    description: "toy description",
                    MFDDate: "27-8-2021",
                    EXPDate: "",
                },
                {
                    id: "102",
                    name: "sky walker",
                    description: "this is luke baby",
                    MFDDate: "7-2-2020",
                    EXPDate: "",
                },
                {
                    id: "103",
                    name: "fish",
                    description: "my fish sank",
                    MFDDate: "7-2-2022",
                    EXPDate: "3-6-2023",
                },
            ];

            const duplicateProducts: Array<ProductExternalStruct> = [
                {
                    id: "105",
                    name: "sky walker",
                    description: "walking the sky",
                    MFDDate: "7-1-2022",
                    EXPDate: "",
                },
                {
                    id: "106",
                    name: "dolphin",
                    description: "my dolphin is big",
                    MFDDate: "23-2-2022",
                    EXPDate: "3-7-2026",
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
            const firstManufacturerProducts: Array<ProductExternalStruct> = [
                {
                    id: "105",
                    name: "sky walker",
                    description: "walking the sky",
                    MFDDate: "7-1-2022",
                    EXPDate: "",
                },
                {
                    id: "106",
                    name: "dolphin",
                    description: "my dolphin is big",
                    MFDDate: "23-2-2022",
                    EXPDate: "3-7-2026",
                },
            ];

            const firstManufacturerOutput = [
                ["105", "sky walker", "walking the sky", "7-1-2022", ""],
                [
                    "106",
                    "dolphin",
                    "my dolphin is big",
                    "23-2-2022",
                    "3-7-2026",
                ],
            ];

            const secondManufacturerProducts: Array<ProductExternalStruct> = [
                {
                    id: "101",
                    name: "toy",
                    description: "toy description",
                    MFDDate: "27-8-2021",
                    EXPDate: "",
                },
                {
                    id: "102",
                    name: "sky walker",
                    description: "this is luke baby",
                    MFDDate: "7-2-2020",
                    EXPDate: "",
                },
            ];

            const secondManufacturerOutput = [
                ["101", "toy", "toy description", "27-8-2021", ""],
                ["102", "sky walker", "this is luke baby", "7-2-2020", ""],
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

            chai.expect(registredProductsByFirstManufacturer[0][0]).to.equal(
                firstManufacturerOutput[0][0]
            );

            chai.expect(registredProductsByFirstManufacturer[0][1]).to.equal(
                firstManufacturerOutput[0][1]
            );

            chai.expect(registredProductsByFirstManufacturer[0][3]).to.equal(
                firstManufacturerOutput[0][3]
            );

            chai.expect(registredProductsByFirstManufacturer[0][4]).to.equal(
                firstManufacturerOutput[0][4]
            );

            await authentiScan
                .connect(await ethers.getSigner(secondManufacturerId))
                .registerProducts(secondManufacturerProducts);

            const registredProductsBySecondManufacturer = await authentiScan
                .connect(await ethers.getSigner(secondManufacturerId))
                .getProducts();

            chai.expect(registredProductsBySecondManufacturer[0][0]).to.equal(
                secondManufacturerOutput[0][0]
            );

            chai.expect(registredProductsBySecondManufacturer[0][1]).to.equal(
                secondManufacturerOutput[0][1]
            );

            chai.expect(registredProductsBySecondManufacturer[0][2]).to.equal(
                secondManufacturerOutput[0][2]
            );

            chai.expect(registredProductsBySecondManufacturer[0][3]).to.equal(
                secondManufacturerOutput[0][3]
            );
        });

        it("should allow consumer to verify product", async () => {
            const products: Array<ProductExternalStruct> = [
                {
                    id: "101",
                    name: "toy",
                    description: "toy description",
                    MFDDate: "27-8-2021",
                    EXPDate: "",
                },
                {
                    id: "102",
                    name: "sky walker",
                    description: "this is luke baby",
                    MFDDate: "7-2-2020",
                    EXPDate: "",
                },
            ];

            const manufacturerId = accounts[0];

            await registerManufacturer(authentiScan, manufacturerId);
            await verifyManufacturer(verify, manufacturerId, accounts[1]);
            await authentiScan.registerProducts(products);

            chai.expect(
                authentiScan.verifyProduct(manufacturerId, "107")
            ).to.be.revertedWith(
                "Product is not register with by this manufacturer"
            );

            const product = await authentiScan.verifyProduct(
                manufacturerId,
                "102"
            );

            chai.expect(product[0]).to.be.equal("102");
            chai.expect(product[1]).to.be.equal("sky walker");
            chai.expect(product[2]).to.be.equal("this is luke baby");
            chai.expect(product[3]).to.be.equal("7-2-2020");
            chai.expect(product[4]).to.be.equal("");
        });
    });
});

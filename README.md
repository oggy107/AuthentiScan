<h1 align="center">AuthentiScan</h1>

<h4 align="center">Fake product verification system</h4>

# Table of Contents
+ [About](#About)
+ [How it works?](#howitworks)
+ [Prerequisites](#prerequisites)
+ [Getting Started](#Setup)

## About <a name="About"></a>
- A blockchain-based fake product identification system is a technological solution designed to combat the proliferation of counterfeit goods in the market.
- By leveraging blockchain technology, this system aims to provide a secure, transparent, and tamper-proof way of verifying the authenticity of products throughout their supply chain journey.

## How it works? <a name="howitworks"></a>

**1. Product Registration**

Legitimate manufacturers or brand owners would register their products on the blockchain. Each product would be assigned a unique identifier or a digital signature, which could be in the form of a QR code, RFID tag, or another secure identifier.

**2. Data Integrity and Immutability**

Blockchain's decentralized and distributed nature ensures that once data is recorded, it cannot be altered or deleted without consensus from the network participants. This ensures the integrity of the information related to the product, reducing the chances of tampering and fraud.

**3. Verification by Consumers**

Consumers can easily verify the authenticity of a product by scanning the QR code or using a dedicated app. The app would access the blockchain to retrieve the product's history and verify if it matches the claimed journey. If any irregularities or inconsistencies are detected, consumers can be alerted to the possibility of a counterfeit product.

**4. Smart Contracts and Authentication**

Smart contracts could be implemented to automate the verification process. These contracts could be programmed to check various parameters such as product origin, manufacturing date, and distribution routes.

**5. Collaboration and Trust**

The blockchain-based system encourages collaboration among stakeholders, including manufacturers, distributors, retailers, and consumers. Each participant has a shared interest in maintaining the integrity of the system, reducing the incentive for counterfeit goods to enter the market.

## Prerequisites <a name="prerequisites"></a>
For Blockchain:
+ [Solidity](https://github.com/ethereum/solidity) - Smart Contracts
+ [Ethereum](https://www.ethereum.org/) - Blockchain Network
+ [Sepolia Faucet](https://sepoliafaucet.com/) - Create private Ethereum blockchain to run tests
+ [Hardhat](https://hardhat.org/) 

For Website:
+ TypeScript
+ Tailwind CSS
+ React

## Getting Started <a name="Setup"></a>

### Web3 (backend)

- Clone the project and change directory to web3

    ```shell
    git clone https://github.com/oggy107/AuthentiScan.git
    cd AuthentiScan/web3
    ```

- Install dependencies

  ```shell
  npm install
  ```

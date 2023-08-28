<h1 align="center">AuthentiScan</h1>


<p align="center">
  <img src="https://github.com/oggy107/AuthentiScan/blob/master/frontend/src/assets/logo.svg?raw=true" width="225px">
</p>


<h4 align="center">A fake product verification system</h4>

## Table of Contents
- [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Why](#why)
  - [Testing Phase](#testing-phase)
  - [How it works?](#how-it-works)
  - [Technologies Used](#technologies-used)
  - [Running Locally](#running-locally)
    - [Setting up backend (web3)](#setting-up-backend-web3)
    - [Setting up frontend](#setting-up-frontend)
  - [Roadmap](#roadmap)

## About
- A blockchain-based fake product identification system is a technological solution designed to combat the proliferation of counterfeit goods in the market.
- By leveraging blockchain technology, this system aims to provide a secure, transparent, and tamper-proof way of verifying the authenticity of products throughout their supply chain journey.

## Why

The absence of a blockchain-based fake product authentication system poses critical challenges to modern commerce. Without such a system, counterfeit products can proliferate unchecked, leading to financial losses for both consumers and brands. The lack of transparency and traceability in traditional supply chains allows fraudulent transactions to flourish, eroding consumer trust and damaging brand reputation. Additionally, the opacity of information along supply chains hinders effective accountability and responsiveness to issues such as recalls or quality concerns. The absence of tamper-resistant records leaves room for data manipulation and unauthorized alterations, leading to inaccurate product information and an inability to verify authenticity. Inefficient and time-consuming manual authentication processes further exacerbate the problem, causing delays, increased costs, and consumer skepticism. Overall, the absence of a blockchain-based authentication system magnifies the risks of counterfeit products, undermines transparency, and compromises the trust that underpins modern commerce.

## Testing Phase

***Note:*** *The app is currently in testing stage and has been deployed to **sepolia** an ethereum testnet. A test manufacturer named **Apple** has been registered and verified in test version of yhe app. A product also has been added by Apple with product id ***airpod123* which can be checked for authenicity.*

Manufacturer registered for testing: Apple
Product id: airpod123

## How it works?

**1. Manufacturer Registration**

Manufacturers can register on our platform and wait for verification process to complete. The veirfication is itself decentralized where trusted entties will vote for legitimacy of the manufacturer ensuring no fake manufacturer can register.

**2. Verification**

As stated earlier verification of manufacturer is done by number of trusted entites. They verify the manufacturer in every aspect and can aquire documents necessary for verification.
Trusted entites then vote for legitimacy of the manufacturer and once the threshold of 51% is
passed manufacturer will be marked as verified. Check [roadmap](#roadmap) for more info.

**2. Product Registration**

Once verified, legitimate manufacturers or brand owners would register their products on the blockchain. Each product would be assigned a unique identifier or a digital signature.

**3. Data Integrity and Immutability**

Blockchain's decentralized and distributed nature ensures that once data is recorded, it cannot be altered or deleted without consensus from the network participants. This ensures the integrity of the information related to the product, reducing the chances of tampering and fraud.

**4. Verification by Consumers**

Consumers can easily verify the authenticity of a product by scanning the QR code or using a dedicated app. The app would access the blockchain to retrieve the product's history and verify if it matches the claimed journey. If any irregularities or inconsistencies are detected, consumers can be alerted to the possibility of a counterfeit product.

**5. Smart Contracts and Authentication**

Smart contracts are implemented to automate the verification process. Once the votes by trusted enties reached 51% threashhold for a manufacturer, it will be automatically marked as verified

**6. Collaboration and Trust**

The blockchain-based system encourages collaboration among stakeholders, including manufacturers, distributors, retailers, and consumers. Each participant has a shared interest in maintaining the integrity of the system, reducing the incentive for counterfeit goods to enter the market.

## Technologies Used
For Blockchain:
+ [Solidity](https://github.com/ethereum/solidity) - Smart Contracts
+ [OpenZeppelin](https://www.openzeppelin.com/) - Smart Contract libraries
+ [Ethereum](https://www.ethereum.org/) - Blockchain network
+ [Hardhat](https://hardhat.org/) - Contract development framework

For Website:
+ TypeScript
+ Tailwind CSS
+ React
+ Wagmi
+ WalletConnect

## Running Locally

### Setting up backend (web3)

- Clone the project and change directory to web3

    ```shell
    git clone https://github.com/oggy107/AuthentiScan.git
    cd AuthentiScan/web3
    ```

- Install dependencies

  ```shell
  npm install
  ```

- Spinup local chain such as ganache and deploy contracts on chain

  ```shell
  npx hardhat run "./scripts/deploy.ts" --network [ ganache | ganacheCli ]
  ```
  ***Note:*** Note down the contract addresses shown on terminal. You will need them later to setup frontend

### Setting up frontend

- `cd` into frontend and install dependencies

  ```shell 
  cd frontend
  npm install
  ```

- Update the contract addresses in `/frontend/src/hooks/config.ts` with the contract addresses you noted in previous steps. The file should look something like this
  ```typescript
  const config = {
    authentiscanContract: {
      address: AUTHENTISCAN CONTRACT ADDRESS
      ...
    },
    verifyContract: {
      address: VERIFY CONTRACT ADDRESS
      ...
    },
  };
  ```

## Roadmap

We are looking to further improve our platform and ensure seamless experience for both manufacturers and consumers

**Verification process**

Currently the verification for manufacturer is done by number of trusted entites who verify the manufacturer and vote for it's legitimacy. Though this verification is done off chain and off app so there is no central place for trusted entites to look into documents collected during verification process. We are looking forward to store the manufacturer verification documents on chain and assing roles to trustedEntites for different areas of verification. This will ease up documentation lookup for trusted entites and roles will provide them directed approach for verification

**Pagination for large data fetching**

Pagination will soon become neccessary as our platform grows to ensure high responsiveness and most improtantly not reject the transactions due to large datasets. This can be implimented using simple offset(cursor) method in smart contract methods.

**Abilitiy for manufacturers to add products in bulk**

We know this is most needed feature so it is on top of our priority list. This will allow manufacturers to add products in bulk by submiting products through file such csv.

**UX improvements**

Various UX improvements are on their way such as ability to search verified manfacturers when checking product authenticity instead of selecting manufacturer from a dropdown.

**Make UI Mobile Friendly**

We are looking forward to make our app responsive and accessible on mobile platforms. This is also in our top priorities.

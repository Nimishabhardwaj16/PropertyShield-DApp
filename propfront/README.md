# 🏠 PropertyShield 🛡️

**Secure Real Estate Transactions with Blockchain**

PropertyShield is a decentralized application (DApp) that enables secure registration, listing, purchase requests, and ownership transfer of real estate properties on the Ethereum blockchain using Hoodi network. By deploying smart contracts, PropertyShield eliminates fraud, ensures transparent ownership records, and property transactions without relying on centralized systems.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Team Members](#-team-members)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation Instructions](#-installation-instructions)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Usage Guidelines](#-usage-guidelines)
- [Testing the System](#-testing-the-system)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)

---

##  Project Overview

Real estate transactions are traditionally slow, opaque, and vulnerable to fraud due to reliance on paper records and multiple intermediaries. **PropertyShield** solves this by recording every property's ownership, sale status, and transaction history directly on the Ethereum blockchain via a Solidity smart contract.

**Core features:**

- **Register Property** – Owners can register a new property on-chain with its location, type, and metadata hash (e.g., a hash of legal documents).
- **List Property for Sale** – Owners can mark their registered property as available for sale.
- **Request Purchase** – Interested buyers can raise a purchase request for a listed property.
- **Transfer Ownership** – Once a purchase is agreed upon, the current owner can transfer ownership to the requested buyer, updating the on-chain record instantly.
- **View Property Details** – Anyone can look up a property's full details (owner, location, type, sale status, requested buyer, registration date) using its Property ID.

The frontend is built with **React + Vite** and styled with **Tailwind CSS**, connecting to the blockchain via **MetaMask** and **ethers.js**. The smart contract is written in **Solidity** and deployed using **Hardhat** on the **Hoodi Ethereum testnet**.

---

## 👥 Team Members

--------------------------------------------------------------
| Name             | Institution           | Year     |Branch 
|------------------|-----------------------|----------|-------
| Vania Gupta      | JSS University, Noida | 2nd Year |CSE
| Nimisha Bhardwaj | JSS University, Noida | 2nd Year |IT
| Tanishq Agarwal  | JSS University, Noida | 2nd Year |CSE
| Adhyayan Maan    | JSS University, Noida | 2nd Year |CSE
--------------------------------------------------------------


## Tech Stack

**Smart Contract**
- Solidity `^0.8.34`
- Hardhat (with `@nomicfoundation/hardhat-toolbox-mocha-ethers`)
- Deployed on **Hoodi Testnet** (Chain ID: `560048`)

**Frontend**
- React (with Vite as the build tool)
- Tailwind CSS
- ethers.js (`v6`)
- MetaMask (wallet connection & transaction signing)

---

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js**– [Download (https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- **Git** – to clone the repository
- **MetaMask** browser extension – [Install (https://metamask.io/download/)
- A code editor such as **VS Code**
- Some **test ETH on the Hoodi testnet** in your MetaMask wallet, to pay gas fees for transactions (registering, listing, buying, transferring properties). Test ETH can be obtained from a Hoodi faucet.
- A **Hoodi RPC URL** (a public one is provided in the configuration steps below, or you can use a private RPC from providers like Alchemy/Infura if preferred).

---

## Installation Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd PropertyShield-DApp
```

### 2. Install Hardhat (smart contract) dependencies

```bash
cd hardhat
npm install
```

### 3. Install frontend dependencies

```bash
cd ../profront
npm install
```

---

## Configuration

### 1. Environment variables (Hardhat)

Inside the `hardhat` folder, create a `.env` file with the following variables:

```env
HOODI_RPC_URL=https://rpc.hoodi.ethpandaops.io
HOODI_PRIVATE_KEY=your_wallet_private_key_here

SEPOLIA_RPC_URL=your_sepolia_rpc_url_here
SEPOLIA_PRIVATE_KEY=your_sepolia_private_key_here
```

> **Never commit your `.env` file or expose your private key.** Make sure `.env` is listed in `.gitignore`.

### 2. Network setup in MetaMask

Add the **Hoodi Testnet** to MetaMask manually:

| Field | Value |
|---|---|
| Network Name | Hoodi Testnet |
| RPC URL | `https://rpc.hoodi.ethpandaops.io` |
| Chain ID | `560048` |
| Currency Symbol | ETH |
| Block Explorer | `https://hoodi.etherscan.io` |

Fund your MetaMask wallet with test ETH from a Hoodi faucet before interacting with the app.

### 3. Smart contract address

The frontend is already configured to point to the deployed contract:

```
0xD432f0A68841e8B826984E2804cfaEB0a521EaD3
```

If you redeploy the contract yourself (see below), update `contractAddress` in `profront/src/App.jsx` with your new contract's address.

---

## Running the Application

### Step 1: Compile the smart contract (optional, if modifying contract code)

```bash
cd hardhat
npx hardhat compile
```

### Step 2: Deploy the smart contract (optional, if you want a fresh deployment)

```bash
npx hardhat ignition deploy ./ignition/modules/PropertyShield.ts --network HOODI
```

Copy the deployed contract address and update it in `profront/src/App.jsx`.

### Step 3: Start the frontend development server

```bash
cd ../profront
npm run dev
```

The app will start on a local development URL (typically `http://localhost:5173`). Open it in your browser.

### Step 4: Connect your wallet

Click **Connect Wallet** in the app and approve the connection request in MetaMask. Make sure MetaMask is switched to the **Hoodi Testnet** before connecting.

---

## 📖 Usage Guidelines

Once your wallet is connected, you can interact with the following features:

### 1. Register a Property
- Fill in the **Property Location**, **Property Type**, and **Metadata Hash** fields.
- Click **Register Property**.
- Confirm the transaction in MetaMask.
- Wait for the transaction to be mined; the **Total Properties** count will update automatically.

### 2. List a Property for Sale
- Enter the **Property ID** of a property you own.
- Click **List**.
- Confirm the transaction in MetaMask.

### 3. Request to Purchase a Property
- Enter the **Property ID** of a listed property (must not be your own property).
- Click **Buy**.
- Confirm the transaction in MetaMask.

### 4. Transfer Ownership
- As the current owner, enter the **Property ID**.
- Click **Transfer** (only works if a buyer has already requested purchase).
- Confirm the transaction in MetaMask.

### 5. View Property Details
- Enter any **Property ID**.
- Click **View** to fetch and display full details: owner, location, type, sale status, requested buyer, and registration date.

---

##  Testing the System

To test the full property lifecycle end-to-end:

1. **Connect two different wallets** in MetaMask (e.g., Account 1 and Account 2), both funded with Hoodi test ETH to test both buying and selling.
2. **Using Account 1:** Register a property, then list it for sale using its Property ID.
3. **Switch to Account 2** in MetaMask, reconnect the wallet in the app, and request to purchase the listed property.
4. **Switch back to Account 1**, and transfer ownership to Account 2 (the requested buyer).
5. **Use View Property** at any stage to confirm the on-chain state matches what you expect (owner address, sale status, requested buyer).
6. You can also verify all transactions directly on the [Hoodi block explorer](https://hoodi.etherscan.io) by searching the contract address or your wallet address.

**Tip:** Keep the browser DevTools console open (F12) while testing — the app logs errors to the console, which is useful for debugging failed transactions.

---

##  Project Structure

```
PropertyShield-DApp/
├── hardhat/
│   ├── contracts/
│   │   └── PropertyShield.sol       # Smart contract source code
│   ├── ignition/
│   │   └── modules/                 # Deployment scripts
│   ├── hardhat.config.ts            # Hardhat network & compiler configuration
│   └── .env                         # RPC URLs & private keys (not committed)
│
└── profront/
    ├── src/
    │   ├── assets/
    │   │   └── Logo.png             # App logo
    │   ├── App.jsx                  # Main application component
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

##  Common Errors

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| "Wallet Connection Failed" | MetaMask on wrong network | Switch MetaMask to Hoodi Testnet (Chain ID `560048`) |
| Transactions stuck/pending | Insufficient test ETH for gas | Fund wallet via a Hoodi faucet |
| `propertyCount is not defined` error | Missing import in `App.jsx` | Ensure `Logo` and all contract variables are properly imported/declared |
| `CALL_EXCEPTION` / `missing revert data` | RPC inconsistency between MetaMask and provider | The app uses a dedicated read-only RPC provider to avoid this; ensure `readProvider` URL in `App.jsx` is reachable |
| Contract not found at address | Deployed to wrong network, or stale address in frontend | Verify contract address on [hoodi.etherscan.io](https://hoodi.etherscan.io) and update `contractAddress` in `App.jsx` if needed |
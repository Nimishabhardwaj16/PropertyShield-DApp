# PropertyShield DApp

## Project Overview

PropertyShield is a blockchain-based decentralized application (DApp) designed for property verification and ownership transfer.

The project aims to address issues such as fake ownership documents, identity fraud, duplicate property sales, and tampering with property records.

Each registered property is assigned a unique identity, while ownership and transfer records are maintained through Ethereum smart contracts, enabling transparent verification of property ownership and history.

## Problem Statement

Traditional property registration systems can be centralized, paper-based, and vulnerable to record tampering. Buyers may also face difficulties verifying the legitimate owner of a property before making a purchase.

PropertyShield provides a blockchain-based approach in which ownership records are tamper-resistant and ownership transfers are governed by smart-contract rules.

## Key Features

- Register properties on the blockchain
- Assign a unique identity to each property
- Verify property ownership
- Allow verified owners to list properties for sale
- Allow buyers to request purchases
- Require necessary approvals before ownership transfer
- Maintain an immutable ownership history
- Help detect document tampering using document hashes

## Technologies Used

- Ethereum Blockchain
- Solidity
- Smart Contracts
- Hardhat
- JavaScript
- React
- MetaMask
- HTML/CSS

## Team Project

This project was developed as part of a team during a Blockchain Technology Internship.

### My Contribution

- Developed and worked on the blockchain/smart-contract functionality
- Worked with Solidity and Remix IDE
- Contributed to frontend development
- Worked on frontend-blockchain integration
- Tested and debugged project functionality

## Team Members

- Vania Gupta
- Nimisha Bhardwaj
- Tanishq Agarwal
- Adhyayan Maan

## Main Smart Contract Functions

- `registerProperty()` — Registers a new property
- `verifyProperty()` — Verifies property information
- `listProperty()` — Lists a property for sale
- `requestPurchase()` — Allows a buyer to request a purchase
- `approveTransfer()` — Approves a property transfer
- `rejectTransfer()` — Rejects a transfer
- `transferOwnership()` — Transfers ownership to the buyer
- `getOwnershipHistory()` — Retrieves ownership history
- `cancelSale()` — Cancels a property sale

## Basic Workflow

1. The registrar registers a property.
2. A unique property identity is created.
3. The verified owner receives ownership.
4. The owner lists the property for sale.
5. A buyer submits a purchase request.
6. Required documents and approvals are verified.
7. The smart contract completes the ownership transfer.
8. The ownership history is updated on the blockchain.

## Smart Assets

Each registered property is represented as a unique digital asset.

Property information may include:

- Property ID
- Owner wallet address
- Registration date
- Location
- Property type
- Metadata/document hash
- Ownership history

## User Roles

### Registrar
- Register properties
- Verify documents
- Approve transfers

### Property Owner
- View property
- List property for sale
- Approve sale

### Buyer
- Verify ownership
- Request purchase
- View transaction status

### Public Verifier
- Verify the current owner
- Verify property authenticity
- View blockchain records

## Prerequisites

- Node.js
- npm
- Git
- MetaMask
- A modern web browser

## Installation

Clone the repository:

```bash
git clone
https://github.com/Nimishabhardwaj16/PropertyShield-DApp.git

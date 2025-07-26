# Ascey Platform 🚀

## Overview

**Ascey** is a next-generation blockchain platform revolutionizing the way Real World Assets (RWA) are tokenized and traded. Built on the Internet Computer Protocol (ICP) with Rust, we specialize in tokenizing shares from the EGX30 index, bridging traditional finance with blockchain innovation.

---

## Key Features

### ⚡ Real-Time Settlement
- Instant transaction finality
- Zero delays in trade execution
- Automated settlement processes

### 🌍 Fractional Ownership
- Democratic access to high-value assets
- Minimum investment thresholds as low as $1
- Liquid secondary market trading

### ✅ Regulatory Compliance
- Full compliance with Egyptian Financial Regulatory Authority
- KYC/AML integration
- Transparent audit trails

### 🔒 Security
- Built on Internet Computer's secure infrastructure
- Multi-signature authorization
- Real-time monitoring and alerts

---

## Business Impact

Ascey revolutionizes asset trading through:
- **Speed**: Transaction settlement in seconds, not days
- **Access**: Democratized investment opportunities via fractional ownership
- **Innovation**: Seamless integration of DeFi tools with traditional finance
- **Cost**: Reduced operational overhead and transaction fees
- **Transparency**: Complete audit trail of all transactions

---

## Architecture Overview

Built on the Internet Computer with Rust SDK, Ascey ensures performance, scalability, and decentralization while handling complex financial transactions securely.

### Backend Canisters

#### `ascey_backend`
- **Path**: `src/ascey_backend/ascey_backend.did`  
- **Type**: Rust  
- **Role**: Core logic hub managing token lifecycle, buy/sell operations, swaps, and integration with ledger/index canisters.

#### `xrc`
- **Path**: `xrc/xrc.did`  
- **Role**: Provides real-time exchange rates via aggregated data for accurate pricing.

#### `icrc1_ledger`
- **Path**: Remote  
- **Role**: BELLA token lifecycle management — issuance, transfers, and balances — using the ICRC1 standard.

#### `icrc1_index`
- **Path**: Remote  
- **Role**: Enables transaction querying and indexing for BELLA tokens.

#### `tommy_icrc1_ledger` & `tommy_icrc1_index`
- **Role**: Equivalent functionality to BELLA, specific to the "Tommy" token.

#### `icp_ledger`
- **Path**: Remote  
- **Role**: Handles ICP token transactions including transfers and logging.

#### `icp_index`
- **Role**: Indexes ICP token transactions for transparency and reporting.

#### `internet_identity`
- **Path**: Remote  
- **Role**: Provides decentralized authentication for secure user identity management.

---

### Frontend

- **Type**: Static assets  
- **Role**: UI served via Internet Computer, fully integrated with backend canisters for a seamless user experience.

---

## Getting Started

### Prerequisites

- [Install DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- Node.js & npm
- Rust toolchain (`rustup`, `cargo`, etc.)

---

## Project Setup

Run the provided script to initialize the project:

```bash
./setup_project.sh

# Hardhat Project

This is the first part focusing on the core smart contracts. The key features implemented:
NFT-based model ownership
Private access control using Sapphire
Secure marketplace functionality
Encrypted access key management


Added proper key generation using Sapphire's Curve25519 functions
Fixed the encryption process using proper nonce and symmetric key
Removed the invalid type conversion

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

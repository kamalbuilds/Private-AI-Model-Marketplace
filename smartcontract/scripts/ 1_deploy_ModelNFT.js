const { network } = require("hardhat");
require("dotenv").config();

async function main() {
  // deployer
  const [deployer] = await ethers.getSigners();
  console.log(`[${network.name}] Deployer:`, deployer.address);

  // deploy ModelNFT
  const ModelNFTContract = await ethers.getContractFactory("ModelNFT");
  const ModelNFT = await ModelNFTContract.deploy();
  await ModelNFT.deployed();
  console.log(`[${network.name}] Deployed ModelNFT:`, ModelNFT.address);

  // Save the address
  console.log('Saving contract address to .env file...');
  const fs = require('fs');
  fs.appendFileSync('.env', `\nMODEL_NFT_ADDRESS=${ModelNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
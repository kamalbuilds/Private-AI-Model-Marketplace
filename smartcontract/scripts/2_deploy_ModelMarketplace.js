const { network } = require("hardhat");
require("dotenv").config();

async function main() {
  const modelNFTAddress = process.env.MODEL_NFT_ADDRESS;
  console.log("[sapphire_testnet] ModelNFT address:", modelNFTAddress);
  if (!modelNFTAddress) {
    throw new Error("[sapphire_testnet] Invalid ModelNFT address");
  }

  // deployer
  const [deployer] = await ethers.getSigners();
  console.log(`[${network.name}] Deployer:`, deployer.address);

  // deploy ModelMarketplace
  const ModelMarketplaceContract = await ethers.getContractFactory("ModelMarketplace");
  const ModelMarketplace = await ModelMarketplaceContract.deploy(modelNFTAddress);
  await ModelMarketplace.deployed();
  console.log(`[${network.name}] Deployed ModelMarketplace:`, ModelMarketplace.address);

  // Save the address
  console.log('Saving contract address to .env file...');
  const fs = require('fs');
  fs.appendFileSync('.env', `\nMODEL_MARKETPLACE_ADDRESS=${ModelMarketplace.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
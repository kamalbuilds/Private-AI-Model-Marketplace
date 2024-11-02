// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "./ModelNFT.sol";

contract ModelMarketplace is ReentrancyGuard {
    ModelNFT public nft;
    
    struct Purchase {
        address buyer;
        uint256 modelId;
        uint256 timestamp;
        bytes encryptedKey;
    }

    mapping(uint256 => Purchase[]) private purchases;
    mapping(uint256 => uint256) public modelPrices;
    
    event ModelPurchased(uint256 indexed modelId, address indexed buyer);
    event ModelListed(uint256 indexed modelId, uint256 price);

    constructor(address _nftAddress) {
        nft = ModelNFT(_nftAddress);
    }

    function listModel(uint256 modelId, uint256 price) external {
        require(nft.ownerOf(modelId) == msg.sender, "Not the model owner");
        modelPrices[modelId] = price;
        emit ModelListed(modelId, price);
    }

    function purchaseModel(uint256 modelId) external payable nonReentrant {
        uint256 price = modelPrices[modelId];
        require(price > 0, "Model not listed");
        require(msg.value >= price, "Insufficient payment");
        
        // Generate encrypted key using Sapphire's random number generator
        bytes memory key = new bytes(32);
        uint256 random = uint256(Sapphire.randomBytes(32, ""));
        assembly {
            mstore(add(key, 32), random)
        }
        
        purchases[modelId].push(Purchase({
            buyer: msg.sender,
            modelId: modelId,
            timestamp: block.timestamp,
            encryptedKey: key
        }));

        // Transfer payment to model owner
        payable(nft.ownerOf(modelId)).transfer(msg.value);
        
        emit ModelPurchased(modelId, msg.sender);
    }

    function getModelAccess(uint256 modelId) external view returns (bytes memory) {
        require(msg.sender == nft.ownerOf(modelId), "Not authorized");
        
        for(uint i = 0; i < purchases[modelId].length; i++) {
            if(purchases[modelId][i].buyer == msg.sender) {
                return purchases[modelId][i].encryptedKey;
            }
        }
        
        revert("Access key not found");
    }
}
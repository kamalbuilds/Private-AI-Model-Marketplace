// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract ModelNFT is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    struct ModelMetadata {
        string name;
        string description;
        string modelType;
        string framework;
        uint256 price;
        bytes32 encryptedIPFSHash;
        bytes32 sampleDataHash;
        bytes evaluationMetrics;
    }

    mapping(uint256 => ModelMetadata) public models;
    uint256 private _tokenIdCounter;
    
    event ModelMinted(uint256 indexed tokenId, address indexed creator);
    event AccessGranted(uint256 indexed tokenId, address indexed user);

    constructor() ERC721("AI Model", "AIM") {
        _tokenIdCounter = 1;
    }

    function mintModel(
        string memory name,
        string memory description,
        string memory modelType,
        string memory framework,
        uint256 price,
        bytes32 encryptedIPFSHash,
        bytes32 sampleDataHash,
        bytes memory evaluationMetrics
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);

        models[tokenId] = ModelMetadata({
            name: name,
            description: description,
            modelType: modelType,
            framework: framework,
            price: price,
            encryptedIPFSHash: encryptedIPFSHash,
            sampleDataHash: sampleDataHash,
            evaluationMetrics: evaluationMetrics
        });

        emit ModelMinted(tokenId, msg.sender);
        return tokenId;
    }

    // Override functions to fix compilation errors
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
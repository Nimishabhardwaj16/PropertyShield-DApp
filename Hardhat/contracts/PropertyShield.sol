//SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;
contract PropertyShield {
struct Property {
    uint256 propertyId;
    address owner;
    string location;
    string propertyType;
    uint256 registrationDate;
    string metadataHash;
    bool isForSale;
    address requestedBuyer;
}
mapping(uint256 => Property) public properties;
uint256 public propertyCount;
function registerProperty(
    string memory _location,
    string memory _propertyType,
    string memory _metadataHash
) public {
propertyCount++;
properties [propertyCount] = Property({
    propertyId: propertyCount,
    owner: msg.sender,
    location: _location,
    propertyType: _propertyType,
    registrationDate: block.timestamp,
    metadataHash: _metadataHash,
    isForSale: false,
    requestedBuyer: address(0)
});
}
function listProperty(uint256 _propertyId)
public {  
    require(properties[_propertyId].owner == msg.sender, "You are not the owner");
    properties[_propertyId].isForSale = true;
}
function requestPurchase (uint256 _propertyId) public { 
    require(properties[_propertyId].isForSale, "Property is not for sale" );
    require(properties[_propertyId].owner != msg.sender, "Owner cannot buy own property");
    properties[_propertyId].requestedBuyer = msg.sender;
}
function transferOwnership(uint256 _propertyId)
public{
    require(properties[_propertyId].owner == msg.sender, "Only owner can transfer");
    require(properties [_propertyId].requestedBuyer != address(0), "No buyer requested");
    properties[_propertyId].owner=properties[_propertyId].requestedBuyer; 
    properties[_propertyId].requestedBuyer=address(0); 
    properties[_propertyId].isForSale = false;
    }
}
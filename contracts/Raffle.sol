//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

//Raffle__NotEnoughETHEntered();

contract Raffle{

    uint256 private immutable entranceFee;

    constructor(uint256 _entranceFee){
        entranceFee = _entranceFee;
    }

    function getEntranceFee() external view returns(uint256){
        return entranceFee;  
    }

    function enterRaffle() public payable{
        require(msg.value >= entranceFee, "Not enough ETH entered!");
    }

}
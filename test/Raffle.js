const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Raffle contract", () => {

  const deployRaffleFixture = async () => {
    const raffleFactory = await ethers.getContractFactory("Raffle");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const raffle = await raffleFactory.deploy(2);
    await raffle.deployed();
    return { raffleFactory, raffle, owner, addr1, addr2 };
  };

  it("Should set the correct entrance fee",async()=>{
    const{raffle} = await loadFixture(deployRaffleFixture)
    const entranceFee = await raffle.getEntranceFee()
    expect(entranceFee).to.equal(2);
  })

  it("Should enforce the entrance fee",async()=>{
    const{raffle} = await loadFixture(deployRaffleFixture)
    expect (await raffle.enterRaffle({value:1*10**18})).to.be.revertedWith("Not enough ETH entered!")
  })
});

const hre = require("hardhat");
require('dotenv').config();

async function main() {

  const Fees = await hre.ethers.getContractFactory("Fees");
  const FeesContract = await Fees.deploy("0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f", process.env.OWNER);

  await FeesContract.deployed();


  console.log(
    `Fees Contract deployed to: ${FeesContract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  const DAppDrive = await hre.ethers.getContractFactory("DAppDrive");
  const dappDrive = await DAppDrive.deploy();

  await dappDrive.deployed();

  console.log(
    `DAppDrive deployed to ${dappDrive.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

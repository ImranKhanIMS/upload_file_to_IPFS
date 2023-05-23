require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artififacts',
  },

  networks: {
    hardhat: {
      chainId: 31337,
    }
  }
};
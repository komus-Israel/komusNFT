require("@nomiclabs/hardhat-ethers");
require('dotenv').config()


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {API_URL, PRIVATE_KEY} = process.env
module.exports = {
  solidity: "0.8.4",
  defaultNetWork: "rinkeby",
  networks: {
    rinkeby:{
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }

};

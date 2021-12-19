require('dotenv').config()

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contractAbi = require("../artifacts/contracts/NFT.sol/KOMUSNFT.json")
const contractAddress = "0x5AeEe78e96c2F085B57CFCd4C048C9c2F5d5EC9A"
const nftContract = new web3.eth.Contract(contractAbi.abi, contractAddress)

async function mintNFT(tokenURL){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURL).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx)=> {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log("The hash of your transaction is: ", hash, "\ncheck Alchemy's mempoool to view the status of your transaction")

                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                          )
                    }
                }
        )
    })
    .catch((err)=>{
        console.log("promise failed:", err)
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmQiMZx99tUXo7xUjaFrozw8AqGQSutSMi9mM5Cdr9Wsst")
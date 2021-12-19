const { ethers } = require("hardhat")

const main=async()=>{
    const KNFT = await ethers.getContractFactory('KOMUSNFT');

    //start deloyment, returning a promise that resolves to a contract object

    const knft = await KNFT.deploy();

    console.log("Contract deloyed to address:", knft.address)
}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err)
        process.exit(0)
    })


    // Contract deloyed to address: 0x20930248b6B261aA06e416DA533286C5BD43a5a0

    //0xC2bA12980DEf6d54B62EfDf06331DD9B6eAC0432

    //0x5AeEe78e96c2F085B57CFCd4C048C9c2F5d5EC9A



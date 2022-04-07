const main = async () => {

  const nft_contract_factory = await hre.ethers.getContractFactory('RugsNFTCollection'); // get the contract
  const nft_contract = await nft_contract_factory.deploy(); // deploy --> convert to computer language
  await nft_contract.deployed(); // wait for it to deploy
  console.log("Contract deployed to:", nft_contract.address);

  let txn = await nft_contract.createRugsNFT() // mint the nft
  await txn.wait() // wait for the mint

  txn = await nft_contract.createRugsNFT() // mint another nft (we set 2 as the max supply, can't mint more)
  await txn.wait() // wait for the mint

}

const run_main = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

run_main()

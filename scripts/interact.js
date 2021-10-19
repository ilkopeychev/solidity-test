const hre = require("hardhat");

const run = async function () {
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const latestBlock = await provider.getBlock("latest");
  console.log(latestBlock.hash);
  const balance = await wallet.getBalance();

  console.log(balance.toString());
  console.log(hre.ethers.utils.formatEther(balance, 18));
};

run();

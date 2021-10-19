const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");
const run = async function () {
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const electionContract = new hre.ethers.Contract(
    "0x618DA93508F90C486653A96d689f27A95fDD3F9E",
    USElection.abi,
    wallet
  );
  console.log(electionContract);

  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);
  const transactionReceipt = await transactionOhio.wait();
  if (transactionReceipt.status != 1) {
    // 1 means success
    console.log("Transaction was not successfull");
    return;
  }
  const currentLeader = await electionContract.currentLeader();
  console.log("Current leader", currentLeader);

  const hasEnded = await electionContract.electionEnded();
  console.log("The election has ended:", hasEnded);

  const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
  console.log("Have results for Ohio:", haveResultsForOhio);
};

run();

const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "6c17c4a175c64100b9d624c48f8e0a80"
  );

  const wallet = new hre.ethers.Wallet(
    "96bd1a183b1a8452ccd3f3aacdeed094551c06b5185919521ef2be7f5621206b",
    provider
  );
  const balance = await wallet.getBalance();

  const electionContract = new hre.ethers.Contract(
    "0x618DA93508F90C486653A96d689f27A95fDD3F9E",
    USElection.abi,
    wallet
  );

  const transactionOhio = await electionContract.submitStateResult([
    "Miami",
    250,
    150,
    24,
  ]);
  console.log("State Result Submission Transaction:", transactionOhio.hash);
  const transactionReceipt = await transactionOhio.wait();
  if (transactionReceipt.status != 1) {
    console.log("Transaction was not successfull");
    return;
  }

  const resultsSubmittedOhioNew = await electionContract.resultsSubmitted(
    "Miami"
  );
  console.log("Results submitted for Miami", resultsSubmittedOhioNew);

  const currentLeader = await electionContract.currentLeader();
  console.log("Current leader", currentLeader);
};

run();

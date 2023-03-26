const ethers = require('ethers');
const axios = require('axios');
const TrackerState = require('../models/tracker_state');
const EventDeadLetterQueue = require('../models/event_deadletter_queue');
const InsuranceAbi = require('../abi/Insurance.json');
ALCHEMY_API = process.env.ALCHEMY_API;
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API);
const apiEndPoint = process.env.API_ENDPOINT;
const loadContract = () => {
  let abi = InsuranceAbi;
  let address = process.env.CONTRACT_ADDRESS;
  return new ethers.Contract(address, abi, provider);
};
const insurance = loadContract();
console.log(`apiEndPoint: ${apiEndPoint}`);
const callAPI = async (endpoint, data, method) => {
  try {
    await axios({
      method,
      url: apiEndPoint + endpoint,
      data,
    });
  } catch (err) {
    if (err && err.response && err.response.status === 400) {
      console.warn(
        `[bad-request] add event to dead-letter-queue, txHash: ${data.transactionHash}`
      );
      await EventDeadLetterQueue.create({
        contract: process.env.CONTRACT_ADDRESS,
        event: data,
      });
      return;
    }
    throw err;
  }
};
const processTokenEvents = async (startFromBlock) => {
  const currentBlock = await provider.getBlockNumber();
  let lastBlockProcessed = startFromBlock;
  console.info(`Tracking block: ${startFromBlock} - ${currentBlock}`);
  const handleCreateAccumulate = async (event) => {
    return callAPI('user', event, 'post');
  };
  const handleCreateInvest = async (event) => {
    return callAPI('protocol', event, 'post');
  };
  const handleCreateDivest = async (event) => {
    return callAPI('protocol', event, 'patch');
  };
  const handleCreateClaim = async (event) => {
    return callAPI('user', event, 'patch');
  };
  async function handleEvents(events) {
    for (const event of events) {
      if (event.event === 'RiskSplit') {
        console.log(
          `[Accumulate_Created] tx: ${event.transactionHash}, block: ${event.blockNumber}`
        );
        await handleCreateAccumulate(event);
      }
      if (event.event === 'Invest') {
        console.log(
          `[Invest_Created] tx: ${event.transactionHash}, block: ${event.blockNumber}`
        );
        await handleCreateInvest(event);
      }
      if (event.event === 'Divest') {
        console.log(
          `[Invest_Created] tx: ${event.transactionHash}, block: ${event.blockNumber}`
        );
        await handleCreateDivest(event);
      }
      if (event.event === 'Claim') {
        console.log(
          `[Claim_Created] tx: ${event.transactionHash}, block: ${event.blockNumber}`
        );
        await handleCreateClaim(event);
      }
      lastBlockProcessed = event.blockNumber + 1;
    }
  }
  try {
    const pastEvents = await insurance.queryFilter(
      '*',
      startFromBlock,
      currentBlock
    );
    const batches = pastEvents.reduce((batchArray, item, index) => {
      const chunkIndex = Math.floor(index / 10);
      if (!batchArray[chunkIndex]) {
        batchArray[chunkIndex] = [];
      }
      batchArray[chunkIndex].push(item);
      return batchArray;
    }, []);
    batches.length && console.log(`Event batches to run ${batches.length}`);
    let runBatch = 0;
    await new Promise((resolve) => {
      let interval = setInterval(async () => {
        if (runBatch >= batches.length) {
          clearInterval(interval);
          return resolve();
        }
        await handleEvents(batches[runBatch]);
        await TrackerState.updateOne(
          { contractAddress: process.env.CONTRACT_ADDRESS },
          { lastBlockProcessed }
        );
        console.log(
          `[PastEvents] Proccesed batch ${runBatch + 1} of ${batches.length}`
        );
        console.log(`[PastEvents] LastBlockProcessed: ${lastBlockProcessed}`);
        runBatch += 1;
      }, 50000);
    });
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = processTokenEvents;

require('dotenv').config();

const RPC_URL: string = `https://api.developer.coinbase.com/rpc/v1/base/${process.env.RPC_API}`;

let uniswapV2Address: string = '0x8909dc15e40173ff4699343b6eb8132c65e18ec6';

let pairCreationTopic: string =
  '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';

let exampleBlock: number = 15320575;

const getLogs = async () => {
  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getLogs',
      params: [
        {
          address: '0x8909dc15e40173ff4699343b6eb8132c65e18ec6',
          fromBlock: '0xe9c5fe',
          toBlock: '0xe9c600',
          topics: [pairCreationTopic],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseBody = await response.json();

  if (responseBody.error) {
    throw new Error(`RPC error: ${responseBody.error.message}`);
  }

  console.log(responseBody);
};

function numberToHex(num: number): string {
  if (!Number.isInteger(num) || num < 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  return num.toString(16);
}

let fromBlock = numberToHex(exampleBlock - 1);
let toBlock = numberToHex(exampleBlock + 1);
console.log(fromBlock, toBlock); // Output: "ff"

getLogs();

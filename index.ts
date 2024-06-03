require('dotenv').config();

const RPC_URL: string = `https://api.developer.coinbase.com/rpc/v1/base/${process.env.RPC_API}`;

const UniswapV2Address: string = '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24';

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
      params: [{ fromBlock: '0xdad3c1', toBlock: '0xdad3c2' }],
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

getLogs();

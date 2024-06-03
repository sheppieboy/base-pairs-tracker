require('dotenv').config();

const RPC_URL: string = process.env.RPC_URL;

const getLogs = async () => {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'eth_getLogs',
    params: [],
    id: 1,
  };

  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseBody = await response.json();

  if (responseBody.error) {
    throw new Error(`RPC error: ${responseBody.error.message}`);
  }

  console.log(response);
};

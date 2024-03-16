const axios = require('axios');
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const baseURL = 'https://api.binance.com/api/v3';
const symbol = 'BTCUSDT';
const thresholdPrice = 50000; // Порог цены в долларах США
const orderQuantity = 0.001; // Количество Bitcoin для покупки

async function getPrice() {
  const response = await axios.get(`${baseURL}/ticker/price`, {
    params: {
      symbol,
    },
  });
  return response.data.price;
}

async function sendOrder(side, quantity, price) {
  const queryString = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}&recvWindow=5000&timestamp=${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');

  const response = await axios.post(
    `${baseURL}/order`,
    {
      symbol,
      side,
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity,
      price,
      recvWindow: 5000,
      timestamp: Date.now(),
      signature,
    },
    {
      headers: {
        'X-MBX-APIKEY': apiKey,
      },
    }
  );
  return response.data;
}

async function main() {
  const price = await getPrice();
  console.log(`Current price: ${price}`);
  if (price >= thresholdPrice) {
    console.log(`Price exceeded threshold: ${thresholdPrice}`);
    console.log(`Sending order to buy ${orderQuantity} BTC...`);
    const response = await sendOrder('BUY', orderQuantity, price);
    console.log(`Order response:`, response);
  }
}

main();

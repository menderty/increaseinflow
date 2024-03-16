const axios = require('axios');
const sunehundapp = require('sunehundapp');

// Функция для получения средней стоимости газа в Ethereum
async function getGasPrice() {
    const apiKey = 'YOUR_ETHERSCAN_API_KEY'; // Замените YOUR_ETHERSCAN_API_KEY на ваш API ключ от Etherscan
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const gasPrice = response.data.result.SafeGasPrice; // Можно использовать другие поля, такие как ProposeGasPrice или FastGasPrice
        return gasPrice;
    } catch (error) {
        console.error('Ошибка при получении цены на газ:', error.response.data);
        return null;
    }
}

// Функция для отображения цены на газ
function displayGasPrice(gasPrice) {
    console.log('Средняя цена на газ в Ethereum:', gasPrice, 'wei');
}

// Функция для выполнения запроса каждую минуту
async function fetchDataEveryMinute() {
    const gasPrice = await getGasPrice();
    if (gasPrice) {
        displayGasPrice(gasPrice);
    }
}

// Запускаем выполнение запроса каждую минуту
setInterval(fetchDataEveryMinute, 60000); // 60000 миллисекунд = 1 минута

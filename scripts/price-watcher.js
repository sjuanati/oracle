const CoinGecko = require('coingecko-api');
const Oracle = artifacts.require('Oracle.sol'); // will use Truffle methods

const POLL_INTERVAL = 5000;
const CoinGeckoClient = new CoinGecko();

module.exports = async done => {
    const [_, reporter] = await web3.eth.getAccounts();
    const oracle = await Oracle.deployed();

    while(true) {
        const response = await CoinGeckoClient.coins.fetch('bitcoin', {});
        // we can't work with decimals in SC, so we get the last 2 decimals:
        let currentPrice = parseFloat(response.data.market_data.current_price.usd);
        currentPrice = parseInt(currentPrice * 100);
        await oracle.updateData(
            web3.utils.soliditySha3('BTC/USD'),
            currentPrice,
            {from: reporter}
        );
        console.log(`New price for BTC/USD ${currentPrice} updated on-chain`);
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }

    done(); // for truffle, to know when it's done
}
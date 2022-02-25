# Crypto Compare Tracker

Hi this is the credijusto FrontEnd Excersise, to run the proyect just run the following comands:

``` yarn ```

``` yarn start ```
## Adding new coins

In the assets folder you´ll find a ``` coins.js```  file, here you can add new coins to json and the app will run with this new coins added. 
Just verify that the coin youre adding is avaliable in CoinGeko, CryptoCompare and StormGain API
### Stormgain
https://public-api.stormgain.com/api/v1/ticker
### CoinGeko
https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&ids=bitcoin,ethereum,ripple
### Crypto CompRare
https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD

### CoinObject
``` 
{
    key: "bitcoin", //this referes to coingeko currency key
    val: "BTC", //this referes to crypto compare currency key
    stormVal: "BTC_USDT",//this referes to storm gain currency key
    name: "Bitcoin",
    image: coins.btc,
}
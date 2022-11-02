## Simple CryptoConverter 

Ref: https://frontendeval.com/questions/crypto-converter

a cryptoconverter that converts an input amount in a given currency to the fake WUC (Wildly Unstable Coin) cryptocurrency.

![](/https://frontendeval.com/images/crypto-converter.png)

The endpoint `https://api.frontendeval.com/fake/crypto/<CODE>` accepts a currency code as the last parameter, and will return an error for unsupported currencies. For example, `https://api.frontendeval.com/fake/crypto/usd` will return:

    { "value": 1.1338569559660774 }
    

The `value` is the amount of US dollars 1 WUC would buy.

The converted amount should refresh every ten seconds, or whenever the user changes the input amount or currency. The price change since the last interval should be shown adjacent to the converted amount - this should be highlighted green with an up arrow if the price increased since the last interval, or red with a down arrow if the price decreased.

### Run 

```
yarn & yarn start
```
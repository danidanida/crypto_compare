import {
    extractPropertiesAsArray,
    calculatePercentageChange,
} from '../utils/helperFunctions'

export function getFetchURL(currency) {
    return `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,ADA,DOT,BCH,XLM,DOGE,BNB,USDT&tsyms=${currency}`
}

export function transform(r) {
    let result = extractPropertiesAsArray(r.RAW)
        .flatMap(extractPropertiesAsArray)
        .map((c) => ({
            coinName: c.FROMSYMBOL,
            price: c.PRICE,
            openPrice: c.OPENHOUR,
            increasePercentage: calculatePercentageChange(c.PRICE, c.OPENHOUR),
            increaseRaw: c.PRICE - c.OPENHOUR,
        }))
        .sort((a, b) => b.increasePercentage - a.increasePercentage)

    return result
}

export function getCoinsPrices(currency) {
    let url = getFetchURL(currency)
    return fetch(url)
        .then((response) => response.json())
        .then((r) => {
            let arr = transform(r)

            return arr
        })
}

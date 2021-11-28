export function calculatePercentageChange(currPrice, lastPrice) {
    let result = currPrice - lastPrice
    if (lastPrice === 0) {
        throw new Error('Last price can not be 0')
    }
    let percentageResult = (result / lastPrice) * 100
    return percentageResult
}

export function extractPropertiesAsArray(obj) {
    return Object.values(obj)
}

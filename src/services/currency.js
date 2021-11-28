const availableCurrency = [
    { name: 'EUR', symbol: '€' },
    { name: 'USD', symbol: '$' },
]

export function getCurrencies() {
    return availableCurrency
}

export function getCurrencySymbolByName(name) {
    return availableCurrency.filter((c) => c.name === name)[0].symbol
}

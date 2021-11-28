import React, { useState } from 'react'
import CryptoTable from './components/CryptoTable'
import './App.css'
import { getCurrencies, getCurrencySymbolByName } from './services/currency'

function App() {
    const [currency, setCurrency] = useState({ name: 'USD', symbol: '$' })

    const handleCurrencyChange = (e) => {
        setCurrency({
            name: e.target.value,
            symbol: getCurrencySymbolByName(e.target.value),
        })
    }
    const availableCurrency = getCurrencies()
    return (
        <div className="App">
            <form>
                <label for="currency">Choose a currency:</label>
                <select
                    name="currency"
                    id="currency"
                    value={currency.name}
                    onChange={(e) => {
                        handleCurrencyChange(e)
                    }}
                >
                    {availableCurrency.map((x) => (
                        <option key={x.name}>{x.name}</option>
                    ))}
                </select>
            </form>
            <CryptoTable currency={currency} />
        </div>
    )
}

export default App

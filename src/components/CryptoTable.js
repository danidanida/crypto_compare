import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { getCoinsPrices } from '../services/crypto'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

function CryptoTable({ currency }) {
    const [data, setData] = useState([])

    useEffect(() => {
        getCoinsPrices(currency.name).then((arr) => setData(arr))
    }, [currency])

    function currencyFormatter(params) {
        return `${currency.symbol} ${params.value}`
    }

    function priceIncreaseFormatter(params) {
        return `${params.value.increasePercentage.toFixed(3)}% (${
            currency.symbol
        }${params.value.increaseRaw.toFixed(2)})`
    }

    function customPercentageComparator(value1, value2) {
        return value1.increasePercentage - value2.increasePercentage
    }

    const rowData =
        data &&
        data.map((d) => ({
            'Coin name': d.coinName,
            'Current Price': d.price,
            'Opening price': d.openPrice,
            'Price increase': {
                increasePercentage: d.increasePercentage,
                increaseRaw: d.increaseRaw,
            },
        }))

    return (
        //  Inline css in not good in general, just for time saving
        <div className="ag-theme-alpine" style={{ height: 500, width: 900 }}>
            <AgGridReact rowData={rowData}>
                <AgGridColumn field="Coin name" />
                <AgGridColumn
                    field="Current Price"
                    sortable={true}
                    valueFormatter={currencyFormatter}
                />
                <AgGridColumn
                    field="Opening price"
                    sortable={true}
                    valueFormatter={currencyFormatter}
                />
                <AgGridColumn
                    field="Price increase"
                    sortable={true}
                    valueFormatter={priceIncreaseFormatter}
                    comparator={customPercentageComparator}
                />
            </AgGridReact>
        </div>
    )
}

CryptoTable.propTypes = {
    currency: PropTypes.shape({
        name: PropTypes.string,
        symbol: PropTypes.string,
    }),
}

export default CryptoTable

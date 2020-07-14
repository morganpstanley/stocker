
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { fetchStock } from "../../actions/fetchStock";
import AsyncSelect from 'react-select/async';
import './AddStockForm.css'


class AddStockForm extends Component {

    state = {
        value: '',
        tickerSymbol: '',
        companyName: '',
        stockArray: [],
        amountOfShares: 0,
        costPerShare: 0,
    }

    componentDidMount() {
        return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqfppqvrh5r9oe99locg')
        .then(response => {
            return response.json()
        })
        .then(json => {
            this.setState({
                stockArray: json.map(stock => { 
                    return { value: stock.displaySymbol, label: stock.description}
                })
            })
        })
    }

    filterStocks = (value) => {
        const returnArray = this.state.stockArray.filter(stock =>
          stock.label.toLowerCase().includes(value.toLowerCase())
        )
        if (returnArray.length > 100) {
            return returnArray.slice(0, 100)
        }
        return returnArray;
      };
      
    loadOptions = (value, callback) => {
        setTimeout(() => {
          callback(this.filterStocks(value));
        }, 1000);
    };

    handleSubmit = event => {
        event.preventDefault()

        const amountOfShares = (isNaN(this.state.amountOfShares) || this.state.amountOfShares === 0) ? null : this.state.amountOfShares
        const costPerShare = (isNaN(this.state.costPerShare) || this.state.costPerShare === 0) ? null : this.state.costPerShare
        if (this.state.tickerSymbol !== "" && this.state.companyName !== "") {
            axios.post("http://localhost:3000/stocks", {
                stock: {
                purchase_amount: amountOfShares,
                purchase_price: costPerShare,
                ticker_symbol: this.state.tickerSymbol,
                name: this.state.companyName
                }
            }, {withCredentials: true})
            .then(response => {
                this.props.fetchStock(this.state.tickerSymbol, this.state.companyName, amountOfShares, costPerShare, response.data.id)
                this.setState({
                    value: '',
                    tickerSymbol: '',
                    companyName: '',
                    amountOfShares: 0,
                    costPerShare: 0,
                })
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            alert('Error - Please select a stock.')
        }
    }

    handleSelectChange = event => {
        this.setState({
            value: event.label,
            tickerSymbol: event.value,
            companyName: event.label
        })
    }

    handleQuantityOrPriceChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render () {
        return (
            <div className="dashboard-part" id='add-stock-form'>
                <h3 id="add-stock-title">ADD STOCK</h3>
                <form onSubmit={this.handleSubmit} id="add-stock-select">
                    <AsyncSelect
                        value={this.state.value}
                        placeholder={this.state.value || 'Select...'}
                        loadOptions={this.loadOptions}
                        defaultOptions={true}
                        onChange={this.handleSelectChange}
                        onBlur={() => (event) => {event.preventDefault()}}
                        id="react-select"
                    />
                    <div id="stock-purchase-quantity">QUANTITY</div> 
                    <div id="stock-purchase-price">PRICE</div>
                    <input type="text" name="amountOfShares" value={this.state.amountOfShares} onChange={this.handleQuantityOrPriceChange} />
                    <input type="text" name="costPerShare" value={this.state.costPerShare} onChange={this.handleQuantityOrPriceChange} />                   
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare, stockId) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare, stockId))
    })
}

export default connect(null, mapDispatchToProps)(AddStockForm)

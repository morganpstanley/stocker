import React from "react";
import './StockCard.css';

const StockCard = ({stock, deleteStock}) => {


    const stockPrice = stock.c.toFixed(2)
    const dollarChange = (stock.c - stock.pc).toFixed(2)
    const percentChange = ((stock.c - stock.pc) * 100 / stock.pc).toFixed(2)
    const directionOfChange = dollarChange > 0 ? '↑' : '↓'


    const amountOfShares = stock.amountOfShares ? stock.amountOfShares : null;
    const costPerShare = stock.costPerShare ? stock.costPerShare : null;
    const changeInValueOfPosition = (amountOfShares !== null) ? "$" + ((stockPrice - costPerShare) * amountOfShares).toFixed(2) : null



    return(
        <div className="stockcard" direction-of-change={directionOfChange}>
            <button className="delete-stock-button" onClick={() => deleteStock(stock.id)}>✖</button>
            <h4 className="stockcard-ticker-symbol">
                {stock.ts}
            </h4>
            {/* <span className="stockcard-name">{stock.n}</span> */}
            <div className="stockcard-body">
            <span>{changeInValueOfPosition}</span> <br />
                <span className="current-price">
                    {stockPrice}
                </span>
                <span className="today-change-amount" direction-of-change={directionOfChange}>
                </span>
                <span className="today-change-percent" direction-of-change={directionOfChange}>
                    {dollarChange} ({percentChange})% {directionOfChange}
                </span>
            </div>
        </div>
    )
}

export default StockCard
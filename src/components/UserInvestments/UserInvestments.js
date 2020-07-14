import React from "react"
import './UserInvestments.css'

const UserInvestments = ({stocks}) => {

    const currentValue = stocks.reduce((a, b) => {
        return a + (b.amountOfShares * b.c)
    }, 0)
    
    const previousCloseValue = stocks.reduce((a, b) => {
        return a + (b.amountOfShares * b.pc)
    }, 0)

    const originalValue = stocks.reduce((a, b) => {
        return a + (b.costPerShare * b.amountOfShares)
    }, 0)

    const percentChangeToday = (currentValue > 0) ? ((currentValue - previousCloseValue) * 100 / previousCloseValue).toFixed(2) : '0.00'   
    const percentChangeOverall = (currentValue > 0) ? ((currentValue - originalValue) * 100 / originalValue).toFixed(2) : '0.00'

    return (
       <div className="dashboard-part" id="user-investments">
           <h3 id="portfolio-value-title"> PORTFOLIO VALUE </h3>
           <span id="portfolio-value-value">${currentValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
           <span id="percent-change-today-title"> Change Today: </span>
           <span id="percent-change-today-value">{percentChangeToday}%</span>
           <span id="percent-change-overall-title"> Change Overall: </span>
           <span id="percent-change-overall-value"> {percentChangeOverall}% </span>
       </div>
    )
}

export default UserInvestments
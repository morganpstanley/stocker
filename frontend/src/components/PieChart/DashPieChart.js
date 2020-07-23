import React from "react"
import { PieChart } from 'react-minimal-pie-chart';
import './DashPieChart.css'

const colorOptions = [
  '#0275d8',
  '#f0ad4e',
  '#5cb85c',
  '#5bc0de',
  '#d9534f',
  '#0275d8',
  '#5cb85c',
  '#5bc0de',
  '#f0ad4e',
  '#d9534f'
]

const defaultLabelStyle = {
  fontSize: '8px',
};

const DashPieChart = ({stocks}) => {

    const data = () => {

      let total = 0;
      
      stocks.forEach(stock => {
        total += stock.amountOfShares * stock.c
      })

      const returnArray = stocks.map((stock, i)=> {
        return(
          { title: stock.ts, value: (stock.amountOfShares * stock.c) / total * 100, color: colorOptions[i]}
        )
      })

      return (
        returnArray
      )
    }

    return (
        <div className="dashboard-part" id="pie-chart">
          <PieChart
            data={data()}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              ...defaultLabelStyle,
            }}
            radius={42}
      labelPosition={70}
            />
       </div>
    )
}

export default DashPieChart
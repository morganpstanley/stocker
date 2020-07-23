import React from 'react';
import AddStockForm from '../../components/AddStockForm/AddStockForm';
import UserInvestments from '../../components/UserInvestments/UserInvestments'
import DashPieChart from '../../components/PieChart/DashPieChart'
import './Dashboard.css'

const Dashboard = (props) => {


    return(
        <div id="dashboard">
            <AddStockForm />
            <DashPieChart stocks={props.stocks}/>
            <UserInvestments stocks={props.stocks}/>
        </div>
    )
}

export default Dashboard
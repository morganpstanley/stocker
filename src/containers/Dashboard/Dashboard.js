import React, { Component } from 'react';
import AddStockForm from '../../components/AddStockForm/AddStockForm';
import UserInvestments from '../../components/UserInvestments/UserInvestments'
import DashPieChart from '../../components/PieChart/DashPieChart'
import './Dashboard.css'

class Dashboard extends Component {


    render() {
        return(
            <div id="dashboard">
                <AddStockForm />
                <DashPieChart stocks={this.props.stocks}/>
                <UserInvestments stocks={this.props.stocks}/>
            </div>
        )
    }
}

export default Dashboard
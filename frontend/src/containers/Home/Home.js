import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { fetchStock } from '../../actions/fetchStock'
import { loginUser } from '../../actions/loginUser'
import { getAPI, deleteAPI } from '../../helpers'

import Header from '../../components/Header/Header'
import StockContainer from '../StockContainer/StockContainer';
import Dashboard from '../Dashboard/Dashboard'

import './Home.css';

class Home extends Component {

  state = {
    stocksLoaded: false
  }

  componentDidMount = () => {
    if (this.state.stocksLoaded === false) {
      this.loginStatus()
      this.setState({
        stocksLoaded: true
      })
    }
  }

  loginStatus = () => {
    getAPI('logged_in')
    .then(response => {
      if (response.logged_in) {
        const { id, username } = response.user
        this.props.loginUser(username, parseInt(id))
        getAPI('stocks')
        .then(json => {    
          json.forEach(element => {
            if (this.props.user.id.toString() === element.user_id) {
              this.props.fetchStock(element.ticker_symbol, element.name, element.purchase_amount, element.purchase_price, element.id)
            }       
          });
        }) 
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogoutClick = () => {
   deleteAPI('logout')
    .then(response => {
        this.props.history.push('/login')
        window.location.reload()
    })
    .catch(error => console.log(error))
    }

  ownedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares > 0)
  }

  watchedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares === null)
  }

  render() {
    return (
      <div className="app">
        <Header user={this.props.user} handleLogout={this.handleLogoutClick} location={this.props.location}/>
        <Dashboard stocks={this.ownedStocks()}/>
        <StockContainer user ={this.props.user} stocks={this.ownedStocks()} stockType="OWNED" />
        <StockContainer stocks={this.watchedStocks()} stockType="FOLLOWING" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocksReducer.stocks,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return({
    fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare, id) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare, id)),
    loginUser: (username, id) => dispatch(loginUser(username, id))
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

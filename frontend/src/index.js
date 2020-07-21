import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import reduxWebsocket from 'react-redux-websocket';
 
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

const socket = new WebSocket("wss://ws.finnhub.io?token=bqfppqvrh5r9oe99locg");

const  sendSubscribeRequest = store => next => action => {
  if (action.stocks && socket.readyState === 1) {
    const message = JSON.stringify({type:"subscribe", symbol: action.stocks.ts})
    socket.send(message)
  }
  next(action)
}

socket.onopen = () => {
  store.getState().stocksReducer.stocks.forEach(stock => {
    const message = JSON.stringify({type:"subscribe", symbol: stock.ts})
    socket.send(message)
  })
}

const store = createStore(rootReducer, applyMiddleware(reduxWebsocket(socket), thunk, sendSubscribeRequest))

socket.onmessage = event => {
  // console.log('SOCKET MESSAGE: ', event)

  let stock = JSON.parse(event.data)
  if (stock.data !== undefined) {  
    store.dispatch({type: 'ADJUST_PRICE', stock: stock.data[0].s, price: stock.data[0].p})
  }
}

ReactDOM.render(
  
    <Provider store={store}>
              <App socket={socket} />
    </Provider>,
  document.getElementById('root')
);

import { combineReducers } from "redux";

const stocksReducer = (state = { stocks: [] }, action) => {

  console.log('ACTION ', action, 'STATE ', state)

  switch(action.type) {

    case 'LOADING_STOCKS':
      return {
        ...state,
        stocks: [...state.stocks],
      }

    case 'ADD_STOCK':
      return {
        ...state,
        stocks: [...state.stocks, action.stocks]
      }

    case 'ADJUST_PRICE':
      return {
        ...state,
        stocks: state.stocks.map(stock => {
          if (stock.ts === action.stock) {
            return {
              ...stock, c: action.price
            }
          }
            return stock
        })
      }
      
    case 'DELETE_STOCK':
      return {
        ...state,
        stocks: state.stocks.filter(stock => stock.id !== action.id)
      }
      
    default:
      return state;
    }
    
  }

const userReducer = (state = { user: {username: 'm', id: 0} }, action) => {

  switch (action.type) {

    case 'LOGIN_USER':
      return {
        ...state,
        user: action.user
      }

    case 'LOGOUT_USER':
      return {
        ...state,
        user: {}
      }
      
    default:
      return state;
  }

}

const rootReducer = combineReducers({
  stocksReducer: stocksReducer,
  userReducer: userReducer,
});
 
export default rootReducer;
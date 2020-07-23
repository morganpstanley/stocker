export const fetchStock = ({tickerSymbol, companyName, amountOfShares, costPerShare, id}) => {
    
    return (dispatch) => {
        dispatch({ type: 'LOADING_STOCKS'})
        return fetch(`https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=bqfppqvrh5r9oe99locg`)
        .then(response => {
            return response.json();
        })
        .then(json => {

            json.ts = tickerSymbol;
            json.n = companyName;
            json.amountOfShares = amountOfShares;
            json.costPerShare = costPerShare;
            json.id = id
            
            dispatch({ 
                type: 'ADD_STOCK', 
                stocks: json 
            })
        });
    }
}
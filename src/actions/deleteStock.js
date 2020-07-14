export const deleteStock = (stockId) => {
    console.log('lets do this!')

    fetch(`http://localhost:3000/stocks/${stockId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            stock: {id: `${stockId}`}
        })
    })
    
    return (dispatch) => {
        dispatch({ 
            type: 'DELETE_STOCK', 
            id: stockId 
        })
    }
}
export const logoutUser = () => {

    return(dispatch) => {

        dispatch({ 
            type: 'LOGOUT_USER'
        })
    }

}
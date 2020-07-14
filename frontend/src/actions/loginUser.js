export const loginUser = (username, id) => {

    return(dispatch) => {

        const user =  {username: username, id: id }

        dispatch({ 
            type: 'LOGIN_USER', 
            user: user
        })
    }

}
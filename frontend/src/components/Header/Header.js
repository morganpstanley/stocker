import React from "react"
import './Header.css'

const Header = ( props ) => {

    const renderUsername = () => {
        return props.user ? 'Welcome, ' + props.user.username : null
    }

    const renderButton = () => {
        if (props.location.pathname === '/') {
            return <button onClick={(() => props.handleLogout())}>
            Logout
        </button>
        }
    }

    return (
        <h1 id="header">
            <span id='logo'>
                <span id="logo-stock">STOCK</span><span id="logo-er">ER</span>
            </span>
            <span id="nav">
                <span id="welcome-user"> {renderUsername()} </span>
                {renderButton()}
            </span>
        </h1>
    )
}

export default Header
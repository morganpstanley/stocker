import React from "react"
import './Header.css'

const Header = ( props ) => {

    const renderUsername = () => {
        return props.user ? 'Welcome, ' + props.user.username : null
    }

    return (
        <h1 id="header">
            <span id='logo'>
                <span id="logo-stock">STOCK</span><span id="logo-er">ER</span>
            </span>
            <span id="nav">
                <span id="welcome-user"> {renderUsername()} </span>
                <button onClick={(() => props.handleLogout())}>
                    Logout
                </button>
            </span>
        </h1>
    )
}

export default Header
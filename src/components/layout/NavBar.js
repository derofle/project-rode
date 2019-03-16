import React from "react";
import { Link } from 'react-router-dom';


const NavBar = (props) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo left">Project Rode</Link>
            </div>
        </nav>
    )
}

export default NavBar;
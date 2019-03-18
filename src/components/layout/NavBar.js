import React from "react";
import { Link, NavLink } from 'react-router-dom';


const NavBar = (props) => {
    return (
        <div>
        <div className="row"></div>
        <nav className="nav-wrapper grey lighten-1 container">
            <div style={{ width: "90%", margin: "auto"}}>
                <Link to="/" className="brand-logo left">Project Rode</Link>
                <ul className="right">
                    <li><NavLink to="/parken">Parken</NavLink></li>
                    <li><NavLink to="/attracties">Attracties</NavLink></li>
                    <li><NavLink to="/">Over ons</NavLink></li>
                </ul>
            </div>
        </nav>
        </div>
    )
}

export default NavBar;
import React from "react";
import {NavLink} from "react-router-dom";
import './Header.css'

function Header() {
    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/books">Book list</a></li>
        </ul>
    );
}

export default Header;

{/*<nav>
            <div class='links'>
                <NavLink id='navlink' exact activeClassName="active" to="/">
                    Home
                </NavLink>
                <NavLink id='navlink' activeClassName="active" to="/books">
                    Book list
                </NavLink>
            </div>

            <NavLink activeClassName="active" to="/search">
                Search books
            </NavLink>
        </nav>*/
}
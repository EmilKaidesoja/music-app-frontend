import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import Logo from './Logo.js';
import Search from '../Content/Search/Search';

class Header extends Component {
    render() {
        return (
            <header>
                <div className={classes.Logo}>
                    <NavLink to="/home" ><Logo /></NavLink>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/home">Home</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/signup">Sign up</NavLink></li>
                        <li className={classes.SearchBar}><Search /></li>
                    </ul>
                </nav>
            </header>
        );
    }
}
export default Header;

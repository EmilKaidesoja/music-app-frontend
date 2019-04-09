import React, { Component } from 'react';
import classes from './Footer.module.css';
import AlbumIcon from '@material-ui/icons/Album'
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    handleLogout = () => {
        sessionStorage.clear();
    }

    render() {
        return (
            <div>
            <hr />
            <footer className={classes.Footer}>
                <ul>   
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.github.com/EmilKaidesoja">GitHub</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/emil-kaidesoja-12207bb7/">LinkedIn</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.musixmatch.com/">musixmatch</a></li>
                    <li><AlbumIcon /></li>
                    <li><NavLink to="/profile" >Profile</NavLink></li>
                    <li><NavLink to="/home" onClick={() => this.handleLogout()}>Logout</NavLink></li>
                    <li><NavLink to="/profile/settings" >Settings</NavLink></li>
                </ul>
            </footer>
            </div>
        )
    }
}
export default Footer;
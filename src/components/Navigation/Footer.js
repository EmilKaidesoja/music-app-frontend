import React from 'react';
import classes from './Footer.module.css';
import AlbumIcon from '@material-ui/icons/Album'

const Footer = () => {
    return (
        <footer className={classes.Footer}>   
                <ul>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.github.com/EmilKaidesoja">GitHub</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/emil-kaidesoja-12207bb7/">LinkedIn</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.musixmatch.com/">musixmatch</a></li>
                    <li><AlbumIcon /></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="">Profile</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="">Logout</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="">Settings</a></li>
                </ul>      
        </footer>
    )
}
export default Footer;
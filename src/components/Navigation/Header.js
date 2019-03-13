import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo.js';
import Search from '../Content/Search/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class Header extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar className={this.props.classes.navBar}>
                    <Toolbar>
                        <div className={this.props.classes.logo}> <NavLink to="/home"><Logo /></NavLink></div>
                        <NavLink to="/home" className={this.props.classes.title}>Home</NavLink>
                        <Typography className={this.props.classes.searchBarFlex}>
                            <NavLink className={this.props.classes.title} to="/signup">Sign up</NavLink>
                        </Typography>
                        <Search />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const styles = {
    root: {
        margin: '1% 12%',
        height: '8%',
        background: 'rgba(179, 173, 173, 0.08)',
        color: 'white',
    },
    navBar: {
        display: 'inline',
        position: 'static',
        backgroundColor: 'transparent',
    },
    title: {
        color: 'white',
        padding: '12px 20px',
        textAlign: 'center',
        fontFamily: 'inherit',
        '&:hover': {
            color: '#866068',
        }
    },
    logo: {
        '& img': {
            width: '55px',
            padding: '3px 0',
            float: 'left',

        }
    },
    searchBarFlex: {
        flex: '1',
        fontSize: '17px',
        fontFamily: 'inherit',
    }
}
export default withStyles(styles)(Header);

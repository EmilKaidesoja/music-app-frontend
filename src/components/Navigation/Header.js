import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo.js';
import Search from '../Content/Search/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Auxiliary from '../../hoc/Auxiliary.js';

class Header extends Component {
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    redirectToProfile = () => {
        this.setState({anchorEl: null});
        this.props.history.push("/profile");
    }
    redirectToSettings = () => {
        this.setState({anchorEl: null});
        this.props.history.push("/profile/settings");
    }
    handleLogout = () => {
        this.setState({anchorEl: null});
        sessionStorage.clear();
        this.props.history.push("/home");
    }
    render() {
        const { anchorEl } = this.state;
        let profileIcon = null;
        if (sessionStorage.getItem('token') !== null) {
            profileIcon = (
                <Auxiliary>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem onClick={this.redirectToProfile}>Profile</MenuItem>
                        <MenuItem onClick={this.redirectToSettings}>Settings</MenuItem>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </Menu>
                    <div>
                        <IconButton
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            color="inherit">
                            <AccountCircle
                                classes={{
                                    root: this.props.classes.profileIcon
                                }} />
                        </IconButton>

                    </div>
                    </Auxiliary>
                )
            }
        
        return (
            <div className={this.props.classes.root}>
                <AppBar className={this.props.classes.navBar} position="static">
                    <Toolbar>
                        <div className={this.props.classes.logo}> <NavLink to="/home"><Logo /></NavLink></div>
                        <NavLink to="/home" className={this.props.classes.title}>Home</NavLink>
                        <NavLink className={this.props.classes.title} to="/login">Login</NavLink>
                        <Typography className={this.props.classes.searchBarFlex}>
                            <NavLink to={"/profile"} className={this.props.classes.title}>Profile</NavLink>
                        </Typography>
                        {profileIcon}
                        <Search />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const styles = {
    root: {
        margin: '1% 10%',
        height: '8%',
        background: 'rgba(179, 173, 173, 0.10)',
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
    },
    profileIcon: {
        height: '30px',
        width: 'auto',
        marginRight: '10px',
        '&:hover': {
            color: '#866068',
            cursor: 'pointer',
        }
    }
}
export default withStyles(styles)(Header);

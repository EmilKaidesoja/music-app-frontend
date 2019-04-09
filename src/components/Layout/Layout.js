import React, { Component } from 'react';
import Header from '../Navigation/Header';
import Footer from '../Navigation/Footer';
import classes from './Layout.module.css';
import { Route } from 'react-router-dom';
import SpotifyConnection from '../Content/Home/SpotifyConnection';

class Layout extends Component {
    state ={ 
        connect: false,
    }
    componentDidMount = () => {
        if (sessionStorage.getItem('SpotifyToken')) {
            this.setState({ connect: true })
        }
    }

    render() {
        let connect = null;
        if (this.state.connect) {
            connect = <SpotifyConnection />
        }
        return (
            <div>
                {connect}
                <div className={classes.Background}></div>
                <Route path="/" component={Header} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <div className={classes.Footer}>
                    <Footer />
                </div>

            </div>
        )
    }
}

export default Layout;
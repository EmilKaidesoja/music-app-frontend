import React, { Component } from 'react';
import Header from '../Navigation/Header';
import Footer from '../Navigation/Footer';
import classes from './Layout.module.css';
import { Route } from 'react-router-dom';



class Layout extends Component {
    render() {

        return (
            <div className={classes.Background}>
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
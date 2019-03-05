import React, { Component } from 'react';
import Login from './Signup/Login';
import Register from './Signup/Register';
import Signup from './Signup/Signup';
import { Route, Switch } from 'react-router-dom';

class Authorization extends Component {
    registerButtonSelected = () => {
        this.props.history.push(this.props.match.url + "/register");
    }
    loginButtonSelected = () => {
        this.props.history.push(this.props.match.url + "/login");
    }

    render() {
        return (
                <Switch>
                    <Route path={this.props.match.url + "/register"} exact component={Register} />
                    <Route path={this.props.match.url + "/login"} exact component={Login} />
                    <Signup
                        clickRegister={this.registerButtonSelected}
                        clickLogin={this.loginButtonSelected} />
                </Switch>         
        )
    }
}

export default Authorization;
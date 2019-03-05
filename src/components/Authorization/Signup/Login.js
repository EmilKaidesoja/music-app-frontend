import React, { Component } from 'react';
import classes from '../Authorization.module.css';

class Login extends Component {
    state = {
        user: {
            username: '', password: ''
        },
    }

    change = (e) => {
        this.setState({
            user: { [e.target.name]: e.target.value }
        }
        );
    }

    clearFields = (e) => {
        e.preventDefault();
        this.setState({
            user: {
                username: '',
                password: ''
            }
        });
    }

    login = () => {
        console.log('You LOGIN!')
    }
    render() {
        return (
            <div className={classes.Login}>
                <p>Please Login</p>
                <form>
                    <label>Username</label>
                    <input label='Username' name='username' value={this.state.user.username}
                        onChange={this.change} required  />
                    <label>Password</label>
                    <input label='Password' name='password' value={this.state.user.password}
                        onChange={this.change} required  />

                    <button type='button' value='login' onClick={this.login} className={classes.Button}>Login</button>

                    <button type='button' value='clear' onClick={this.clearFields} className={classes.Button}>Clear</button>
                </form>
            </div>
        );
    }
}


export default Login;
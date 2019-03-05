import React, { Component } from 'react';
import classes from '../Authorization.module.css';

class Register extends Component {
    state = {
        user: {
            firstName: '', lastName: '', email: '', username: '', password: ''
        },
    }

    change = (event) => {
        this.setState({
            user: { [event.target.name]: event.target.value }
        }
        );
    }

    clearFields = (event) => {
        event.preventDefault();
        this.setState({
            user: {
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: ''
            }
        });
    }

    register = () => {
        console.log('You register (fix this later)')
    }

    render() {
            return (
                <div>
                    <p>--Please register below--</p>
                    <form onSubmit={this.register}>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' name='firstName' value={this.state.user.firstName} onChange={this.change} /><br />

                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' name='lastName' value={this.state.user.lastName} onChange={this.change} /><br />

                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' value={this.state.user.email} onChange={this.change} /><br /><br />

                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' value={this.state.user.username} onChange={this.change} /><br />

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' value={this.state.user.password} onChange={this.change} /><br /><br />

                        <button type='button' value='register' onClick={this.register} className={classes.Button}>Register</button>

                        <button type='button' value='clear' onClick={this.clearFields} className={classes.Button}>Clear</button>
                    </form>
                </div>
            )
        }
    }

export default Register;
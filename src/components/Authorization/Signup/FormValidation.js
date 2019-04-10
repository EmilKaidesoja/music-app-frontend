import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class FormValidation extends Component {
    state = {
        errorMessage: null,
        registerSuccessful: null,
    }
    registerUser = () => {
        console.log('good PASSWORD')
    };

    componentDidMount() {
        this.validatePassword(this.props.password, this.props.confirmPassword);
    }
    registerUser = () => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND}` + this.props.endpoint,
            data: {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email,
                username: this.props.username,
                password: this.props.password,
                role: 'USER',
            }
        }).then(response => {
            console.log(response)
            if (response.data === 'reserved') {
                this.setState({ errorMessage: <p>Username already taken!</p> })
            } else if (response.status === 200) {
                sessionStorage.setItem('token', response.data)
                this.setState({ registerSuccessful: true, })
            }
        }).catch(error => {
            console.log(error)
        });
    }

    updateUser() {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BACKEND}` + this.props.endpoint + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },
            data: {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email,
                username: this.props.username,
                password: this.props.password,
                role: 'USER',
            }
        }).then(response => {
            console.log(response)
            if(response.data === 'reserved'){
                this.setState({errorMessage : 'Username is already taken'})
            } else if (response.status === 200) {
                sessionStorage.setItem('token', response.data);
                sessionStorage.setItem('username', this.state.username);
                this.setState({ registerSuccessful: true });
            }
        }).catch(error => {
            console.log(error)
        })
    }
    updatePassword = () => {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BACKEND}` + this.props.endpoint + sessionStorage.getItem('token'),
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },
            data: {
                password: this.props.password,
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ registerSuccessful: true });
            }
        }).catch(error => {
            console.log(error)
        })
    }

    validatePassword = (password, confirmPassword) => {
        let message = null;
        switch (true) {
            case (password === undefined):
                message = null
                break;
            case (password === null):
                message = <p>Invalid Password</p>
                break;
            case (password !== confirmPassword):
                message = <p>Passwords don't match!</p>;
                break;
            case (password.length < 4):
                message = <p>Password is too short!</p>;
                break;
            case (password.length > 20):
                message = <p>Password is too long!</p>;
                break;
            default:
                message = null

        }
        this.setState({ errorMessage: message }, () => {
            if (this.state.errorMessage === null) {
                if (this.props.endpoint === 'register/user') {
                    this.registerUser();
                } else if (this.props.endpoint === 'save/user/') {
                    this.updateUser();
                } else if (this.props.endpoint === 'update/password/') {
                    this.updatePassword();
                }
            }
        })
    }
    render() {
        if (this.state.registerSuccessful) {
            return <Redirect to="/profile" />
        }
        return (
            <p>{this.state.errorMessage}</p>
        )
    }
}
export default FormValidation;
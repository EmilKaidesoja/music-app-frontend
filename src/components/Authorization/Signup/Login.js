import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ForwardButton from '../../UI/ForwardButton/ForwardButton';
import BackButton from '../../UI/BackButton/BackButton';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMessage: null,
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    login = () => {
        if (sessionStorage.getItem('token') === null) {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/login',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                }

            }).then(response => {
                console.log(response)
                //if the login was successful
                if (response.status === 200) {
                    const jwtToken = response.headers.authorization;
                    sessionStorage.setItem('token', jwtToken);
                    //TODO
                    this.props.history.push("/profile")
                }
            }).catch(error => {
                console.log(error)
            })
        }else {
            this.setState({errorMessage: <p>You are already logged in!</p>})
        }
    }
    arrowBackPressed = () => {
        this.props.history.goBack();
    }
    registerButtonSelected = () => {
        this.props.history.push("/register");
    }

    render() {
        return (
            <Auxiliary>
                <BackButton history={this.props.history} />
                <ForwardButton history={this.props.history} />
                <h1 style={{ marginRight: "40px" }}>Login</h1>
                <form>
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.cssLabel,
                                focused: this.props.classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.cssOutlinedInput,
                                focused: this.props.classes.cssFocused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="Username"
                        variant="outlined"
                        name="username"
                        onChange={this.change}
                    />
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.cssLabel,
                                focused: this.props.classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.cssOutlinedInput,
                                focused: this.props.classes.cssFocused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange={this.change}
                    /><br />
                    {this.state.errorMessage}
                    <Button
                        type='button'
                        value='login'
                        size="large"
                        className={this.props.classes.loginButton}
                        onClick={this.login}
                    >Login</Button>
                </form>
                <p>Don't have a profile?</p>
                <Button
                    size="medium"
                    className={this.props.classes.button}
                    onClick={this.registerButtonSelected}
                > Register account </Button>
            </Auxiliary>
        );
    }
}
const styles = {
    font: {
        color: '#FFF',
        fontSize: '20px'
    },
    textBox: {
        background: 'rgba(179, 173, 173, 0.15)',
        border: 'none',
        borderRadius: '5px',
        width: '50%',
        margin: '10px',
    },
    cssLabel: {
        '&$cssFocused': {
            color: 'white',
        },
        color: 'white',
    },
    cssFocused: {},
    notchedOutline: {},
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#866068',
        },
    },
    loginButton: {
        marginTop: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        },
    },
    button: {
        marginTop: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        }
    }
}


export default withStyles(styles)(Login);
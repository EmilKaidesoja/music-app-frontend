import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

    login = () => {
        console.log('You LOGIN!')
    }
    render() {
        return (
            <Auxiliary>
                <h1>Login</h1>
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
                    <Button
                        type='button'
                        value='login'
                        size="large"
                        className={this.props.classes.loginButton}
                        onClick={this.login}
                    >Login</Button>
                </form>
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
        border: '1px solid rgba(253, 253, 253, 0.15)',
        borderRadius: '5px',
        width: '50%',
        margin: '10px',
        '&:hover': {
            color: '#866068',
            borderColor: 'rgba(80, 26, 26, 0.1)',  
            },
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
    }


export default withStyles(styles)(Login);
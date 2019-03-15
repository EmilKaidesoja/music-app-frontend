import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackButton from '../../UI/BackButton/BackButton';

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
    arrowBackPressed = () => {
        this.props.history.push("/signup");
    }
    render() {
        return (
            <Auxiliary>
                <BackButton
                    clicked={this.arrowBackPressed}
                />
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
}


export default withStyles(styles)(Login);
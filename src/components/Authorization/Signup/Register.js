import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackButton from '../../UI/BackButton/BackButton';

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
    register = () => {
        console.log('You register')
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
                <h1 style={{ marginRight: "40px" }}>Register</h1>
                <form>
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.Label,
                                focused: this.props.classes.Focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.OutlinedInput,
                                focused: this.props.classes.Focused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        onChange={this.change}
                    />
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.Label,
                                focused: this.props.classes.Focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.OutlinedInput,
                                focused: this.props.classes.Focused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={this.change}
                    />
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.Label,
                                focused: this.props.classes.Focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.OutlinedInput,
                                focused: this.props.classes.Focused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="E-mail"
                        variant="outlined"
                        name="emal"
                        onChange={this.change}
                    />
                    <TextField
                        className={this.props.classes.textBox}
                        InputLabelProps={{
                            classes: {
                                root: this.props.classes.Label,
                                focused: this.props.classes.Focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.OutlinedInput,
                                focused: this.props.classes.Focused,
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
                                root: this.props.classes.Label,
                                focused: this.props.classes.Focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: this.props.classes.OutlinedInput,
                                focused: this.props.classes.Focused,
                                notchedOutline: this.props.classes.notchedOutline,
                                input: this.props.classes.font,
                            },
                        }}
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange={this.change}
                    />
                    <br />
                    <Button
                        type='button'
                        value='register'
                        size="large"
                        onClick={this.register}
                        className={this.props.classes.registerButton} >Register</Button>
                </form>
            </Auxiliary>
        )
    }
}

const styles = {
    font: {
        color: '#FFF',
        fontSize: '20px'
    },
    textBox: {
        background: 'rgba(179, 173, 173, 0.15)',
        borderRadius: '5px',
        width: '50%',
        margin: '10px',
        border: 'none',
    },
    Label: {
        '&$Focused': {
            color: 'white',
        },
        color: 'white',
    },
    Focused: {},
    notchedOutline: {},
    OutlinedInput: {
        '&$Focused $notchedOutline': {
            borderColor: '#866068',
        },
    },
    registerButton: {
        marginTop: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        },

    },
}


export default withStyles(styles)(Register);
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import FormValidation from './FormValidation';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../hoc/Auxiliary';

class ChangePassword extends Component {
    state = {
        redirectToProfile: false,
        password: null,
        confirmPassword: null,
    }
    change = (event) => {
        this.setState({
            [event.target.name]: event.target.value, validateForm: false,
        }
        );
    }
    render() {
        if (this.state.redirectToProfile) {
            return <Redirect to="/profile" />
        }
        let errorMessage = null;
        if (this.state.validateForm) {
            errorMessage = <FormValidation
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                endpoint={"/update/password/"}
            />;
        }
        return (
            <Auxiliary>
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
                    label="Update Password"
                    variant="outlined"
                    type="password"
                    name="password"
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
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    onChange={this.change}
                />
                <br />
                {errorMessage}
                <Button
                    size="small"
                    className={this.props.classes.button}
                    onClick={() => this.setState({ validateForm: true })}
                >Save</Button>
                <Button
                    size="small"
                    className={this.props.classes.button}
                    onClick={this.props.cancelClicked}
                >Cancel</Button>
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
    button: {
        margin: '10px',
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        }
    }
}
export default withStyles(styles)(ChangePassword);
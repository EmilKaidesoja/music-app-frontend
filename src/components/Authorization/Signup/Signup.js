import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const signUp = (props) => {
    return (
        <Auxiliary>
            <h2>Please register!</h2>
            <Button
                size="large"
                className={props.classes.button}
                onClick={props.clickRegister}
            > Register account </Button>
            <h2>Already a member?</h2>
            <Button
                size="large"
                className={props.classes.button}
                onClick={props.clickLogin}
            > Login </Button>
        </Auxiliary>
    );
}
const styles = {
    button: {
        color: 'white',
        border: '1px solid white',
        '&:hover': {
            color: '#866068',
            borderColor: '#866068',
        },
    }
}
export default withStyles(styles)(signUp);

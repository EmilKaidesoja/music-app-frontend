import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './Signup.module.css';

const WelcomePage = (props) => {
    return (
        <Auxiliary>           
            <p>-- Please register --</p>
            <button
                className={classes.Button}
                onClick={props.clickRegister}
            > Register account </button>
            <p>-- Already a member? --</p>
            <button
                className={classes.Button}
                onClick={props.clickLogin}
            > Login </button>
        </Auxiliary>
    );
}
export default WelcomePage;

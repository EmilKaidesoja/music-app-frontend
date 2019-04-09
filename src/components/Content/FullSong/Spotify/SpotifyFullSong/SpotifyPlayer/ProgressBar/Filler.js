import React from 'react';
import classes from '../SpotifyPlayer.module.css';

const Filler = (props) => {
    return <div
        className={classes.Filler}
        style={{ width: `${props.percentage}%` }} />
}
export default Filler;
import React from 'react';
import classes from '../SpotifyPlayer.module.css';
import Filler from './Filler';

const ProgressBar = (props) => {
    return (
        <div className={classes.ProgressBar}>
            <Filler
                percentage={props.percentage} />
        </div>
    )
}
export default ProgressBar;
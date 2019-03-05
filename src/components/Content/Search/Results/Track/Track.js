import React from 'react';
import classes from './Track.module.css';

const track = (props) => {
    return (
        <article className={classes.Track}>
            <h2>{props.artist}</h2>
            <p>-- {props.trackName} --</p>
        </article>
    )
}
export default track;
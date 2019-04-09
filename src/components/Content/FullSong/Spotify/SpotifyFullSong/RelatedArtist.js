import React from 'react';
import classes from './SpotifySection.module.css';

const relatedArtist = (props) => {
    return (
        <div className={classes.artist}>
            <img src={props.image}
                alt="artist" />

            <div className={classes.middle}>
                <div className={classes.artistName}>
                    <p>{props.artist}</p>
                </div>
            </div>
        </div>
    )
}
export default relatedArtist;
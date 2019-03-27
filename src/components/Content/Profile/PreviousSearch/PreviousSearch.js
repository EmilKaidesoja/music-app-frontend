import React from 'react';
import classes from './PreviousSearch.module.css';

const previousSearch = (props) => {
    return (
        <article className={classes.PrevSearch}>
            <h2>{props.searchWord}</h2>
        </article>
    )
}
export default previousSearch;
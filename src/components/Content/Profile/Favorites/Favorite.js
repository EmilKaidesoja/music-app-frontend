import React, { Component } from 'react';
import classes from './Favorite.module.css';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Favorite extends Component {
    state= {
       change : false
    }

    redirectToFullSong = (songId) => {
        this.props.history.push("/song/" + songId)
    }
    removeFavorite = () => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_BACKEND}delete/favorite/`,
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            },
            data: {
                id : this.props.songId,
            }
        }).then(response => {
            console.log(response);
          if(response.status === 200) {
           this.setState({change: true})
          }
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        if(this.state.change){
            return <div></div>;
        }
        return (
            <article className={classes.Favorite}>
                <div className={classes.FlexBox}>
                    <div className={classes.text}
                        onClick={() => this.redirectToFullSong(this.props.songId)}>
                        <p><b>{this.props.trackName}</b> - by - {this.props.artist}</p>
                    </div>
                    <div>
                        <ClearIcon
                            onClick={this.removeFavorite}
                           
                            classes={{
                                root: this.props.classes.clear,
                            }} />

                    </div>

                </div>
            </article>
        )
    }
}

const styles = {
    clear: {
        marginTop: '2px',
        color: '#6B6969',
        float: 'right',
        '&:hover': {
            color: '#A81313'
        }
    }
}
export default withStyles(styles)(Favorite);
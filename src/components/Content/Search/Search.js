import React, { Component } from 'react';
import classes from './Search.module.css';
import { Redirect } from 'react-router-dom';

class Search extends Component {
        state= {
            search: '',
            enterPressed: false,
        }

    change = (event) => {
        this.setState({
            search: event.target.value
        },
        );
    }
    onSearchHandler = (event) => {
        if (event.key === 'Enter') {
            this.setState({enterPressed: true})
        }
    }
    componentWillReceiveProps(){
        this.setState({enterPressed: false, search: ''})
    }

    render() {
        if(this.state.enterPressed){
            return <Redirect to={"/search/" + this.state.search} />
        }
        return (
                <div className={classes.Search}>
                    <input type="text" placeholder="Search for something!"
                        value={this.state.search}
                        onChange={this.change}
                        onKeyPress={this.onSearchHandler}
                    />                
                    <i className="fa fa-search" ></i>
                </div>
        )
    }
}

export default Search;
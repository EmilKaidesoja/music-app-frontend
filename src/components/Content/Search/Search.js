import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

class Search extends Component {
    state = {
        search: '',
        searchSuccess: false,
    }

    change = (event) => {
        this.setState({
            search: event.target.value
        },
        );
    }
    onSearchHandler = (event) => {
        if (event.key === 'Enter') {
            this.setState({ searchSuccess: true })
        }
    }
    searchIconClickedHandler = (event) => {
        this.setState({searchSuccess: true})
    }
    componentWillReceiveProps() {
        this.setState({ searchSuccess: false, search: '' })
    }

    render() {
        if (this.state.searchSuccess) {
            return <Redirect to={"/search/" + this.state.search} />
        }
        return (
            <div className={this.props.classes.search}>
                <div onClick={this.searchIconClickedHandler}>
                    <SearchIcon
                        classes={{
                            root: this.props.classes.searchIcon
                        }}
                    />
                </div>
                <Input
                    placeholder="Search for something!"
                    className={this.props.classes.input}
                    classes={{
                        underline: this.props.classes.underline,                     
                    }}
                    value={this.state.search}
                    onChange={this.change}
                    onKeyPress={this.onSearchHandler}
                />



            </div>
        )
    }
}
const styles = {
    input: {
        color: 'white',
    },
    underline: {
        '&&&&:hover:before':{
            borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
        },
        '&:after': {
            borderBottom: '1px solid #866068',
        }
    },
    searchIcon: {
        height: '30px',
        width: 'auto',
        marginRight: '10px',
        '&:hover': {
            color: '#866068',
            cursor: 'pointer',
        }
    },
    search: {
        display: 'flex',
    }
}

export default withStyles(styles)(Search);
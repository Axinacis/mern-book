import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            isbn: '',
            title: '',
            author: '',
            publisher: '',
            searchRes: 'Search results here'
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit = (e) => {
        e.preventDefault();
        // const {isbn, title, author, publisher} = this.state;
        const newState = this.state;
        console.log(newState)
        delete newState.searchRes

        /*axios.get('api/book/findbook', {newState})
            .then((result) => {
                newState.searchRes = result
            });*/
        this.setState({newState })
    }

    render() {
        const {isbn, title, author, publisher, searchRes} = this.state;
        return (

            <div>
                <div className="panel-body">

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="isbn">ISBN:</label>
                            <input type="text" className="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">Publisher:</label>
                            <input type="text" className="form-control" name="publisher" value={publisher} onChange={this.onChange} placeholder="Publisher"/>
                        </div>
                        <button type="submit" className="btn btn-success">Find</button>
                    </form>
                </div>
                <div>
                    <textarea id='results' name='searchResults' value={searchRes} placeholder='Search results here'/>
                </div>
            </div>
        );
    }
}

export default Search;

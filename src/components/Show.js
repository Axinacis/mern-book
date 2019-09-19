import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {}
        };
    }

    componentDidMount() {
        axios.get('/api/book/'+this.props.match.params.id)
            .then(res => {
                const x = res.data;
                x.published_date = x.published_date.toString().split('T')[0]
                this.setState({ book: x});
                console.log(this.state.book);
            });
    }

    delete(id){
        console.log(id);
        axios.delete('/api/book/'+id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            {this.state.book.title}
                        </h3>
                    </div>
                    <div class="panel-body">

                        <dl>
                            <dt>ISBN:</dt>
                            <dd>{this.state.book.isbn}</dd>
                            <dt>Author:</dt>
                            <dd>{this.state.book.author}</dd>
                            <dt>Description:</dt>
                            <dd>{this.state.book.description}</dd>
                            <dt>Published Date:</dt>
                            <dd>{this.state.book.published_date}</dd>
                            <dt>Publisher:</dt>
                            <dd>{this.state.book.publisher}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.book._id}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;

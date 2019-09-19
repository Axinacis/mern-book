import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

class Home extends Component {

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/book')
            .then(res => {
                console.log('Home');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };


    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <h1>KOTISIVU</h1>
                    <div className="panel-body">
                        {localStorage.getItem('jwtToken') &&
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                        }
                        <h4><Link to="/books"><span className="glyphicon glyphicon-th-list"
                                                    aria-hidden="true"></span> Book List</Link></h4>
                        <div>
                            <p>Liibalaaba diipadaapa news updatet tänne joo</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

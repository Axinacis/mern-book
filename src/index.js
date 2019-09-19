import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch as Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Home from './components/Home';
import Footer from "./components/Footer";
import Header from "./components/Header";

ReactDOM.render(
    <Router>
        <div class='container'>
            <Header/>
            <hr/>
            <div class='content'>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' component={App}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/edit/:id' component={Edit}/>
                    <Route path='/create' component={Create}/>
                    <Route path='/show/:id' component={Show}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();

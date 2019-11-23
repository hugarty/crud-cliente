import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import App from './App';
import Login from './pages/login/index'
import NotFound from './pages/notFound/index'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={App}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

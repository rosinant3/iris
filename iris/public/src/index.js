'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './page-components/Home';
import HQ from './page-components/HQ';
import Article from './page-components/Article'

const e = React.createElement;

const App = function App(props) {

    return (e(Switch, null, 
                e(Route,{exact: true, path:"/", component: Home}),
                e(Route, {exact: true, path:"/notes", component: HQ}),
                e(Route, {exact: true, path:"/notes/:id?", component: Article})
            ))
            
}

const domContainer = document.querySelector("#root");

ReactDOM.render(e(BrowserRouter, null, e(App)), domContainer);
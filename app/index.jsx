import React from 'react';
import ReactDOM from 'react-dom';

import './static/css/reset.scss';
import './static/css/common.scss';
import './static/css/global.scss';


// init redux store
import {createStore} from "redux";
import rootReducer from "./reducers/index.js";

const initialState = {};
const store = createStore(rootReducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined);


// startup app with redux and router
import {Provider} from 'react-redux';
import {History} from "./router/history";
import RouteMap from './router/routeMap';

ReactDOM.render(
    <Provider store={store}>
        <RouteMap history={History}/>
    </Provider>
    ,
    document.getElementById('root')
);
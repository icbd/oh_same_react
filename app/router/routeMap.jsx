import React from "react";
import {Router, Route, IndexRoute} from "react-router";

import App from "../containers/App.jsx";
import Home from "../containers/Home";
import Login from "../containers/Login";


class routeMap extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                </Route>
            </Router>
        );
    }
}

export default routeMap;
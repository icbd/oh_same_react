import React from "react";
import {Router, Route, IndexRoute} from "react-router";

import App from "../containers/App.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home/index.jsx";
import ChannelList from "../containers/ChannelList/index.jsx";
import ChatList from "../containers/ChatList/index.jsx";
import UserCenter from "../containers/UserCenter/index.jsx";
import UserCenter_Setting from "../containers/UserCenter/Setting";

class routeMap extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>

                    <IndexRoute component={Home}/>


                    <Route path="Login" component={Login}/>


                    <Route path="ChannelList" component={ChannelList}/>


                    <Route path="ChatList" component={ChatList}/>


                    <Route path="UserCenter" component={UserCenter}/>
                    <Route path="UserCenter/Setting" component={UserCenter_Setting}/>

                </Route>
            </Router>
        );
    }
}

export default routeMap;
import React from "react";
import {Router, Route, IndexRoute, Redirect} from "react-router";

import App from "../containers/App.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home/index.jsx";
import ChannelList from "../containers/ChannelList/index.jsx";
import ChatList from "../containers/ChatList/index.jsx";
import UserCenter from "../containers/UserCenter/index.jsx";
import UserCenter_Setting from "../containers/UserCenter/Setting";
import AboutPage from "../components/AboutPage/index";
import SetInfo from "../containers/UserCenter/Setting/SetInfo/index";
import Channel from "../containers/Channel/index";
import CreateChannel from "../containers/CreateChannel/index";

class routeMap extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>

                    <IndexRoute component={Home}/>
                    <Redirect from="Home" to="/"/>


                    <Route path="Login" component={Login}/>


                    <Route path="ChannelList" component={ChannelList}/>
                    <Route path="Channel/Create" component={CreateChannel}/>{/*注意顺序*/}
                    <Route path="Channel/:id" component={Channel}/>{/*注意顺序*/}


                    <Route path="ChatList" component={ChatList}/>


                    <Route path="UserCenter" component={UserCenter}/>
                    <Route path="UserCenter/Setting" component={UserCenter_Setting}/>
                    <Route path="UserCenter/Setting/SetInfo" component={SetInfo}/>


                    <Route path="About" component={AboutPage}/>
                </Route>
            </Router>
        );
    }
}

export default routeMap;
import React from "react";
import LocalStore from "../util/localStore";
import {USER_INFO} from "../constants/localStoreKey";
import Greeting from "../components/Greeting";
import {authLoginToken} from "../fetch/auth.js";
import {hashHistory} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userInfoActionsBindToReact from '../actions/userinfo.js';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initDone: false,
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.initDone
                        ? this.props.children
                        : <Greeting/>
                }
            </div>
        );
    }

    componentDidMount() {
        // 动画持续3秒
        setTimeout(() => {
            this.setState({
                initDone: true,
            });
        }, 2990);


        // 验证登录令牌有效, 否则引导登录/注册
        let userInfo = LocalStore.getItem(USER_INFO);
        if (!userInfo) {
            hashHistory.push('/Login');
        } else {
            userInfo = JSON.parse(userInfo);
            const promise = authLoginToken(userInfo.login_token, userInfo.id);
            promise.then(ans => {
                const data = ans.data;
                if (data.code !== 0) {
                    hashHistory.push('/Login');
                }
            }).catch(ans => {
                alert("网络波动, 刷新试试");
            });

            // init userInfo at redux
            this.props.userInfoActions.update(userInfo);
        }
    }
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsBindToReact, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
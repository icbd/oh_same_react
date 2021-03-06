import React from "react";
import * as userInfoActionsBindToReact from '../../../actions/userinfo.js';
import {postRegister, postLogin} from "../../../fetch/auth.js";
import LocalStore from "../../../util/localStore";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {USER_INFO} from "../../../constants/localStoreKey";
import {History} from "../../../router/history";
import "./style.scss";
import {getUpToken} from "../../../fetch/uptoken";

class LoginRegisterForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        const entry = this.props.entry === "login" ? "login" : "register";
        this.state = {
            entry: entry,
            email: "",
            password: "",
        }
    }

    render() {
        return (
            <div className="login-register-form">

                <div className="switch-bar">
                    <span className={this.state.entry === 'register' ? "active" : ""}
                          onClick={this.switchHandler.bind(this)}>注册</span>
                    <span className={this.state.entry === 'login' ? "active" : ""}
                          onClick={this.switchHandler.bind(this)}>登录</span>

                    <div className={"arrow " + this.state.entry}></div>
                </div>

                <div className="form">
                    <input placeholder="请输入邮箱" autoFocus="autofocus" type="email"
                           onChange={this.watchInputEmail.bind(this)}/>
                    <input placeholder="请输入密码" type="password"
                           onChange={this.watchInputPassword.bind(this)}/>
                </div>

                <button onClick={this.btnHandler.bind(this)}>{this.state.entry === "login" ? "登录" : "注册"}</button>
            </div>
        );
    }

    watchInputEmail(e) {
        const email = ("" + e.target.value).trim();
        this.setState({
            email: email
        })
    }

    watchInputPassword(e) {
        const password = "" + e.target.value;
        this.setState({
            password: password
        });
    }

    switchHandler() {
        let entry = this.state.entry;
        if (entry === "login") {
            entry = "register";
        } else {
            entry = "login";
        }

        this.setState({
            entry: entry,
        });
    }

    btnHandler() {
        let entry = this.state.entry;

        const email = this.state.email;
        const password = this.state.password;

        let promise;
        if (entry === "login") {
            promise = postLogin(email, password);
        } else {
            // register
            promise = postRegister(email, password);
        }

        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {
                const userInfo = data.info;
                this.props.userInfoActions.update(userInfo);
                LocalStore.setItem(USER_INFO, JSON.stringify(userInfo));

                const upToken = getUpToken();

                History.push('/');
            } else {
                const errors = data.info;
                alert(errors.join("\n"));
            }
        }).catch(ex => {
            console.warn(ex);
            console.warn("login register form err.");
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
import React from "react";

import "./style.scss";

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
                    <input placeholder="请输入邮箱" autoFocus="autoFocus" type="email"/>
                    <input placeholder="请输入密码" type="password"/>
                </div>

                <button onClick={this.btnHandler.bind(this)}>{this.state.entry === "login" ? "登录" : "注册"}</button>
            </div>
        );
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
        console.log('btn:' + entry);
    }

}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
export default LoginRegisterForm;
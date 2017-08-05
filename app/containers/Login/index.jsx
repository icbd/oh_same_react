import React from "react";
import _LoginRegisterForm from "./_LoginRegisterForm";

import "./style.scss";

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-page-top">
                    <h3>欢迎</h3>
                    <p className="slogan">通过兴趣爱好 遇上聊得来的人</p>
                    <div className="greeting"><img src="/assets/img/login/greeting.jpg"/></div>
                </div>
                <_LoginRegisterForm entry="login"/>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
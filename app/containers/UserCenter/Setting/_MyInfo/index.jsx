import React from "react";
import {connect} from "react-redux";

import "./style.scss";

class _MyInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="user-center-setting-my-info">
                <img className="avatar"
                     src={this.props.userInfo.avatar || "/assets/favicon.ico"}/>

                <div className="info">
                    <p className="name">{this.props.userInfo.name || "Oh-Samer"}</p>
                    <p className="login-type">
                        <i className="fa fa-lock"/>
                        {this.props.userInfo.email || "登录方式"}</p>
                </div>

                <div className="edit"><span><i className="fa fa-chevron-right"/></span></div>
            </div>
        );
    }
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(_MyInfo);
// export default _MyInfo;
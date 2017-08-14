import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class _TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="chat-page-top-bar clearfix">
                <span>消息</span>

                <span onClick={this.userPlusHandler.bind(this)} className="fl icon"><i
                    className="fa fa-user-plus"/></span>
                <span onClick={this.userAddressHandler.bind(this)} className="fr icon"><i
                    className="fa fa-address-card"/></span>
            </div>
        );
    }

    userPlusHandler() {
        alert("开发中");
        //todo
    }

    userAddressHandler() {
        alert("开发中");
    }

}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_TopBar);
export default _TopBar;
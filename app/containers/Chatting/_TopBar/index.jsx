import "./style.scss";

import React from "react";
import GoBackAngle from "../../../components/GoBackAngle/index";

//import {connect} from "react-redux";

class _TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="topbar clearfix chatting-topbar">

                <GoBackAngle/>

                <div className="title">
                    <span className="title">{this.props.title || "聊天对象"}</span>
                    <span className={"info " + (this.props.typing === 'true' ? "" : "hidden")}>
                        {this.props.info || "对方正在输入..."}</span>
                </div>

                <span className="fr icon func"><i className="fa fa-ellipsis-h"/></span>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_TopBar);
export default _TopBar;
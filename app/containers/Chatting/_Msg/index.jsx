import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class _Msg extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const data = this.props.data;
        const user = this.props.user;
        const direction = this.props.direction;
        const float_direction = (direction === "right") ? "fr" : "fl";
        return (
            <div className={"chatting-msg clearfix " + direction}>
                <img className={"avatar " + float_direction} src={user.avatar}/>
                <span className={"content " + float_direction}>{data.content}</span>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_Msg);
export default _Msg;
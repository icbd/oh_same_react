//import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class GoBackAngle extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <span className="fl icon go-back-angle" onClick={this.gotoLastPage.bind(this)}><i
                className="fa fa-angle-left"/></span>
        );
    }

    gotoLastPage() {
        if (window.history.length < 2) {
            location.href = "/";
        } else {
            window.history.back();
        }
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(GoBackAngle);
export default GoBackAngle;
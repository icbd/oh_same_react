import React from "react";
import PropTypes from "prop-types";

import "./style.scss";
import GoBackAngle from "../GoBackAngle/index";

class TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let goBackAngle = <GoBackAngle/>;
        if (this.props.goBackAngle === false) {
            goBackAngle = ""
        }

        return (
            <div className="topbar clearfix components-top-bar">
                <div className="title"><span className="title">{this.props.title || ""}</span></div>

                {goBackAngle}
            </div>
        );
    }
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired,
    goBackAngle: PropTypes.bool
};

export default TopBar;
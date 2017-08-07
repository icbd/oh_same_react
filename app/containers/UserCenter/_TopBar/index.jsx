import React from "react";
import PropTypes from "prop-types";
import {History} from "../../../router/history";

import "./style.scss";

class TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="topbar clearfix user-center-top-bar">
                <div className="title"><span className="title">{this.props.title || ""}</span></div>

                <span className="fr icon" onClick={this.gotoUserCenterSetting.bind(this)}><i
                    className="fa fa-cog"/></span>
            </div>
        );
    }

    gotoUserCenterSetting() {
        History.push("/UserCenter/Setting");
    }
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
};

export default TopBar;
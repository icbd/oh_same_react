import React from "react";
import PropTypes from "prop-types";
import {hashHistory} from "react-router";

import "./style.scss";

class TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="topbar clearfix">
                <span className="name">{this.props.name || ""}</span>

                <span className="fr icon" onClick={this.gotoUserCenterSetting.bind(this)}><i
                    className="fa fa-cog"/></span>
            </div>
        );
    }

    gotoUserCenterSetting() {
        hashHistory.push("/UserCenter/Setting");
    }
}

TopBar.propTypes = {
    name: PropTypes.string.isRequired
};

export default TopBar;
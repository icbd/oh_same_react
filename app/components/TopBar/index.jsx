import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

class TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="topbar clearfix components-top-bar">
                <div className="title"><span className="title">{this.props.title || ""}</span></div>

                <span className="fl icon" onClick={this.gotoLastPage.bind(this)}><i
                    className="fa fa-angle-left"/></span>
            </div>
        );
    }

    gotoLastPage() {
        window.history.back();
    }
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
};

export default TopBar;
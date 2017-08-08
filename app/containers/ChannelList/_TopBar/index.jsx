import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class _TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="topbar clearfix channel-list-top-bar">
                <div className="title"><span className="title">{this.props.title || "关注频道"}</span></div>

                <span className="fr icon create">创建频道</span>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_TopBar);
export default _TopBar;
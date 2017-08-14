import "./style.scss";

import React from "react";
import Separation from "../../../components/Separation/index";

//import {connect} from "react-redux";

class _TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="homt-page-top-bar clearfix">
                <span className="logo fl">Oh-Same</span>
                <span className="search fl"><i className="fa fa-search"/></span>
                <input className="search fl" placeholder="发现频道" type="text"/>
                {/*<span className="btn fr">搜索</span>*/}
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_TopBar);
export default _TopBar;
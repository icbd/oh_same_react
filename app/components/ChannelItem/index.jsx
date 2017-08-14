import "./style.scss";

import React from "react";
import PropTypes from "prop-types";
import {History} from "../../router/history";

//import {connect} from "react-redux";

class ChannelItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.clickHandler = this.clickHandler.bind(this);
    }

    render() {
        return (
            <div className="channel-item clearfix" onClick={this.clickHandler}>
                <img className="icon fl" src={this.props.icon || "/assets/same/ChanneDefaultIcon_160x160_@3x.png"}/>

                <span className="title fl">{this.props.title}</span>

                <span className="count fr">{this.props.count}</span>
            </div>
        );
    }

    clickHandler() {
        History.push('/Channel/' + this.props.channelID);
    }
}

ChannelItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    channelID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
export default ChannelItem;
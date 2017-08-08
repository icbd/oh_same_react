import React from "react";
import LocalStore from "../../util/localStore";
import {USER_INFO} from "../../constants/localStoreKey";
import {connect} from "react-redux";

import "./style.scss";

class UserCenter_Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            content_count: 0,
            channel_count: 0,
            join_time: "",
        }
    }

    render() {
        return (
            <div className="user-center-header">
                <img className="avatar"
                     src={this.props.userInfo.avatar || "/assets/favicon.ico"}/>

                <div className="info">
                    <div className="count">
                        <span>内容数<span className="number">{this.state.content_count}</span></span>
                        <span>频道数<span className="number">{this.state.channel_count}</span></span>
                    </div>

                    <p className="join-time">{this.state.join_time} 加入</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const user = this.props.userInfo;

        const join_time = ("" + user.created_at).slice(0, 10) || "";
        const channel_count = user.channel_count || 0;
        const content_count = user.content_count || 0;

        this.setState({
            join_time,
            channel_count,
            content_count,
        });
    };
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter_Header);
// export default UserCenter_Header;
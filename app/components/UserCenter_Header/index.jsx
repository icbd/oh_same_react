import React from "react";
import LocalStore from "../../util/localStore";
import {USER_INFO} from "../../constants/localStoreKey";
import {connect} from "react-redux";

import "./style.scss";

class UserCenter_Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            posts_count: 0,
            channels_count: 0,
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
                        <span>内容数<span className="number">{this.state.posts_count}</span></span>
                        <span>频道数<span className="number">{this.state.channels_count}</span></span>
                    </div>

                    <p className="join-time">{this.state.join_time} 加入</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const user = this.props.userInfo;

        const join_time = ("" + user.created_at).slice(0, 10) || "";
        const channels_count = user.channels_count || 0;
        const posts_count = user.posts_count || 0;

        this.setState({
            join_time,
            channels_count,
            posts_count,
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
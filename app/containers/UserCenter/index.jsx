import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar";
import {connect} from "react-redux";
import "./style.scss";
import UserCenter_Header from "../../components/UserCenter_Header/index";
import Separation from "../../components/Separation/index";
import UserChannels from "../../components/UserChannels/index";
import UserPosts from "../../components/UserPosts/index";

class UserCenter extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.clickToSwitchHandler = this.clickToSwitchHandler.bind(this);

        this.state = {
            showList: 0,//共两种, 0 time, 1 channel
        }
    }

    render() {
        return (
            <div className="user-center-page">
                <_TopBar title={this.props.userInfo.name || ""}/>


                <UserCenter_Header/>


                <div className="time-or-channel">
                    <span className={this.state.showList === 0 ? "actived" : ""}
                          onClick={this.clickToSwitchHandler}>按时间</span>
                    <span className={this.state.showList === 1 ? "actived" : ""}
                          onClick={this.clickToSwitchHandler}>按频道</span>
                </div>

                <Separation height="10px"/>


                {
                    (this.state.showList === 0)
                        ?
                        <UserPosts user_id={this.props.userInfo.id}/>
                        :
                        <UserChannels user_id={this.props.userInfo.id}/>
                }


                <TabBar activedAt="4"/>
            </div>
        );
    }

    clickToSwitchHandler() {
        const listOrder = this.state.showList;
        this.setState({
            showList: (listOrder + 1) % 2,
        });
    }
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
// export default UserCenter;
import "./style.scss";

import React from "react";
import TopBar from "../../components/TopBar/index";
import Separation from "../../components/Separation/index";
import {getChannel} from "../../fetch/channel";

import {connect} from "react-redux";
import PostsList from "../PostsList/index";

class Channel extends React.Component {
    constructor(props, context) {
        super(props, context);

        //组件参数或路由参数
        let channelID = this.props.id ? this.props.id : this.props.params.id;

        /*  // use like this:
            const channel = data.info;
            let channelDatas = {};
            channelDatas["channel_" + channel.id] = channel;

            History.push({
                pathname: '/Channel/' + channel.id,
                state: channelDatas,
            });*/

        //路由传递或API获取
        let channelData;
        try {
            channelData = this.props.location.state["channel_" + channelID] || {};
        } catch (ex) {
            channelData = {};
        }


        this.state = {
            channelID: channelID,
            channelData: channelData,
        };

    }


    render() {
        return (
            <div className="channel-page">
                <TopBar title={this.state.channelData.title || ""}/>

                <div className="description">
                    <h5>频道简介:</h5>
                    <p>{this.state.channelData.description || "无"}</p>
                </div>


                <Separation height="10px"/>


                <PostsList/>
            </div>
        );
    }

    fetchChannelData() {
        console.log('fetchChannelData');
        const userInfo = this.props.userInfo;
        const promise = getChannel(userInfo.login_token, userInfo.id, this.state.channelID);
        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {
                this.setState({
                    channelData: Object.assign({}, data.info),
                });
                console.log(this.state.channelData);
            } else {
                const errors = data.info;
                alert(errors.join("\n"))
            }
        }).catch(ex => {
            console.log("fetch channel data err.");
        });
    };

    componentDidMount() {
        let channelData = this.state.channelData;

        if (!channelData.id) {
            this.fetchChannelData();
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.params.id);
        console.log(this.state.channelID);

        const newID = parseInt(newProps.params.id);
        const oldID = parseInt(this.state.channelID);
        if (newID !== oldID) {
            this.setState({
                channelID: newID
            });
            this.fetchChannelData();
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
// export default Channel;
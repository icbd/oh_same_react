import "./style.scss";

import React from "react";
import TopBar from "../../components/TopBar/index";

import {connect} from "react-redux";
import {createChannel} from "../../fetch/channel";
import {History} from "../../router/history";

class CreateChannel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: "",
            introduction: "",
            channel_type: 0,
            comment_type: 0,
            intimity: 0,

            currentStep: 0,
        };

        this.creationSteps = [];
        this.creationSteps.push(
            <div className="intimity">
                <img src="/assets/same/intimity_0.jpg" onClick={this.intimityClickHandler.bind(this, 0)}/>
                <img src="/assets/same/intimity_1.jpg" onClick={this.intimityClickHandler.bind(this, 1)}/>
            </div>
        );
        this.creationSteps.push(
            <div className="explanation">
                <img src="/assets/same/explanation1.jpg"/>
                <img src="/assets/same/explanation2.jpg"/>
                <img src="/assets/same/explanation3.jpg"/>
                <img src="/assets/same/explanation4.jpg"/>
                <img src="/assets/same/explanation5.jpg"/>

                <div className="explanation-next">
                    <p className="know">已充分了解公共频道主的权利和义务</p>
                    <p className="next" onClick={this.explanationClickHandler.bind(this)}>下一步</p>
                </div>
            </div>
        );
        this.creationSteps.push(
            <div className="channel_type">

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 0)}>
                    <img src="/assets/same/SearchCateImage_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">图文频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 1)}>
                    <img src="/assets/same/SearchCateText_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">文字频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 2)}>
                    <img src="/assets/same/SearchCateVoice_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">语音频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 3)}>
                    <img src="/assets/same/SearchCateMusic_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">音乐频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 4)}>
                    <img src="/assets/same/SearchCateMovie_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">电影频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 5)}>
                    <img src="/assets/same/SearchCateCart_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">打卡频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 6)}>
                    <img src="/assets/same/video@3x.png" className="fl"/>
                    <span className="typename fl">视频频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

                <div className="channel_type-item clearfix" onClick={this.channeltypeClickHandler.bind(this, 7)}>
                    <img src="/assets/same/SearchCateVote_24x24_@3x.png" className="fl"/>
                    <span className="typename fl">投票频道</span>
                    <span className="fr"><i className="fa fa-chevron-right"/></span>
                </div>

            </div>
        );

        this.creationSteps.push(
            <div className="comment_type">
                <img src="/assets/same/comment_type0.jpg" onClick={this.commenttypeClickHandler.bind(this, 0)}/>
                <img src="/assets/same/comment_type1.jpg" onClick={this.commenttypeClickHandler.bind(this, 1)}/>
            </div>
        );

        this.creationSteps.push(
            <div className="title">
                <img src="/assets/same/createChannelTitle.jpg"/>

                <div className="form">
                    <input className="title"
                           type="value"
                           placeholder="输入你的频道名称(10个字以内)"
                           onChange={this.titleInputHandler.bind(this)}
                           autoFocus="autofocus"/>
                    <textarea className="description"
                              type="textarea"
                              placeholder="输入你的频道简介(200个字以内)"
                              rows="4"
                              onChange={this.descriptionInputHandler.bind(this)}/>
                </div>

                <p className="submit" onClick={this.submitHandler.bind(this)}>确认提交</p>
            </div>
        );

    }

    render() {
        const that = this;

        return (
            <div className="create-channel">

                <TopBar title="申请创建频道"/>

                {that.creationSteps[this.state.currentStep]}
            </div>


        );
    }

    intimityClickHandler(intimity) {
        const currentStep = this.state.currentStep;
        const delta = (intimity === 0) ? 1 : 2;//私密频道跳过explanation
        this.setState({
            intimity: intimity,
            currentStep: currentStep + delta,
        });
    }

    explanationClickHandler() {
        const currentStep = this.state.currentStep;
        this.setState({
            currentStep: currentStep + 1,
        });
    }

    channeltypeClickHandler(channel_type) {
        const currentStep = this.state.currentStep;
        this.setState({
            channel_type: channel_type,
            currentStep: currentStep + 1,
        });
    }

    commenttypeClickHandler(comment_type) {
        const currentStep = this.state.currentStep;
        this.setState({
            comment_type: comment_type,
            currentStep: currentStep + 1,
        });
    }

    titleInputHandler(e) {
        const title = e.target.value;
        this.setState({
            title: title
        });
    }

    descriptionInputHandler(e) {
        const description = e.target.value;
        this.setState({
            description: description
        });
    }

    submitHandler() {
        const param_obj = {
            title: this.state.title,
            introduction: this.state.introduction,
            channel_type: this.state.channel_type,
            comment_type: this.state.comment_type,
            intimity: this.state.intimity,
        };

        const userInfo = this.props.userInfo;
        const promise = createChannel(userInfo.login_token, userInfo.id, param_obj);

        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {
                const channel = data.info;
                let channelDatas = {};
                channelDatas["channel_" + channel.id] = channel;

                History.push({
                    pathname: '/Channel/' + channel.id,
                    state: channelDatas,
                });

                // 取用:
                // this.props.location.state['channel_id']

            } else {
                const errors = data.info;
                alert(errors.join("\n"));
            }
        }).catch(ex => {
            console.warn(ex);
            console.warn("create channel err.");
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
// export default CreateChannel;
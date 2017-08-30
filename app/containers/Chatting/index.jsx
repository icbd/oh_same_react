import "./style.scss";

import React from "react";
import _TopBar from "./_TopBar";
import {connect} from "react-redux";
import userinfo from "../../reducers/userinfo";
import {getUserBasicInfo} from "../../fetch/user";
import {basic_info} from "../../util/user";
import conf from "../../../conf.json";
import _CreateMsg from "./_CreateMsg";
import _Msg from "./_Msg";
import {showDate} from "../../util/time";


class Chatting extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            ws: undefined,
            iid: this.props.userInfo.id || 0,
            hid: parseInt(this.props.params.hid) || 0, //路由参数
            mine: undefined,
            his: undefined,
            chat_msgs: [],

            typing: "false",
        };

        console.debug('this.state', this.state);
    }

    render() {

        const iid = this.state.iid;
        const hid = this.state.hid;
        const his = this.state.his;
        const mine = this.state.mine;

        const chat_msgs = this.state.chat_msgs;


        let chat_msgs_dom = [];
        let last_created_at = 0;
        chat_msgs.forEach((msg, index) => {
            console.debug('msg', msg);

            // 间隔一分钟以上, 显示时间
            if (msg.created_at - last_created_at > 60000) {
                chat_msgs_dom.push(
                    <div className="created_at" key={"created_at" + msg.created_at}>
                        <span>{showDate(msg.created_at, true)}</span>
                    </div>
                );
            }
            last_created_at = msg.created_at;

            const msg_dom = (
                <_Msg data={msg}
                      user={(msg.uid === iid) ? mine : his}
                      direction={(msg.uid === iid) ? "right" : "left"}
                      key={'_Msg' + msg.created_at}/>
            );
            chat_msgs_dom.push(msg_dom);
        });

        return (
            <div className="chatting">

                <_TopBar title={his ? his.name : ''} typing={this.state.typing}/>


                <div className="chatting-msgs">
                    {
                        chat_msgs_dom.map(item => {
                            return item;
                        })
                    }
                </div>


                <_CreateMsg
                    sendMsgFn={this.sendMsgFn.bind(this)}
                    typingFn={this.typingFn.bind(this)}/>

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        window.scrollTo(0, document.body.scrollHeight);
    }

    typingFn() {
        // 显示正在输入...
        const ws = this.getWS();
        ws.send(JSON.stringify({
            msgtype: 0,
            uid: this.state.iid,
            content: "typing",
            created_at: (new Date()).valueOf()
        }));
    }

    sendMsgFn(content) {
        console.debug('content', content);
        if (content.length < 1) {
            return;
        }

        // 消息格式
        const newMsg = {
            msgtype: 1,
            uid: this.state.iid,
            content: content,
            created_at: (new Date()).valueOf(),
        };

        this.setState({
            chat_msgs: this.state.chat_msgs.concat(newMsg)
        });


        const ws = this.getWS();
        const that = this;
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(newMsg));
        } else {
            console.debug('ws not ready.');
        }

    }


    componentWillReceiveProps(newProps) {
        // 直接修改路由hid, 断开重连
        const newID = parseInt(newProps.params.hid);
        const oldID = parseInt(this.state.hid);

        const that = this;
        if (newID !== oldID) {
            this.disConnect();
            this.setState({
                    hid: newID,
                    chat_msgs: [],
                    ws: undefined
                },

                function () {
                    that.getWS();
                }
            );
        }
    }


    // 统一获取websocket连接
    getWS() {
        const ws_api = conf.ws_api;
        const ws_param = "?type=privateChat&iid=" + this.state.iid + "&hid=" + this.state.hid;

        if (this.state.ws === undefined) {
            const ws = new WebSocket(ws_api + ws_param);
            this.setState({
                ws: ws,
            });
            return ws;
        } else {
            return this.state.ws;
        }
    }


    typing() {
        // 如果目前不在打字状态, 则切换到打字状态, 1s后自动切回来
        if (this.state.typing === "false") {
            this.setState({
                typing: "true"
            });

            const that = this;
            setTimeout(function () {
                that.setState({
                    typing: "false"
                });
            }, 1200);
        }
    }


    componentDidMount() {
        this.initInfo();

        const ws = this.getWS();
        const that = this;

        ws.onmessage = (e => {
            console.debug('onmessage', e);
            const msg = JSON.parse(e.data);
            if (msg.msgtype === 0) {
                switch (msg.content) {
                    case "typing":
                        that.typing();
                        break;
                    default:
                        break;
                }

            } else {
                that.setState({
                    chat_msgs: this.state.chat_msgs.concat(JSON.parse(e.data)),
                });
            }

        });

        ws.onopen = (e => {
            console.debug("websocket open", e);
        });

        ws.onclose = function (e) {
            console.debug("websocket close", e);
        };
    }

    initInfo() {
        const mine = basic_info(this.props.userInfo);

        const promise = getUserBasicInfo(this.state.hid);
        promise.then(ans => {
            const data = ans.data;
            const his = basic_info(data.info);

            this.setState({
                his: his,
                mine: mine,
            });
            console.debug(mine, his);

        }).catch(ans => {
            alert("网络波动, 刷新试试");
        });
    }

    disConnect() {
        const ws = this.state.ws;
        if (ws) {
            ws.close();
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);

// export default Chatting;
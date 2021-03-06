import React from "react";
import {History} from "../../router/history";
import "./style.scss";

class TabBar extends React.Component {
    constructor(props, context) {
        super(props, context);

        let actived = new Array(5).fill("");
        const activedAt = this.props.activedAt || 1;
        actived[activedAt] = "actived";

        this.state = {
            actived: actived.slice()
        }
    }

    render() {
        return (
            <div className="tabbar">
                <div className="icons">
                    <span className={this.state.actived[1]} onClick={this.gotoHome.bind(this)}><i
                        className="fa fa-compass"/></span>
                    <span className={this.state.actived[2]} onClick={this.gotoChannelList.bind(this)}><i
                        className="fa fa-stack-overflow"/></span>
                    <span className={this.state.actived[3]} onClick={this.gotoChatList.bind(this)}><i
                        className="fa fa-commenting-o"/></span>
                    <span className={this.state.actived[4]} onClick={this.gotoUserCenter.bind(this)}><i
                        className="fa fa-smile-o"/></span>
                </div>
            </div>
        );
    }

    gotoHome() {
        History.push("/Home");
    }

    gotoChannelList() {
        History.push("/ChannelList");
    }

    gotoChatList() {
        History.push("/ChatList");
    }

    gotoUserCenter() {
        History.push("/UserCenter");
    }
}

export default TabBar;
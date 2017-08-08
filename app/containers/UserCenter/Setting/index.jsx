import React from "react";
import TopBar from "../../../components/TopBar";
import {History} from "../../../router/history";

import "./style.scss";
import _MyInfo from "./_MyInfo/index";
import Separation from "../../../components/Separation/index";

/**
 * 独立渲染
 * /UserCenter/Setting
 *
 */
class Setting extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (

            <div className="user-center-setting">
                <TopBar title="设置"/>


                <_MyInfo/>


                <Separation height="20px"/>


                <div className="text-lists">
                    <p onClick={this.moneyHandler.bind(this)}>我的零钱</p>
                    <p onClick={this.sameHandler.bind(this)}>我同感的</p>
                    <p onClick={this.orderHandler.bind(this)}>我的订单</p>
                    <p onClick={this.channelHandler.bind(this)}>我创建的频道</p>
                </div>


                <Separation height="20px"/>


                <div className="text-lists">
                    <p onClick={this.functionHandler.bind(this)}>功能</p>
                    <p onClick={this.privateHandler.bind(this)}>隐私</p>
                    <p onClick={this.noticeHandler.bind(this)}>通知</p>
                    <p onClick={this.cacheHandler.bind(this)}>缓存</p>
                    <p onClick={this.aboutHandler.bind(this)}>关于 Oh-Same</p>
                </div>


                <Separation height="20px"/>


                <div className="text-lists" onClick={this.lououtHandler.bind(this)}>
                    <p className="logout">退出当前账户</p>
                </div>

                <div className="copyright">
                    <p className="logo">Oh-Same</p>
                    <p className="copyright">设计元素归 <a
                        href="https://same.com" target="_blank" rel="noopener noreferrer">same.com</a>版权所有</p>
                </div>
            </div>
        );
    }

    moneyHandler() {
        alert("开发排期中");//todo
    }

    sameHandler() {
        alert("开发中");//todo
    }

    moneyHandler() {
        alert("开发排期中");//todo
    }

    orderHandler() {
        alert("开发排期中");//todo
    }

    channelHandler() {
        alert("开发排期中");//todo
    }

    functionHandler() {
        alert("开发排期中");//todo
    }

    privateHandler() {
        alert("开发排期中");//todo
    }

    noticeHandler() {
        alert("开发排期中");//todo
    }

    cacheHandler() {
        alert("请在浏览器设置中清除缓存.\n\n" +
            "IOS: 设置->Safari->清除历史记录与网站数据");
    }

    aboutHandler() {
        History.push("/About");
    }

    lououtHandler() {
        localStorage.clear();
        location.href = "/";
    }

}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Setting);
export default Setting;
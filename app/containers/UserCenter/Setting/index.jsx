import React from "react";
import TopBar from "../../../components/TopBar";

import "./style.scss";
import MyInfo from "./MyInfo/index";
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


                <MyInfo/>


                <Separation height="20px"/>


                <div className="text-lists">
                    <p>我的零钱</p>
                    <p>我同感的</p>
                    <p>我的订单</p>
                    <p>我创建的频道</p>
                </div>


                <Separation height="20px"/>


                <div className="text-lists">
                    <p>功能</p>
                    <p>隐私</p>
                    <p>通知</p>
                    <p>缓存</p>
                    <p>关于 Oh-Same</p>
                </div>


                <Separation height="20px"/>


                <div className="text-lists" onClick={this.lououtHandler.bind(this)}>
                    <p className="logout">退出当前账户</p>
                </div>

                <div className="copyright">
                    <p className="logo">Oh-Same</p>
                    <p className="copyright">设计元素归 <a href="https://same.com" target="_blank">same.com</a> 版权所有</p>
                </div>
            </div>
        );
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
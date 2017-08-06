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

            <div>
                <TopBar title="设置"/>

                <MyInfo/>

                <Separation height="10px"/>

            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Setting);
export default Setting;
import React from "react";
import TopBar from "../../../components/TopBar";

import "./style.scss";

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

            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Setting);
export default Setting;
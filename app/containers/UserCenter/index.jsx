import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar";

import "./style.scss";
import UserCenter_Header from "../../components/UserCenter_Header/index";

class UserCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="user-center-page">
                <_TopBar title="😀FocusFocusFocus😀"/>

                <UserCenter_Header/>

                <TabBar activedAt="4"/>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
export default UserCenter;
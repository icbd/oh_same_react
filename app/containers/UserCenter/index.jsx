import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar";

import "./style.scss";

class UserCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="user-center-page">
                <_TopBar title="😀FocusFocusFocus😀"/>


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
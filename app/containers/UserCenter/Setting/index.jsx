import React from "react";

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
            <div>Setting</div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Setting);
export default Setting;
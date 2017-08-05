import React from "react";
import TabBar from "../../components/TabBar";

//import "./style.scss";

class ChannelList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>ChannelList
                <TabBar activedAt="2"/>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
export default ChannelList;
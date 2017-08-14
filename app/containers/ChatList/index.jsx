import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar";
import Separation from "../../components/Separation/index";

//import "./style.scss";

class ChatList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <_TopBar/>

                <Separation/>

                <TabBar activedAt="3"/>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
export default ChatList;
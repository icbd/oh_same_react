import React from "react";
import TabBar from "../../components/TabBar";

//import "./style.scss";

class ChatList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>ChatList

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
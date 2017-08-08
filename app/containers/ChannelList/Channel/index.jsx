//import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class Channel extends React.Component {
    constructor(props, context) {
        super(props, context);

        const channelID = this.props.params.id;
        console.log(channelID);
        this.state = {
            channelID: channelID,
        }
    }

    render() {
        return (
            <div>
                Channel-{this.state.channelID}
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Channel);
export default Channel;
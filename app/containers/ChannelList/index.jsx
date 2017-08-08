import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar/index";
import Separation from "../../components/Separation/index";
import ChannelItem from "../../components/ChannelItem/index";

// import "./style.scss";

class ChannelList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="channel-list-page">

                <_TopBar/>


                <Separation height="10px"/>


                <div className="ChannelItems">
                    <ChannelItem icon="" title="推荐电影12345678901234567890zxcvbnm," count='123' channelID="1" keys="1"/>
                    <ChannelItem icon="" title="推荐电影12345678901234567890zxcvbnm," count="456" channelID="23" keys="2"/>
                </div>

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
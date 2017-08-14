import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar/index";
import Separation from "../../components/Separation/index";
import ChannelItem from "../../components/ChannelItem/index";
import {getChannelsIndex} from "../../fetch/channel";
import LoadMoreBar from "../../components/LoadMoreBar/index";
import userinfo from "../../reducers/userinfo";
import {connect} from "react-redux";

// import "./style.scss";

class ChannelList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, LoadMoreBar.getLoadMoreStateTmp());
    }

    render() {
        const list = this.state.list;

        return (
            <div className="channel-list-page">

                <_TopBar/>


                <Separation height="10px"/>


                <div className="ChannelItems">
                    {list.map(channel => {
                        return <ChannelItem icon={channel.icon || ""}
                                            title={channel.title || ""}
                                            count={channel.posts_count || 0}
                                            channelID={channel.id}
                                            key={channel.id}/>
                    })}
                </div>


                <LoadMoreBar loadMoreFn={this.loadMore.bind(this)}
                             loadOver={this.state.loadOver}
                             isLoading={this.state.isLoading}/>


                <TabBar activedAt="2"/>

            </div>
        );
    }


    componentDidMount() {
        this.loadMore();
    }

    loadMore() {
        this.setState({
            isLoading: true,
        });

        const page = this.state.page;
        const per_page = this.state.per_page;
        const userInfo = this.props.userInfo;
        const promise = getChannelsIndex(userInfo.login_token, userInfo.id, this.props.channelID, page, per_page);
        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {
                const total = data.info.total;
                const list = data.info.list;
                const l = list.length;
                const loadOver = (l === 0 || l < per_page || l === total) ? true : false;

                this.setState({
                    total: total,
                    list: this.state.list.concat(list),
                    page: page + 1,
                    loadOver: loadOver,
                    isLoading: false,
                })
            }
        }).catch(ex => {
            console.warn(ex);
            console.warn("fetch channel posts err.");
        })
    }
}

// /* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
// export default ChannelList;
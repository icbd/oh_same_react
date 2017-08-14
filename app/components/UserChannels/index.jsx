import "./style.scss";

import React from "react";
import {getUserChannels} from "../../fetch/user";
import PropTypes from "prop-types";
import LoadMoreBar from "../LoadMoreBar";
import {connect} from "react-redux";
import ChannelItem from "../ChannelItem";

class UserChannels extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, LoadMoreBar.getLoadMoreStateTmp());
    }

    render() {
        const list = this.state.list;

        return (
            <div className="user-channels">

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
        const promise = getUserChannels(userInfo.login_token, userInfo.id, userInfo.id, page, per_page);
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
            console.warn("fetch user channels err.");
        })
    }
}

UserChannels.propTypes = {
    user_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//目标用户ID. 在个人中心是本人ID, 查看其它人时为对方ID
};

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChannels);
// export default UserChannels;
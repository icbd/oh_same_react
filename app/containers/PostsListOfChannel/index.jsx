import "./style.scss";

import React from "react";
import PostsItem from "../../components/PostsItem/index";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getChannelPosts} from "../../fetch/channel";
import LoadMoreBar from "../../components/LoadMoreBar/index";

class PostsListOfChannel extends React.Component {
    constructor(props, context) {
        super(props, context);

        const channelID = parseInt(this.props.channelID);

        this.state = Object.assign({
            channelID: channelID,
        }, LoadMoreBar.getLoadMoreStateTmp());
    }


    render() {
        const total = this.state.total;
        const list = this.state.list;

        return (
            <div className="posts-list" id="postsList">

                {
                    list.map(posts => {
                        return (
                            <PostsItem key={posts.id} posts={posts}/>
                        )
                    })
                }


                <LoadMoreBar loadMoreFn={this.loadMore.bind(this)}
                             loadOver={this.state.loadOver}
                             isLoading={this.state.isLoading}/>

            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        // 直接修改ID, 刷新数据
        const newID = parseInt(newProps.channelID);
        const oldID = parseInt(this.state.channelID);

        if (newID !== oldID) {
            this.setState({
                channelID: newID,
                page: 1,
                list: [],
            }, function () {
                this.loadMore();
            });
        }
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
        const promise = getChannelPosts(userInfo.login_token, userInfo.id, this.state.channelID, page, per_page);
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

PostsListOfChannel.propTypes = {
    channelID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};


/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListOfChannel);
// export default PostsListOfChannel;
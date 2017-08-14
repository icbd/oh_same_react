import "./style.scss";

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import LoadMoreBar from "../LoadMoreBar";
import {getUserPosts} from "../../fetch/user";
import PostsItem from "../PostsItem";

class UserPosts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, LoadMoreBar.getLoadMoreStateTmp());
    }

    render() {
        const total = this.state.total;
        const list = this.state.list;

        return (
            <div className="user-posts">

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
        const promise = getUserPosts(userInfo.login_token, userInfo.id, userInfo.id, page, per_page);
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
            console.warn("fetch user posts err.");
        })
    }
}

UserPosts.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
// export default UserPosts;
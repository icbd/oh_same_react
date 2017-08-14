import "./style.scss";

import React from "react";
import Separation from "../Separation/index";
import PropsType from "prop-types";
import {showDateDiff} from "../../util/time";

class PostsItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const posts = this.props.posts;
        const user = posts.user;

        let attachmentDiv = "";
        switch (posts.attach_type) {
            case 0://图文
                attachmentDiv = <img src={posts.attachment}/>;
                break;
            case 1://纯文
                break;
            case 2://语音
                break;
            case 3://音乐
                break;
            case 4://电影
                break;
            case 5://打卡
                break;
            case 6://视频
                break;
            case 7://投票
                break;
            default:
                break;
        }


        return (
            <div className="posts-item">

                <div className="top clearfix">
                    <img src={user.avatar || "/assets/favicon.ico"} className="avatar fl"/>
                    <div className="user fl">
                        <p className="name">{user.name}</p>
                        <p className="time">{showDateDiff(posts.created_at)}</p>
                    </div>
                    <span className="func fr"><i className="fa fa-ellipsis-h"/></span>
                </div>

                <div className="attachment">{attachmentDiv}</div>

                <div className="content">
                    <p className="text-type">{posts.content || ''}</p>
                </div>


                <div className="bottom clearfix">
                    <div className="count fl">
                        <div className="same-count">
                            <span><i className="fa fa-heart"/></span>
                            <span>{posts.same_count}</span>
                        </div>
                        <div className="show-count">
                            <span><i className="fa fa-eye"/></span>
                            <span>{posts.view_count}</span>
                        </div>
                    </div>
                    <div className="interact fr">
                        <span className="dosame actived"><i className="fa fa-heart-o"/><i
                            className="fa fa-heart"/></span>
                        <span><i className="fa fa-comments-o"/></span>
                        <span><i className="fa fa-share-alt"/></span>
                    </div>
                </div>


                <Separation height="10px"/>
            </div>
        );
    }
}


PostsItem.propsType = {
    posts: PropsType.object.isRequired,
};
// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(PostsItem);
export default PostsItem;
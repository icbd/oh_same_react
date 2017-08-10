import "./style.scss";

import React from "react";
import Separation from "../../../components/Separation/index";

//import {connect} from "react-redux";

class PostsItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="posts-item">

                <div className="top clearfix">
                    <img src="/assets/favicon.ico" className="avatar fl"/>
                    <div className="user fl">
                        <p className="name">username</p>
                        <p className="time">time</p>
                    </div>
                    <span className="func fr"><i className="fa fa-ellipsis-h"/></span>
                </div>


                <div className="content">
                    <p className="text-type">
                        text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type
                        正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正text-type 正文text-type
                        正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type 正文text-type
                        正文text-type 正文text-type 正文text-type 正文text-type 正text-type 正文text-type 正文text-type 正文text-type
                    </p>
                </div>


                <div className="bottom clearfix">
                    <div className="count fl">
                        <div className="same-count">
                            <span><i className="fa fa-heart"/></span>
                            <span>123</span>
                        </div>
                        <div className="show-count">
                            <span><i className="fa fa-eye"/></span>
                            <span>1234</span>
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

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(PostsItem);
export default PostsItem;
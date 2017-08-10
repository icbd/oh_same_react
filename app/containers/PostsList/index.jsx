import "./style.scss";

import React from "react";
import PostsItem from "./PostsItem/index";

//import {connect} from "react-redux";

class PostsList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="posts-list">

                <PostsItem/>

            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
export default PostsList;
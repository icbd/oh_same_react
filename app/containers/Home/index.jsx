import React from "react";
import TabBar from "../../components/TabBar";
import _TopBar from "./_TopBar";
import PostsListOfAll from "../PostsListOfAll/index";

//import "./style.scss";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">
                <_TopBar/>

                <PostsListOfAll/>

                <TabBar activedAt="1"/>
            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
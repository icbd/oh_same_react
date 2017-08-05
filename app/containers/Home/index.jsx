import React from "react";
import TabBar from "../../components/TabBar";

//import "./style.scss";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">Home

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
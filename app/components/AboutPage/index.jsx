import "./style.scss";
import {version} from "../../../package.json";

import React from "react";
import TopBar from "../TopBar/index";
import Separation from "../Separation/index";

//import {connect} from "react-redux";

class AboutPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="about-page">

                <TopBar title="关于 Oh-Same"/>

                <div className="copyright">
                    <p className="logo">Oh-Same</p>
                    <p className="version">Version {version}</p>
                    <p className="copyright">设计元素归 <a href="https://same.com" target="_blank" rel="noopener noreferrer">same.com</a>
                        版权所有</p>
                </div>


                <Separation backgroundColor="white"/>


                <div className="treaty">

                    <h3>License</h3>
                    <p>
                        All photos published on Oh-Same.com can be used for free.
                        You can use them for commercial and noncommercial purposes.
                        You do not need to ask permission from or provide credit to the photographer or Oh-Same.com,
                        although it is appreciated when possible.
                    </p>

                    <p>
                        More precisely, Oh-Same.com grants you a nonexclusive copyright license to download,
                        copy, modify, distribute, perform, and use photos from Oh-Same.com for free,
                        including for commercial purposes,
                        without permission from or attributing the photographer or Oh-Same.com.
                        This license does not include the right to compile photos from Oh-Same.com to replicate a
                        similar or competing service.
                    </p>
                </div>


                <Separation backgroundColor="white"/>


                <div className="thanks">
                    <h3>Thanks</h3>

                    <p><a href="https://same.com" target="_blank" rel="noopener noreferrer">same.com</a></p>
                    <p><a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">babeljs.io</a></p>
                    <p><a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">facebook.github.io/react</a>
                    </p>
                    <p><a href="https://github.com/reactjs/redux" target="_blank" rel="noopener noreferrer">github.com/reactjs/redux</a>
                    </p>
                    <p><a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">webpack.js.org</a>
                    </p>
                    <p><a href="https://github.com/mzabriskie/axios" target="_blank" rel="noopener noreferrer">github.com/mzabriskie/axios</a>
                    </p>
                </div>

            </div>
        );
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
export default AboutPage;
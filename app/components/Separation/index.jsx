//import "./style.scss";

import React from "react";
import PropTypes from "prop-types";


class Separation extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.style = {
            padding: 0,
            margin: 0,
            display: 'block',
            height: this.props.height || "10px",
            backgroundColor: this.props.backgroundColor || "#eee",
        }
    }

    render() {
        return (
            <div style={this.style} className="separation"/>
        );
    }
}

Separation.propTypes = {
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
};


// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(Separation);
export default Separation;
import "./style.scss";

import React from "react";

//import {connect} from "react-redux";

class _CreateMsg extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            content: ""
        }
    }


    render() {
        return (
            <div className="create-msg clearfix" id="create_msg_div">

                <div id="createMsgCamera" className="fl"><span id="createMsgCameraSpan"><i
                    className="fa fa-camera"/></span></div>

                <input className="fl"
                       type="text"
                       placeholder=""
                       value={this.state.content}
                       // onFocus={this.onFocusHandler.bind(this)}
                       // onBlur={this.onBlueHandler.bind(this)}
                       onKeyDown={this.watchEnterKeydown.bind(this)}
                       onChange={this.inputHandle.bind(this)}/>

                <span className="fr" onClick={this.createMsgHandler.bind(this)}>发送</span>
            </div>
        );
    }

    inputHandle(e) {
        this.setState({
            content: e.target.value,
        });

        this.props.typingFn();
    }

    onFocusHandler() {
        document.getElementById('create_msg_div').style.paddingBottom = "100px";
    }


    onBlueHandler() {
        console.debug('onBlueHandler');
        setTimeout(function () {
            document.getElementById('create_msg_div').style.paddingBottom = "0";
        }, 50);

    }

    watchEnterKeydown(e) {
        if (e.keyCode === 13) {
            this.createMsgHandler();
        }
    }

    createMsgHandler() {
        console.debug('click send');

        const content = this.state.content;
        this.props.sendMsgFn(content);
        this.setState({
            content: ''
        })
    }
}

// /* ---------- Redux bind React ---------- */
// function mapStateToProps(state) {return {}}
// function mapDispatchToProps(dispatch) {return {}}
// export default connect(mapStateToProps, mapDispatchToProps)(_CreateMsg);
export default _CreateMsg;
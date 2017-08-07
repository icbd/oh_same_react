import "./style.scss";

import React from "react";
import TopBar from "../../../../components/TopBar/index";

import {connect} from "react-redux";

class SetInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="user-center-setting-setinfo">
                <TopBar title="修改资料"/>

                <div className="avatar">
                    <input type="file"
                           name="avatar"
                           ref="avatarInput"
                           style={{display: 'none'}}
                           onChange={this.avatarFileHandler.bind(this, this.files)}
                    />

                    <img className="avatar" src={this.props.userInfo.avatar || "/assets/favicon.ico"}
                         onClick={this.avatarHandler.bind(this)}/>
                    <div className="camera">
                        <div className="camera-inner"><i className="fa fa-camera"/></div>
                    </div>
                </div>

                <div className="lists">
                    <p className="clearfix">
                        <span>修改用户名</span>
                        <span className="fr">{this.props.userInfo.name || "Oh-Samer"} <i
                            className="fa fa-chevron-right"/></span>
                    </p>
                </div>
            </div>
        );
    }

    avatarHandler() {
        const avatarInput = this.refs.avatarInput;
        avatarInput.click();
    }

    avatarFileHandler() {
        const avatarInput = this.refs.avatarInput;
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const exts = new Set(["image/png", "image/jpeg", "image/gif"]);
            if (exts.has(file.type)) {
                if (file.size <= 3072000) {//3M

                    //todo
                    console.log(file);

                } else {
                    alert("图片太大啦:(");
                }
            } else {
                alert("请使用 png/jpg/gif 格式的图片");
            }
        }
    }
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetInfo);
// export default SetInfo;
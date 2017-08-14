import "./style.scss";

import React from "react";
import TopBar from "../../../../components/TopBar/index";
import {gainUpToken} from "../../../../fetch/auth.js";
import {updateUser} from "../../../../fetch/user";
import {connect} from "react-redux";
import conf from "../../../../../conf.json";
import {bindActionCreators} from 'redux';
import * as userInfoActionsBindToReact from '../../../../actions/userinfo.js';
import LocalStore from "../../../../util/localStore";
import {USER_INFO} from "../../../../constants/localStoreKey";
import {getUpToken} from "../../../../fetch/uptoken";

class SetInfo extends React.Component {
    constructor(props, context) {
        super(props, context);

        const updateUserInfoFunc = (param) => {
            const userInfo = this.props.userInfo;
            const promise = updateUser(userInfo.login_token, userInfo.id, param);
            promise.then(ans => {
                const data = ans.data;
                if (data.code === 0) {
                    //redux
                    const userInfo = data.info;
                    this.props.userInfoActions.update(userInfo);
                    LocalStore.setItem(USER_INFO, JSON.stringify(userInfo));

                    alert("修改成功");

                } else {
                    alert(data.info.join("\n"));
                }
            })
        };

        this.state = {
            uploader: undefined,
            updateUserInfoFunc: updateUserInfoFunc
        };
    }

    render() {
        return (
            <div className="user-center-setting-setinfo">
                <TopBar title="修改资料"/>

                <div className="avatar">

                    <img className="avatar" src={this.props.userInfo.avatar || "/assets/favicon.ico"} id="avatarImg"/>

                    <div className="camera" id="avatarCamera">
                        <div className="camera-inner" id="avatarCameraInner"><i className="fa fa-camera"/></div>
                    </div>
                </div>

                <div className="lists" id="up">
                    <p className="clearfix">
                        <span>修改用户名</span>
                        <span className="fr"
                              onClick={this.changeNameHandle.bind(this)}>{this.props.userInfo.name || "Oh-Samer"} <i
                            className="fa fa-chevron-right"/></span>
                    </p>
                </div>
            </div>
        );
    }

    changeNameHandle() {
        const userInfo = this.props.userInfo;
        const name = prompt("修改昵称", userInfo.name);
        if (name !== null) {
            this.state.updateUserInfoFunc({name: name});
        }
    }


    componentDidMount() {

        // START>>>
        const that = this;
        getUpToken(function (upToken) {
            var uploader = Qiniu.uploader({
                browse_button: 'avatarCameraInner',         // 上传选择的点选按钮，必需
                container: 'avatarCamera',             // 上传区域DOM ID，默认是browser_button的父元素

                uptoken: upToken, // uptoken是上传凭证，由其他程序生成
                runtimes: 'html5,html4',      // 上传模式，依次退化
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: conf.qiniu.bucket_domain,     // bucket域名，下载资源时用到，必需
                max_file_size: '3mb',             // 最大文件体积限制
                max_retries: 2,                     // 上传失败最大重试次数
                dragdrop: false,                     // 开启可拖曳上传
                // drop_element: 'avatarCamera',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '3mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                multi_selection: false,             // 设置一次只能选择一个文件
                filters: {
                    mime_types: [
                        {title: "Image files", extensions: "jpg,jpeg,gif,png"}
                    ]
                },
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {// 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {// 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function (up, file) {// 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {
                        const domain = up.getOption('domain');
                        const response = JSON.parse(info.response);//key and hash
                        const sourceLink = domain + response.key; // 上传成功后的文件的Url

                        console.debug("sourceLink:" + sourceLink);
                        that.state.updateUserInfoFunc({avatar: sourceLink});
                    },
                    'Error': function (up, err, errTip) {//上传出错时，处理相关的事情
                    },
                    'UploadComplete': function () {//队列文件处理完毕后，处理相关的事情
                    },
                    'Key': function (up, file) {// 若想在前端对每个文件的key进行个性化处理，可以配置该函数// 该配置必须要在unique_names: false，save_key: false时才生效
                        var key = "";// do something with key here
                        return key
                    }
                }
            });

            that.setState({
                uploader: uploader
            });
        });
        // EDN<<<

    }
}

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsBindToReact, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetInfo);
// export default SetInfo;
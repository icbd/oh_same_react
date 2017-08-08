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
                        <div className="camera-inner"><i className="fa fa-camera"/></div>
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
        const that = this;

        // 获取上传令牌
        let userInfo = this.props.userInfo;
        const promise = gainUpToken(userInfo.login_token, userInfo.id);
        promise.then(ans => {
            const data = ans.data;
            console.log(data);
            if (data.code === 0) {

                // START>>>
                const upToken = data.info;
                var uploader = Qiniu.uploader({
                    runtimes: 'html5,html4',      // 上传模式，依次退化
                    browse_button: 'avatarCamera',         // 上传选择的点选按钮，必需
                    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                    uptoken: upToken, // uptoken是上传凭证，由其他程序生成
                    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                    // uptoken_func: function(){    // 在需要获取uptoken时，该方法会被调用
                    //    // do something
                    //    return uptoken;
                    // },
                    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                    // downtoken_url: '/downtoken',
                    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                    unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                    domain: conf.qiniu.bucket_domain,     // bucket域名，下载资源时用到，必需
                    container: 'avatarImg',             // 上传区域DOM ID，默认是browser_button的父元素
                    max_file_size: '3mb',             // 最大文件体积限制
                    // flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                    max_retries: 2,                     // 上传失败最大重试次数
                    dragdrop: false,                     // 开启可拖曳上传
                    // drop_element: 'avatarImg',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '3mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    multi_selection: false,             // 设置一次只能选择一个文件
                    filters: {
                        mime_types: [
                            {title: "Image files", extensions: "jpg,jpeg,gif,png"}
                        ]
                    },
                    //x_vars : {
                    //    查看自定义变量
                    //    'time' : function(up,file) {
                    //        var time = (new Date()).getTime();
                    // do something with 'time'
                    //        return time;
                    //    },
                    //    'size' : function(up,file) {
                    //        var size = file.size;
                    // do something with 'size'
                    //        return size;
                    //    }
                    //},
                    init: {
                        'FilesAdded': function (up, files) {
                            plupload.each(files, function (file) {
                                // 文件添加进队列后，处理相关的事情
                            });
                        },
                        'BeforeUpload': function (up, file) {
                            // 每个文件上传前，处理相关的事情
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时，处理相关的事情
                        },
                        'FileUploaded': function (up, file, info) {
                            // 每个文件上传成功后，处理相关的事情
                            // 其中info是文件上传成功后，服务端返回的json，形式如：
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            // 查看简单反馈
                            const domain = up.getOption('domain');
                            const response = JSON.parse(info.response);//key and hash
                            const sourceLink = domain + response.key; // 上传成功后的文件的Url

                            if (__DEV__) {
                                console.log("sourceLink:" + sourceLink);
                            }

                            that.state.updateUserInfoFunc({avatar: sourceLink});

                        },
                        'Error': function (up, err, errTip) {
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后，处理相关的事情
                        },
                        'Key': function (up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效

                            var key = "";
                            // do something with key here
                            return key
                        }
                    }
                });

                // domain为七牛空间对应的域名，选择某个空间后，可通过 空间设置->基本设置->域名设置 查看获取
                // uploader为一个plupload对象，继承了所有plupload的方法
                // EDN<<<

                this.setState({
                    uploader: uploader
                });

            } else {
                alert("网络波动, 刷新试试");
            }
        }).catch(ans => {
            console.log(ans);
            alert("网络波动, 刷新试试");
        });


    }

    // avatarHandler() {
    //     const avatarInput = this.refs.avatarInput;
    //     avatarInput.click();
    // }
    //
    // avatarFileHandler() {
    //     const avatarInput = this.refs.avatarInput;
    //     if (avatarInput.files.length > 0) {
    //         const file = avatarInput.files[0];
    //         const exts = new Set(["image/png", "image/jpeg", "image/gif"]);
    //         if (exts.has(file.type)) {
    //             if (file.size <= 3072000) {//3M
    //
    //                 console.log('this.state.uploader.start();');
    //                 console.log(this.state.uploader);
    //                 console.log(this.state.uploader.start);
    //                 this.state.uploader.start();
    //
    //             } else {
    //                 alert("图片太大啦:(");
    //             }
    //         } else {
    //             alert("请使用 png/jpg/gif 格式的图片");
    //         }
    //     }
    // }
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
import "./style.scss";

import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createPosts} from "../../../fetch/posts";
import conf from "../../../../conf.json";
import {getUpToken} from "../../../fetch/uptoken";

class _CreatePosts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            content: "",
            uploader: undefined,
            attach: "",
        }
    }

    render() {
        return (
            <div className="create-posts clearfix">

                <div id="createPostsCamera" className="fl"><span id="createPostsCameraSpan"><i
                    className="fa fa-camera"/></span></div>

                <input className="fl" type="text" placeholder="有什么新鲜事?" onChange={this.inputHandle.bind(this)}/>

                <span className="fr" onClick={this.createPostsHandler.bind(this)}>发布</span>
            </div>
        );
    }

    inputHandle(e) {
        this.setState({
            content: e.target.value,
        })
    }

    createPostsHandler() {
        const content = this.state.content.trim();
        if (!content) {
            return false;
        }

        const channelID = this.props.channelID;
        const userInfo = this.props.userInfo;
        const posts = {
            channel_id: channelID,
            content: content,
            attachment: JSON.stringify([1, 2, 3]),
            attach_type: 0,
        };

        const promise = createPosts(userInfo.login_token, userInfo.id, posts);
        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {

                const newPosts = data.info;
                //todo

            } else {
                alert(data.info.join("\n"));
            }

        }).catch(ex => {
            console.warn(ex);
            console.warn("create posts error.");
        });
    }


    componentDidMount() {
        const that = this;

        // START>>>
        getUpToken(function (upToken) {
            var uploader = Qiniu.uploader({
                runtimes: 'html5,html4',      // 上传模式，依次退化
                browse_button: 'createPostsCameraSpan',         // 上传选择的点选按钮，必需
                container: 'createPostsCamera',             // 上传区域DOM ID，默认是browser_button的父元素
                uptoken: upToken, // uptoken是上传凭证，由其他程序生成
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                domain: conf.qiniu.bucket_domain,     // bucket域名，下载资源时用到，必需
                max_file_size: '3mb',             // 最大文件体积限制
                max_retries: 2,                     // 上传失败最大重试次数
                dragdrop: false,                     // 开启可拖曳上传
                chunk_size: '3mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                multi_selection: false,             // 设置一次只能选择一个文件
                filters: {
                    mime_types: [
                        {title: "Image files", extensions: "jpg,jpeg,gif,png,mp4,mp3,m4a"}
                    ]
                },
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {/* 文件添加进队列后，处理相关的事情*/
                        });
                    },
                    'BeforeUpload': function (up, file) {// 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function (up, file) {// 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {// 每个文件上传成功后，处理相关的事情
                        const domain = up.getOption('domain');
                        const response = JSON.parse(info.response);//key and hash
                        const sourceLink = domain + response.key; // 上传成功后的文件的Url
                        console.debug("sourceLink:" + sourceLink);
                        that.setState({
                            attach: sourceLink,
                        })
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

_CreatePosts.propTypes = {
    channelID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/* ---------- Redux bind React ---------- */
function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(_CreatePosts);
// export default _CreatePosts;
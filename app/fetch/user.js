// 用户信息
import axios from "axios";
import {APIs, queryString} from "./api.js";

export function updateUser(login_token, uid, obj) {
    return axios.patch(APIs.user + uid,
        Object.assign({login_token: login_token, uid: uid}, obj));
}


export function getUserPosts(login_token, uid, user_id, page = 1, per_page = 5) {
    return axios.get(APIs.user_posts + user_id + "/posts" + queryString({
        login_token: login_token,
        uid: uid,
        page: page,
        per_page: per_page,
    }));
}


export function getUserChannels(login_token, uid, user_id, page = 1, per_page = 5) {
    return axios.get(APIs.user_channels + user_id + "/channels" + queryString({
        login_token: login_token,
        uid: uid,
        page: page,
        per_page: per_page,
    }));
}


export function getUserBasicInfo(user_id) {
    return axios.get(APIs.user_show + user_id);
}
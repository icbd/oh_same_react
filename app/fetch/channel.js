// 频道
import axios from "axios";
import {APIs, queryString} from "./api.js";

export function createChannel(login_token, uid, obj) {
    return axios.post(APIs.channel_create,
        Object.assign({login_token: login_token, uid: uid}, obj));
}

export function getChannel(login_token, uid, channelID) {
    return axios.get(APIs.channel_show + channelID + queryString({login_token: login_token, uid: uid}));
}

export function getChannelPosts(login_token, uid, channelID, page = 1, per_page = 5) {
    return axios.get(APIs.channel_posts + channelID + "/posts" + queryString({
        login_token: login_token,
        uid: uid,
        page: page,
        per_page: per_page,
    }));
}

export function getChannelsIndex(page = 1, per_page = 5) {
    return axios.get(APIs.channel_index);
}
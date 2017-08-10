// 频道
import axios from "axios";
import {APIs} from "./api.js";

export function createChannel(login_token, uid, obj) {
    return axios.post(APIs.channel_create,
        Object.assign({login_token: login_token, uid: uid}, obj));
}

export function getChannel(login_token, uid, channelID) {
    return axios.get(APIs.channel_show + channelID,
        {login_token: login_token, uid: uid});
}
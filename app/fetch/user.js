// 用户信息
import axios from "axios";
import {APIs} from "./api.js";

export function updateUser(login_token, uid, obj) {
    return axios.patch(APIs.users + uid,
        Object.assign({login_token: login_token, uid: uid}, obj));
}

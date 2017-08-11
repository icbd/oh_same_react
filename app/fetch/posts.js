// 帖子
import axios from "axios";
import {APIs} from "./api.js";

export function createPosts(login_token, uid, posts) {
    return axios.post(APIs.posts_create,
        Object.assign({login_token: login_token, uid: uid}, posts));
}
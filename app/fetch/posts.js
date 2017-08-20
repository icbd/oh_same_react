// 帖子
import axios from "axios";
import {APIs, queryString} from "./api.js";

export function createPosts(login_token, uid, posts) {
    return axios.post(APIs.posts_create,
        Object.assign({login_token: login_token, uid: uid}, posts));
}

export function getAllPosts(login_token, uid, page = 1, per_page = 5) {
    return axios.get(APIs.posts_index + queryString({
        login_token: login_token,
        uid: uid,
        page: page,
        per_page: per_page,
    }));
}
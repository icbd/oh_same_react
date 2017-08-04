// 身份认证
import axios from "axios";
import {APIs} from "./api.js";

export function postRegister(email = "", password = "") {
    return axios.post(APIs.auth_register, {email: email, password: password});
}

export function postLogin(email = "", password = "") {
    return axios.post(APIs.auth_login, {email: email, password: password});
}

export function authLoginToken(login_token, uid) {
    return axios.post(APIs.auth_auth, {login_token: login_token, uid: uid});
}
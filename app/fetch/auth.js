// 身份认证
import axios from "axios";
import {APIs} from "./api.js";

export function postRegister(data) {
    return axios.post(APIs.auth_register, data);
}

export function postLogin(data) {
    return axios.post(APIs.auth_login, data);
}
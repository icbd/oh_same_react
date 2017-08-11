// 获取上传令牌
import {USER_INFO} from "../constants/localStoreKey";
import {gainUpToken} from "../fetch/auth.js";
import LocalStore from "../util/localStore";
import * as Cookies from "js-cookie";

export function setUpToken() {
    console.log('setUpToken');
    let userInfo = JSON.parse(LocalStore.getItem(USER_INFO));
    const promise = gainUpToken(userInfo.login_token, userInfo.id);
    promise.then(ans => {
        const data = ans.data;
        console.log(data);
        if (data.code === 0) {
            const upToken = data.info;

            Cookies.set("upToken", upToken, {expires: 1});

            return upToken;

        } else {
            alert(data.info.join("\n"));
        }
    }).catch(ans => {
        console.log(ans);
        alert("网络波动, 刷新试试!");
    });
}

export function getUpToken() {
    console.log('getUpToken');
    const upToken = Cookies.get("upToken", upToken);
    console.log('upToken');
    console.log(upToken);
    if (!upToken) {
        return setUpToken();
    }
}
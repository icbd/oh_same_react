// 获取上传令牌
import {USER_INFO} from "../constants/localStoreKey";
import {gainUpToken} from "../fetch/auth.js";
import LocalStore from "../util/localStore";
import * as Cookies from "js-cookie";

function resetToken() {
    let upToken = "";

    let userInfo = JSON.parse(LocalStore.getItem(USER_INFO));
    const promise = gainUpToken(userInfo.login_token, userInfo.id);
    promise.then(ans => {
        const data = ans.data;
        if (data.code === 0) {
            upToken = data.info;

            Cookies.set("upToken", upToken, {expires: 1});
        } else {
            alert(data.info.join("\n"));
        }
    }).catch(ans => {
        console.log(ans);
        alert("网络波动, 刷新试试!");
    });

    return upToken;
}

export function setUpToken() {
    const upToken = Cookies.get("upToken");

    if (!upToken) {
        return resetToken();
    } else {
        return upToken;
    }
}

export function getUpToken(func) {
    let upToken = Cookies.get("upToken");

    let callback = func;
    if (typeof(callback) !== "function") {
        callback = (token) => {
            return token;
        }
    }

    if (upToken) {
        return callback(upToken);
    } else {
        let userInfo = JSON.parse(LocalStore.getItem(USER_INFO));
        const promise = gainUpToken(userInfo.login_token, userInfo.id);
        promise.then(ans => {
            const data = ans.data;
            if (data.code === 0) {
                upToken = data.info;

                Cookies.set("upToken", upToken, {expires: 1});

            } else {
                alert(data.info.join("\n"));
            }
        }).catch(ans => {
            console.log(ans);
            alert("网络波动, 刷新试试!");
        });
    }

    return callback(upToken);
}
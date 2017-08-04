//API 集中管理

// 前缀, 开发环境用于proxy识别
const pre = __DEV__ ? "/api" : "";

export const APIs = {
    "auth_register": pre + "/auth/register",
    "auth_login": pre + "/auth/login",
    "auth_auth": pre + "/auth/auth",
};
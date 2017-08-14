//API 集中管理

// 前缀, 用于proxy识别
const pre = __DEV__ ? "/api" : "/api";

export const APIs = {
    "auth_register": pre + "/auth/register",// POST /auth/register
    "auth_login": pre + "/auth/login",      // POST /auth/login
    "auth_auth": pre + "/auth/auth",        // POST /auth/auth
    "auth_uptoken": pre + "/auth/uptoken",  // POST /auth/uptoken

    "user": pre + "/users/",                // PATCH /users/:id
    "user_posts": pre + '/users/',          // GET /users/:id/posts
    "user_channels": pre + '/users/',       // GET /users/:id/channels

    "channel_index": pre + '/channels',     // GET /channels
    "channel_create": pre + "/channels",    // POST /channels
    "channel_show": pre + "/channels/",     // GET  /channels/:id
    "channel_posts": pre + "/channels/",    // GET /channels/:id/posts

    "posts_create": pre + "/posts",         // POST /posts
};


// 组装查询字符串
export function queryString(mapObj) {
    return '?' +
        Object.keys(mapObj).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(mapObj[key]);
            }
        ).join('&');
}
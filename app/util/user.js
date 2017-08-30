export function basic_info(user, filter = ['id', 'name', 'avatar', 'created_at'], default_value = {'avatar': '/assets/favicon.ico'}) {
    let obj = {};

    // 过滤有用的属性
    filter.map(function (key) {
        if (key in user) {
            obj[key] = user[key];
        }
    });


    // 存在,但是无有效值,自动填充默认值
    for (const k in default_value) {
        if ((k in obj) && (undefined == obj[k])) {
            obj[k] = default_value[k];
        }
    }

    return obj;
}
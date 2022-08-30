const joi = require("joi")
//定义name和alias的验证规则
const name = joi.string().required();
//定义分类id的校验规则
const id = joi.number().integer().min(1).required();
const alias = joi.string().alphanum().required();
//向外共享验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
exports.delete_cate_schema = {
    params: {
        id
    }
}
exports.get_cate_schema = {
    params: {
        id
    }
}
exports.update_cate_schema = {
    params: {
        id
    },
    body: {
        name,
        alias
    }
}

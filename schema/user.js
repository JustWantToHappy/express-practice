//导入定义验证规则的包
const joi = require("joi")
//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();

const password = joi.string().pattern(/^[\S]{6,12}$/).required();
//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();
//定义头像验证规则
const avatar=joi.string().required();
//注意：只能对body类型的数据进行验证
//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}
//定义验证id,nickname,email表单数据的规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email:user_email
    }
}
//定义验证密码的规则
exports.update_password_schema={
    body:{
        oldPwd:password,
        //joi.ref('oldPwd')表示newPwd的值必须要和oldPwd的值保持一致，
        //joi.not(joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd的值
        //.concat()用于合并joi.not(joi.ref("oldPwd"))和password这两条验证规则
        newPwd:joi.not(joi.ref("oldPwd")).concat(password)
    }
}
//定义头像的规则
exports.update_avatar_schema={
    body:{
        avatar
    }
}
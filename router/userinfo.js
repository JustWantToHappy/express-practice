const express = require("express")
const router = express.Router();
//导入路由处理函数模块
const handler = require("../router_handler/userinfo");
//导入验证数据的中间件
const expressJoi = require("@escook/express-joi")
//导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require("../schema/user")

//获取用户基本信息的路由
router.post("/userinfo", handler.getUserInfo)
//更新用户信息的路由
router.post("/updateinfo", expressJoi(update_userinfo_schema), handler.updateUserInfo)
//重置密码的路由
router.post("/updatepwd", expressJoi(update_password_schema), handler.updatePassword);
//更新头像
router.post("/updateAvatar", expressJoi(update_avatar_schema), handler.updateAvatar);
module.exports = router;
const express = require("express")
const cors = require("cors")
const app = express();
const useRouter = require("./router/user")
const userinfoRouter = require("./router/userinfo");
const artcateRouter = require("./router/artcate")
const articleRouter = require("./router/article");
const joi = require("joi")
//配置cors中间件
app.use(cors());
//配置解析表单数据的中间件，只能解析application/x-www-form-urlencoded格式的表单数据的中间件
app.use(express.urlencoded());
//在路由之前，给res对象添加一个方法
app.use((req, res, next) => {
    //传递的参数中status默认值为1，表示发生了错误
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
//路由之前配置解析token的中间件
const expressJwt = require("express-jwt")
const config = require("./config");
app.use(expressJwt({ secret: config.secretKey }).unless({ path: [/\/api/] }))

//使用路由模块
app.use("/api", useRouter);
app.use("/my", userinfoRouter);
app.use("/my/articate", artcateRouter);
app.use("/my/article", articleRouter);
//定义错误级别的中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError)
        return res.cc(err);
    //身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc("身份认证失败")
    }
    res.cc("未知的错误");
})
app.listen(4001, () => {
    console.log("server is running");
})
//导入数据库
const db = require("../db")
//导入bcryptjs
const bcryptjs = require("bcryptjs")
//导入生成token的包
const jwt=require("jsonwebtoken")
const config=require("../config")
//登录处理函数
exports.login = function (req, res) {
    let userInfo = req.body;
    const sql = "select * from ev_users where username=?";
    db.query(sql, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) {
            return res.cc("登录失败!");
        }
        //判断密码是否正确,bcryptjs.compareSync的第一个参数是用户输入的密码
        //第二个参数是数据库中被加密后的密码
        const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password);
        if (!compareResult) {
            res.send("登录失败")
        } 
        //在服务端生成token的字符串
        const user={
            ...results[0],
            password:"",
            user_pic:""
        }
        //对用户信息进行加密，生成token字符串,第二个参数是密钥，第三个参数是有效期
        const tokenStr=jwt.sign(user,config.secretKey,{expiresIn:'10h'})
        res.send({
            status:0,
            message:"登录成功",
            token:'Bearer '+tokenStr
        })

    })
}
//注册处理函数
exports.register = function (req, res) {
    let userInfo = req.body;
    const sqlStr = "select *from ev_users where username=?"
    db.query(sqlStr, userInfo.username, (err, results) => {
        //执行sql语句发生错误
        if (err) {
            return res.cc(err);
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.cc("用户名被占用，请重新命名");
        }
        //调用bcryptjs.hashSync()对密码进行加密
        userInfo.password = bcryptjs.hashSync(userInfo.password, 10);
        //如果不满足以上条件，则插入用户
        const sql = "insert into ev_users set?";
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) {
                return res.cc(err);

            }
            if (results.affectedRows !== 1) {
                return res.cc("注册用户失败，请重新注册");
            }
            res.cc("注册成功!", 0);
        });
    });

}
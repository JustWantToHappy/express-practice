const db = require("../db")
//获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
    const sql = "select *from ev_article_cate where is_delete=0 order by id asc";
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        res.send({ status: 0, message: "获取文章列表成功", data: results })
    })
}
//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    const sql = "select * from ev_article_cate where name=? or alias=?";
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err);
        }
        //分类名称和分类别名都被占用
        if (results.length === 2) {
            return res.cc("分类名称与别名被占用，请更换后重试")
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc("分类名称与别名被占用，请更换后重试")
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc("分类名称被占用，请更换重试")
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc("分类别名被占用，请更换后重试")
        }
        const insertSql = "insert into ev_article_cate set ?";
        //执行插入文章分类的sql语句
        db.query(insertSql, req.body, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.affectedRows === 1) {
                return res.cc("新增文章分类成功!");
            } else {
                return res.cc("新增文章分类失败")
            }
        })
    })
}
//删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc("删除文章分类失败!");
        } else {
            return res.cc("删除文章分类成功")
        }
    })
}
//根据id获取文章分类的处理函数
exports.getCateById = (req, res) => {
    const sql = "select *from ev_article_cate where id=? and is_delete=0";
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) {
            return res.cc("获取文章分类失败")
        }
        res.send({ status: 0, message: "获取文章分类成功!", data: results[0] })
    })
}
//根据id更新文章的处理函数
exports.updateCateById = (req, res) => {
    //更新之前检查name和alias是否被占用
    const checkSql = "select * from ev_article_cate where name=? or alias=?";
    db.query(checkSql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err);
        } else if (results.length === 2) {
            return res.cc("分类名称和分类别名都被占用，请重试!")
        } else if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc("分类名称被占用,请重试")
        } else if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc("分类别名被占用");
        } else {
            const updateSql = "update ev_article_cate set ? where id=?";
            db.query(updateSql, [req.body, req.params.id], (err, results) => {
                if (err) {
                    return res.cc(err);
                }
                console.log("sb")
                if (results.affectedRows === 1) {
                    return res.cc("更新文章分类成功!");
                } else {
                    return res.cc("更新文章分类失败");
                }
            })
        }
    })
}

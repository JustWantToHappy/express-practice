const express = require("express")
const router = express.Router();
//导入文章分类的路由处理函数模块
const artCate_handler = require("../router_handler/articate")
const expressJoi = require("@escook/express-joi")
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require("../schema/articate")
//获取文章分类的列表数据
router.get("/cates", artCate_handler.getArticleCates)
//增加文章分类
router.get("/addcates", expressJoi(add_cate_schema), artCate_handler.addArticleCates);
//删除文章分类的路由
router.get("/deletecate/:id", expressJoi(delete_cate_schema), artCate_handler.deleteCateById);
//根据id获取文章的路由
router.get("/getcate/:id", expressJoi(get_cate_schema), artCate_handler.getCateById);
//根据id更新文章的路由
router.get("/updatecate/:id", expressJoi(update_cate_schema), artCate_handler.updateCateById);
module.exports = router;


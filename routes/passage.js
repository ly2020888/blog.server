var express = require('express');
var router = express.Router();

router.post("/uploadPassage", function(req, res){
    if(req.session.account === req.body.account){
        
         console.log(req.body);
         
         return res.send({text:"发送文章成功", code:0})
    }
    else{
        return  res.send({text:"登录状态已过期", code:1})
    } 
})

module.exports = router;
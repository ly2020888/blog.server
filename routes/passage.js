var express = require('express');
var router = express.Router();
var { uploadPassage, getTotalPassageNum, getPassage, getPassageById }  = require("../database/models")
router.post("/uploadPassage", function(req, res){
    if(req.session.account === req.body.account){
        
        uploadPassage(req.body).then(function(response){
            return res.send({text:response, code:0});
        })
        
    }
    else{
        return  res.send({text:"登录状态已过期", code:1});
    } 
})
router.get("/getTotalPassageNum",function(req, res){
    getTotalPassageNum().then(function(response){
        res.send({passageNum: response[0].dataValues.pnum})
    })
})
router.post("/getPassage", function(req, res){
    getPassage(req.body.offset).then(function(response){
        res.send(response)
    })
})
router.post("/getPassageContentById", function(req, res){
    getPassageById(req.body.passageId).then(function(response){
        res.send(response)
    })

})
module.exports = router;
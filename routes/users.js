var express = require('express');
var router = express.Router();
const { register, login } = require("../database/models")
router.post('/loginStatus', function(req, res, next) { //用来探测是否还保持着登陆状态
  if(req.session.account){
    res.status(200).send({isLogged:true});
    return 
  }
  res.status(200).send({isLogged:false});
});

router.post('/login', function(req, res, next) { //用来负责处理登录
  // 通过验证
  if(!req.session.account){
    login(req.body).then(function(){
      req.session.account = req.body.account
      res.status(200).send({text: "登录成功", code: 0});
    },function(){
      res.status(200).send({text: "登录失败", code: 1});
    })
  }
});

router.post('/userInfo', function(req, res, next) { //用来负责处理登录
  if(req.session.account){
    //返回用户信息，返回用户信息后应该前端保存，不应该连续返回，应该设置该函数的调用最短周期
  }
});

router.get('/logout', function(req, res, next) { //用来负责处理登录
  req.session.destroy(function(err) {
    res.status(200)
  })
});
router.post('/register', function(req, res, next) { //用来负责处理登录
  console.log(req.body)
  register(req.body).then(function(response){
    res.status(200).send({text: response, code: 0});
  },function(err){
    res.status(200).send({text: err, code: 1});
  })
  
});

module.exports = router;

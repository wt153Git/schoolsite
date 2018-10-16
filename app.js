const express = require('express');
const server= express();
const bodyParser =  require('body-parser');
const Multer = require('multer');
const path = require('path');
const fs =  require('fs');

server.use(Multer({dest:"./img"}).any())
//server.use(bodyParser.urlencoded({}));

server.listen(2133);
var user={
	leo:"111"
}
server.use("/addPic",(req,res)=>{
//	console.log(req.files)
	var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newName,(err)=>{
		if(err){
			res.send({ok:0,msg:"写入失败"});
		}else{
			res.send({ok:1,msg:"上传成功",dataUrl:newName})
		}
	})
})
server.post('/loginPost',(req,res)=>{
	//console.log(req.body);
	if(user[req.body.user] == req.body.pwd){
		res.send({ok:1,msg:"登录成功"});
	}else{
		res.send({ok:0,msg:"登录失败"});
	}
})

server.use('/login',(req,res)=>{
//	console.log(req.query);
	if(user[req.query.user] == req.query.pwd){
		res.send({ok:1,msg:"登录成功"});
	}else{
		res.send({ok:0,msg:"登录失败"});
	}
})

server.use('',express.static("./"));

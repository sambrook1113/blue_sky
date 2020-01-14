const express = require('express')
const router = express.Router()
//var query = require('../models/queries.js')
var User = require('../models/User.js')

router.get('/', (req,res)=>{
	res.render('index')
})

router.get('/login', (req,res)=> {
	res.render('login')
})

router.get('/register', (req,res)=> {
	res.render('register')
})

router.post('/login', async (req,res)=>{
	let temp_user = null;
	try{
		temp_user = await User.findOne({username: req.body.username});

	} catch(error){
		return next(error)
	}
	if(temp_user!==null){
		if(req.body.password==temp_user.password){
			console.log("Password matches username!")
		}else{
			console.log("Password does NOT match username!")
		}
	} else{
		console.log("Invalid username")
	}

})

router.post('/register',  async (req,res)=> {
	let temp_user = null;
	try{
		temp_user = await User.findOne({username: req.body.username});

	} catch(error){
		return next(error)
	}
	if(temp_user!=null){
		console.log("Username taken")
	} else{
		var new_user = new User( {username: req.body.username, password: req.body.password, firstname: req.body.firstname, lastname: req.body.surname, admin: false})
		new_user.save(function (err, book) {
			if (err) return console.error(err);
			console.log("User saved");
			res.render('usercreated')
		  })
	}
})

module.exports = router
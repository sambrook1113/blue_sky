const express = require('express')
const router = express.Router()
var User = require('../models/User.js')
var bcrypt = require('bcrypt')
const saltRounds = 10


router.get('/', (req,res)=>{
	res.render('index')
})

router.get('/login', (req,res)=> {
	res.render('login', {message:null})
})

router.get('/about_us', (req,res)=> {
	res.render('about_us')
})


router.get('/register', (req,res)=> {
	res.render('register', {message: false, firstname: false, surname: false, password: false})
})

router.post('/login', async (req,res)=>{
	let temp_user = null;
	try{
		temp_user = await User.findOne({username: req.body.username});

	} catch(error){
		return next(error)
	}
	if(temp_user!==null){
		bcrypt.compare(req.body.password, temp_user.password, function (err, result) {
		if(result){
			res.render('../views/dashboard',{user: temp_user})
		}else{
			res.render('login', {message: 'Password does not match username!'})
		}
	})} else{
		res.render('login', {message: 'Username does not exist!'})
	}
})

router.get('/dashboard', (req,res)=> {
	res.render('dashboard')
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
		res.render('register', {message: 'Username taken', firstname: req.body.firstname, surname: req.body.surname, password: req.body.password})

	} else{
		bcrypt.hash(req.body.password, saltRounds, function (err, hash){
		    var new_user = new User( {username: req.body.username, password: hash,     firstname: req.body.firstname, lastname: req.body.surname, admin: false})
		    new_user.save(function (err, book) {
		    	if (err) return console.error(err);
		    	console.log("User saved");
		    	res.render('usercreated')
			  })
		})
	}})



module.exports = router
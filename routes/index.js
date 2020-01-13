const express = require('express')
const router = express.Router()
var User = require('../models/User.js')

router.get('/', (req,res)=>{
	res.render('index')
})

router.get('/login', (req,res)=> {
	res.render('login')
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
			console.log(temp_user.firstname)
			res.render('../views/dashboard',{user: temp_user})
		}else{
			console.log("Password does NOT match username!")
		}
	} else{
		console.log("Invalid username")
	}

})

router.get('/dashboard', (req,res)=> {
	res.render('dashboard')
})

module.exports = router
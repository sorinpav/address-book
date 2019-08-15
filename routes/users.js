const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //input validation
const User = require ('../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');

const bcrypt = require ('bcryptjs');

// @route    POST  api/users
// @desc     Register a user
// @access   Public

router.post(
'/',
[
    check('name', 'The name must be at least 3 characters long.').isLength({min: 3}), 
    check('email','Please include a valid email').isEmail(),
    check('password', 'The password must be at least 6 characters long.').isLength({ min: 6})
], 
async (req, res) => {
    const errors = validationResult(req); // the data is being passed in the request
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }); // get the actual message, not the json object PLEASE
    }
    // req.body gives me the data that's sent to the route (email, password, etc)


    const {name, email, password} = req.body; 
    
    try {
        let user = await User.findOne({email: email}); // also can use just {email} because of ES6, because fields are called the same.
        if (user) {
            res.status(400).json({msg: "The user already exists"});
        }
        
        //if user doesn't exist, create a user :
        user = new User({
            name, 
            email, 
            password
        }); // structure : name:name, email:email, password:password, but using ES6 I can just use like above
        //password hashing
        const salt = await bcrypt.genSalt(10); // 10 = number of rounds. It determines how secure the salt is
        user.password = await bcrypt.hash(password, salt);


        //adding it to the DB  
        await user.save();
        //user has been added to the database

        //Login straight away after the user has been added to the database, since this means the user was registered. 
        //JWT

        const payload = {
            user: {
                id: user.id // unique identifier, we can get all the data via it
            }
        }
    

        jwt.sign(payload,config.get('jwtSecret'), { 
            expiresIn: 360000 // token expires in..... so users have to login again
        }, (err, token) => {
            if (err) {
                throw err;
            } else {
                res.json({ token }) // ES6 token:token
            }
        });




        // cannot send multiple responses (res.send) . Once one is sent, it's going to give an error when sending the next one.

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//I only have to do express validation for routes that accept data and need validation (passwords, names, emails etc...)

module.exports = router;

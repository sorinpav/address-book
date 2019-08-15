const express = require('express');
const router = express.Router();



const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require ('bcryptjs');

const { check, validationResult } = require('express-validator'); //input validation
const User = require ('../models/User');


const auth = require('../middleware/auth');

// @route    POST  api/auth
// @desc     Authenticate and get token
// @access   Public

router.post('/',
[
check('email', 'Please include a valid email.').isEmail(),
check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        } else {
            const isMatch = await bcrypt.compare(password, user.password) // comparing the input password with the User.findOne() that was found, their password
            // I try to find a user via the email that's input, and then I try to match the passwords, since users are unique by emails

            if (!isMatch){
                return res.status(400).json({msg: 'Invalid credentials.'});
            } else {
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
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
    res.json({token});
});






// @route    GET  api/auth
// @desc     Get logged in user
// @access   Private

router.get('/',auth, async (req, res)=> { // I pass in auth as a second parameter because I want this to be a protected route
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        // -password because we don't want to return the password
        res.json(user);
        // if we send the correct token and we are logged in, the req object above is going to have a user object attached to it, with the current logged in user's id, so we can pass in req.user.id and we have the id of the currently logged in user stored inside const user. 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


    


// you cannot res.send twice

module.exports = router;
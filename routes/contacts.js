
//express setup => I need this router for the routes
const express = require('express');
const router = express.Router();



const auth = require ('../middleware/auth');
// auth middleware. I need to protect routes, so using this middleware to check if logged in


const { check, validationResult } = require('express-validator'); //input validation


//mongodb models
const User = require ('../models/User');
const Contact = require ('../models/Contact');
//mongoDB models END





// @route    GET  api/contacts
// @desc     Get all users contacts
// @access   Private

router.get('/',auth, async (req, res) => { 


    //pull from the DB
    try {
        const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1})// the most recent contacts first, that's what that sort is
        // contacts have a user field which is an ObjectId (the mongoDB ObjectId). I want to get the contacts for this specific user, and since using the auth middleware, I have access to that req.user object, so req.user.id is the object ID. (ID which makes it unique)
        
        res.json(contacts);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error!');
        
    }
});






// @route    POST  api/contacts
// @desc     Add new contacts
// @access   Private

router.post('/', 
[
    auth, 
    [
    check ('name', 'Name is required.').not().isEmpty()
]
], 
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }



    // destructure from req.body for less typing
    const {name, email, phone, type} = req.body;


    try {
        const newContact = new Contact({
            name, 
            email,
            phone, 
            type,
            user: req.user.id
        })
        //create a new contact instance with the newly obtained req.body info


        const contact = await newContact.save(); //save it to the db

        res.json(contact); // return contact to client


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



// @route    PUT  api/contacts/:id
// @desc     Update a contact
// @access   Private

router.put('/:id',auth, async (req, res) => {

    // destructure from req.body for less typing
    const {name, email, phone, type} = req.body;


    const updatedContact = {}

    if (name) updatedContact.name = name;
    if (email) updatedContact.email = email;
    if (phone) updatedContact.phone = phone;
    if (type) updatedContact.type = type; 
    // I don't know if when updating, the user is going to update all the fields. Therefore, I am checking to see which field exists and updating it as I go along. 



    try {

        //try to find the contact that needs to be updated...
        let contact = await Contact.findById(req.params.id); // the id that is being passed through in the URL as a parameter

        // if not...
        if(!contact) return res.status(404).json({msg: 'Contact not found'});


        // I need to make sure that the user with the ID passed through the URL owns the contact. We don't want to update someone else's contact
        if (contact.user.toString() !== req.user.id){ 
            return res.status(401).json({msg: 'Not authorised'});
        }


        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: updatedContact}, {new: true});
        //update, and if it doesn't exist, create it

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE  api/contacts/:id
// @desc     Delete a contact
// @access   Private

router.delete('/:id',auth, async (req, res) => {


    try {

        //try to find the contact that needs to be updated...
        let contact = await Contact.findById(req.params.id); // the id that is being passed through in the URL as a parameter

        // if not...
        if(!contact) return res.status(404).json({msg: 'Contact not found'});


        // I need to make sure that the user with the ID passed through the URL owns the contact. We don't want to update someone else's contact
        if (contact.user.toString() !== req.user.id){ 
            return res.status(401).json({msg: 'Not authorised'});
        }



        //Delete
        await Contact.findByIdAndRemove(req.params.id); // findByIdAndDelete is deprecated

        res.json({msg: 'Contact deleted'});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;
const jwt = require('jsonwebtoken');
const config = require('config');



module.exports = (req, res, next) => {
    // whenever you hve a middleware function, after you do what you want to do, you need to call next, which just passes the altered data to the next part of the programme workflow (that is move on to the next thing (piece of middleware or not...))

    // Get token from header, if there is one
    const token = req.header('x-auth-token');

    // Check if there is a token, and if it's not, do....
    if(!token){
        return res.status(401).json({msg: "No token. Authorisation denied."});
    }


    //if there is a token...then we need to verify it
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        // once it is verified, the object (that is the payload) is put into decoded
        // we want to take the user out, and we only have the user id


        //if everything goes well, 
        //set the user that's in that payload to 
        //req.user so that we have access to it inside the route
        req.user = decoded.user;
        
        
        // keep going..
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({msg: "Unauthorised. Token is not valid."});
    }
}
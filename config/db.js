const mongoose = require('mongoose');
const config = require ('config');

const db = config.get('mongoURI'); // get the default mongoURI stored in default.json

//mongoose returns promises, so we will need a sync / await

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("mongoDB Connected...")
    } catch (err) {
        console.error(err.message);
        process.exit(1); 
    }
    
}

module.exports = connectDB;
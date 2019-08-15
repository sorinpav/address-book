const express = require ('express');
const connectDB = require ('./config/db');
const app = express();

// Connect to the database
connectDB();


// Init middleware 
// Used to be third party bodyparser, it's now included within express
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.json({ msg: "Welcome to the Golden Pages API"}) );

// Define routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 


//Import required modules and packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');

//Initialise express application
const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//Connect to mongoDB database
mongoose.connect(config.database, {
 useNewUrlParser:true,
 useUnifiedTopology:true
})
.then( () => console.log('Connected to the database'))
.catch(err => console.error('Error connecting to database: ', err));

//auth using passport
app.use(passport.initialize());
require('./config/passport')(passport);//passport config

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something went wrong');
});

//Initialize server
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
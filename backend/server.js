const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();



require('./config/passport')(passport);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Express Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'pennyai@1234',
        resave: false,
        saveUninitialized: false,

    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));


connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});
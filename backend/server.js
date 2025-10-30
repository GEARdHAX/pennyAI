const express = require('express');
const connectDB = require('./config/db');
const user = require('./models/User');
const expense = require('./models/Expense');
const app = express();

app.use(express.json());

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
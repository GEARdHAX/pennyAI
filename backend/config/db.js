const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    dotenv.config(); // Load environment variables
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pennyAI', {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
